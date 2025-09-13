// controllers/reverseIpController.js
import dns from "dns";
import fetch from "node-fetch";
import * as whoiser from "whoiser";

/**
 * Environment variables (optional)
 * - VIRUSTOTAL_API_KEY
 * - SHODAN_API_KEY
 * - ABUSEIPDB_API_KEY
 * - SECURITYTRAILS_API_KEY
 */

const VT_KEY = process.env.VIRUSTOTAL_API_KEY;
const SHODAN_KEY = process.env.SHODAN_API_KEY;
const ABUSEIPDB_KEY = process.env.ABUSEIPDB_API_KEY;
const ST_KEY = process.env.SECURITYTRAILS_API_KEY;

/* -------------------------
   Utilities
   ------------------------- */

// Simple IPv4 private/reserved check (RFC1918 + common)
const isPrivateIPv4 = (ip) => {
  const m = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = m.slice(1).map(Number);
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local
  if (a >= 224 && a <= 239) return true; // multicast
  return false;
};

const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

/* -------------------------
   Helpers (each returns { success, data, error })
   ------------------------- */

// Reverse DNS (PTR)
const reverseDNS = (ip) =>
  new Promise((resolve) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err) return resolve({ success: false, error: err.message, data: [] });
      return resolve({ success: true, data: hostnames || [] });
    });
  });

