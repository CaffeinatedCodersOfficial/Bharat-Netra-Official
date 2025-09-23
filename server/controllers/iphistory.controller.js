import axios from "axios";
import { updateWeekData } from "../utils/ApiAndToolsData.js";

export const getIPHistory = async (req, res) => {
  const { domain, userId } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  try {
    const apiKey = process.env.VIEWDNS_API;
    let records = [];

    if (apiKey) {
      // Using ViewDNS API
      const url = `https://api.viewdns.info/iphistory/?domain=${domain}&apikey=${apiKey}&output=json`;
      const { data } = await axios.get(url);

      if (data.response && data.response.records) {
        records = data.response.records
          .map((r) => ({
            ip: r.ip,
            location: r.location,
            lastSeen: r.lastseen,
          }))
          .filter((r) => r.ip && r.ip.includes(".") && r.lastSeen);
        // SecurityTrails Historical DNS A Records API
        const response = await axios.get(
          `https://api.securitytrails.com/v1/history/${domain}/dns/a`,
          {
            headers: { APIKEY: process.env.SECURITYTRAILS_API_KEY },
          }
        );

        if (!response.data || !response.data.records) {
          return res.status(404).json({ error: "No IP history found" });
        }

        const records = response.data.records.map((rec) => ({
          ip: rec.values?.[0]?.ip || "N/A",
          firstSeen: rec.first_seen || "N/A",
          lastSeen: rec.last_seen || "N/A",
        }));

        return res.json({ domain, records });
      }
    }
  } catch (error) {
    console.error("IP History Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch IP history" });
  }
};

export const reverseIPLookup = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    const response = await axios.get(
      `https://api.securitytrails.com/v1/ips/nearby/${ip}`,
      { headers: { APIKEY: process.env.SECURITYTRAILS_API_KEY } }
    );

    const records = response.data?.records || [];

    return res.json({
      ip,
      hosts: records.map((r) => ({
        ip: r.ip || "N/A",
        hostname: r.hostname || r.host || "N/A",
      })),
      geo: null,
      ptr: [],
      rdap: null,
      whois: null,
    });
  } catch (error) {
    console.error(
      "❌ Reverse IP Error:",
      error.response?.data || error.message
    );

    // Return empty object instead of HTTP 404
    return res.json({
      ip,
      hosts: [],
      geo: null,
      ptr: [],
      rdap: null,
      whois: null,
      error: error.response?.data?.message || "No data found",
    });
  }
};