// RDAP / WHOIS via whoiser
const rdapLookup = async (ip) => {
  try {
    const raw = await whoiser.rdap(ip);
    return { success: true, data: raw };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

// GeoIP + ASN from ip-api (free)
const geoLookup = async (ip) => {
  try {
    const r = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,org,as,query,timezone,zip`
    );
    const json = await r.json();
    if (json.status !== "success")
      return { success: false, error: json.message || "geo fail", data: null };
    return { success: true, data: json };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

// VirusTotal IP lookup + passive DNS (optional)
const virusTotalLookup = async (ip) => {
  if (!VT_KEY)
    return { success: false, error: "VIRUSTOTAL_API_KEY not set", data: null };
  try {
    const r = await fetch(
      `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      {
        headers: { "x-apikey": VT_KEY },
      }
    );
    if (!r.ok)
      return { success: false, error: `vt status ${r.status}`, data: null };
    const json = await r.json();

    // Passive DNS: VT provides 'data.attributes.last_dns_records' or 'data.attributes.resolutions'
    const attrs = json.data?.attributes || {};
    const passive_dns = attrs.last_dns_records || attrs.resolutions || null;

    // hosted domains: try to extract domains from passive_dns if present
    let hosted_domains = [];
    if (Array.isArray(passive_dns)) {
      // passive_dns items differ; we'll try common fields
      for (const rec of passive_dns) {
        if (rec.host_name) hosted_domains.push(rec.host_name);
        else if (rec.hostname) hosted_domains.push(rec.hostname);
        else if (rec.domain) hosted_domains.push(rec.domain);
        else if (rec.resolution) {
          if (rec.resolution.host) hosted_domains.push(rec.resolution.host);
        }
      }
      hosted_domains = [...new Set(hosted_domains)].filter(Boolean);
    }

    return {
      success: true,
      data: json,
      passive_dns,
      hosted_domains,
    };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

// SecurityTrails (optional) - hosted domains / passive dns (paid)
const securityTrailsLookup = async (ip) => {
  if (!ST_KEY)
    return {
      success: false,
      error: "SECURITYTRAILS_API_KEY not set",
      data: null,
    };
  try {
    const r = await fetch(
      `https://api.securitytrails.com/v1/ips/nearby/${ip}`,
      {
        method: "GET",
        headers: { APIKEY: ST_KEY },
      }
    );
    // NOTE: securitytrails has many endpoints. Adjust if you have a different ST endpoint.
    if (!r.ok)
      return {
        success: false,
        error: `securitytrails status ${r.status}`,
        data: null,
      };
    const json = await r.json();
    return { success: true, data: json };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

// Shodan (optional)
const shodanLookup = async (ip) => {
  if (!SHODAN_KEY)
    return { success: false, error: "SHODAN_API_KEY not set", data: null };
  try {
    const r = await fetch(
      `https://api.shodan.io/shodan/host/${encodeURIComponent(
        ip
      )}?key=${encodeURIComponent(SHODAN_KEY)}`
    );
    if (r.status === 404)
      return { success: false, error: "shodan: host not found", data: null };
    if (!r.ok)
      return { success: false, error: `shodan status ${r.status}`, data: null };
    const json = await r.json();
    // extract useful fields
    const info = {
      ip: json.ip_str || ip,
      hostnames: json.hostnames || [],
      ports: json.ports || [],
      org: json.org || null,
      isp: json.isp || null,
      os: json.os || null,
      last_update: json.last_update || null,
      data: json.data || null, // raw banners
    };
    return { success: true, data: info };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

// AbuseIPDB (optional)
const abuseIpdbLookup = async (ip) => {
  if (!ABUSEIPDB_KEY)
    return { success: false, error: "ABUSEIPDB_API_KEY not set", data: null };
  try {
    const r = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(
        ip
      )}&maxAgeInDays=90`,
      {
        method: "GET",
        headers: { Key: ABUSEIPDB_KEY, Accept: "application/json" },
      }
    );
    if (!r.ok)
      return {
        success: false,
        error: `abuseipdb status ${r.status}`,
        data: null,
      };
    const json = await r.json();
    return { success: true, data: json };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
};

/* -------------------------
   Helper: parse abuse contacts from RDAP whois response (best-effort)
   ------------------------- */
const extractAbuseContactsFromRdap = (rdapRaw) => {
  try {
    if (!rdapRaw) return null;
    // whoiser.rdap returns different shapes depending on RIR; try common patterns
    // look for entities -> objects -> vcardArray, or remarks with abuse contacts
    const contacts = [];
    // objects-style
    if (rdapRaw.objects) {
      for (const objKey in rdapRaw.objects) {
        const obj = rdapRaw.objects[objKey];
        if (!obj) continue;
        const roles = obj.roles || [];
        if (
          roles.includes("abuse") ||
          roles.includes("abuse-c") ||
          objKey.toLowerCase().includes("abuse")
        ) {
          // try vcardArray
          const vcard = obj.vcardArray;
          if (vcard && vcard[1]) {
            for (const field of vcard[1]) {
              if (field[0] === "email") contacts.push(field[3]);
              if (field[0] === "tel") contacts.push(field[3]);
            }
          }
        }
      }
    }
    // entities-style
    if (rdapRaw.entities && Array.isArray(rdapRaw.entities)) {
      for (const ent of rdapRaw.entities) {
        if (ent.roles && ent.roles.includes("abuse")) {
          // vcardArray might be inside ent.vcardArray or ent.vcard
          const vcard = ent.vcardArray || ent.vcard;
          if (vcard && vcard[1]) {
            for (const field of vcard[1]) {
              if (field[0] === "email") contacts.push(field[3]);
              if (field[0] === "tel") contacts.push(field[3]);
            }
          }
        }
      }
    }
    // fallback: rdapRaw.abuse_contacts or similar
    if (rdapRaw.abuse_contacts) contacts.push(...rdapRaw.abuse_contacts);
    return contacts.length ? [...new Set(contacts)].filter(Boolean) : null;
  } catch {
    return null;
  }
};

/* -------------------------
   Main controller
   ------------------------- */

export const lookupIP = async (req, res) => {
  try {
    let { ip } = req.body || {};
    if (!ip)
      return res.status(400).json({ error: "ip is required in request body" });

    ip = String(ip).trim();
    // basic IPv4 check (you can extend for IPv6)
    if (!ipv4Regex.test(ip)) {
      return res
        .status(400)
        .json({
          error:
            "invalid IPv4 format (simple check). IPv6 not supported by this endpoint.",
        });
    }

    // Short-circuit private/reserved IPs
    if (isPrivateIPv4(ip)) {
      return res.json({
        ip,
        private: true,
        note: "The IP is private/reserved (RFC1918 or loopback). Public RDAP/ASN/hosted-domain lookups are not available.",
      });
    }

    // Run lookups in parallel (fast)
    const [ptrRes, rdapRes, geoRes, vtRes, shodanRes, abuseRes, stRes] =
      await Promise.all([
        reverseDNS(ip),
        rdapLookup(ip),
        geoLookup(ip),
        virusTotalLookup(ip),
        shodanLookup(ip),
        abuseIpdbLookup(ip),
        securityTrailsLookup(ip),
      ]);

    // Consolidate RDAP-derived basic fields
    const rdapRaw = rdapRes.success ? rdapRes.data : null;
    // best-effort extract:
    const rdapOwner =
      rdapRaw?.network?.name ||
      rdapRaw?.name ||
      rdapRaw?.objects?.[Object.keys(rdapRaw.objects || {})[0]]?.name ||
      null;
    const rdapCidr = rdapRaw?.network?.cidr || rdapRaw?.network?.handle || null;
    const rdapCountry =
      rdapRaw?.country ||
      (rdapRaw?.entities && rdapRaw.entities[0]?.country) ||
      null;
    const rdapAsn =
      rdapRaw?.asn || (rdapRaw?.autnums && rdapRaw.autnums[0]) || null;
    const abuseContacts = extractAbuseContactsFromRdap(rdapRaw);

    // From geoRes (ip-api), it already has as field like "AS15169 Google LLC"
    const geoData = geoRes.success ? geoRes.data : null;

    // Passive DNS / hosted domains: prefer SecurityTrails (if available), then VirusTotal
    let hosted_domains = [];
    if (stRes.success && stRes.data) {
      // securitytrails data schema varies; this is a best-effort placeholder
      // If you have a specific ST endpoint, parse accordingly (e.g., /v1/ips/dns or /v1/ips/hosts)
      try {
        if (Array.isArray(stRes.data.hosts) && stRes.data.hosts.length) {
          hosted_domains = stRes.data.hosts.map((h) => h.hostname || h);
        } else if (Array.isArray(stRes.data)) {
          hosted_domains = stRes.data.map((h) => h.hostname || h);
        }
      } catch (e) {
        hosted_domains = [];
      }
    }
    if (
      !hosted_domains.length &&
      vtRes.success &&
      Array.isArray(vtRes.hosted_domains) &&
      vtRes.hosted_domains.length
    ) {
      hosted_domains = vtRes.hosted_domains;
    }
    // also fallback to VT passive_dns parsed hosted_domains
    if (
      !hosted_domains.length &&
      vtRes.success &&
      Array.isArray(vtRes.passive_dns)
    ) {
      const domains = new Set();
      for (const rec of vtRes.passive_dns) {
        if (rec.host_name) domains.add(rec.host_name);
        if (rec.hostname) domains.add(rec.hostname);
        if (rec.domain) domains.add(rec.domain);
      }
      hosted_domains = Array.from(domains);
    }

    // Build response object
    const response = {
      ip,
      lookupTimeMs: Date.now(),
      ptr: ptrRes.success ? ptrRes.data : [],
      rdap: {
        success: rdapRes.success,
        raw: rdapRes.success ? rdapRes.data : null,
        owner: rdapOwner || geoData?.org || null,
        cidr: rdapCidr || null,
        asn: rdapAsn || geoData?.as || null,
        country: rdapCountry || geoData?.country || null,
        abuse_contacts: abuseContacts || undefined,
        note: rdapRes.success ? null : rdapRes.error,
      },
      geo: geoRes.success
        ? geoRes.data
        : { error: geoRes.error || "geo lookup failed" },
      hosted_domains: hosted_domains.length ? hosted_domains : undefined,
      virusTotal: vtRes.success
        ? {
            summary: {
              reputation: vtRes.data?.data?.attributes?.reputation ?? null,
              last_analysis_stats:
                vtRes.data?.data?.attributes?.last_analysis_stats ?? null,
              tags: vtRes.data?.data?.attributes?.tags ?? [],
            },
            passive_dns: vtRes.passive_dns ?? null,
            raw: vtRes.data ?? null,
          }
        : { error: vtRes.error },
      shodan: shodanRes.success ? shodanRes.data : { error: shodanRes.error },
      abuseipdb: abuseRes.success ? abuseRes.data : { error: abuseRes.error },
      securitytrails: stRes.success
        ? stRes.data
        : stRes.error
        ? { error: stRes.error }
        : undefined,
    };

    return res.json(response);
  } catch (err) {
    console.error("reverse ip controller error:", err);
    return res
      .status(500)
      .json({ error: "internal error", details: err?.message || String(err) });
  }
};
