// controllers/ipHistory.controller.js
import * as cheerio from "cheerio";
import axios from "axios";

export const getIpHistory = async (req, res) => {
  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  try {
    const apiKey = process.env.VIEWDNS_API;
    let records = [];

    if (apiKey) {
      // Use official API if key exists
      const url = `https://api.viewdns.info/iphistory/?domain=${domain}&apikey=${apiKey}&output=json`;
      const { data } = await axios.get(url);
      console.log("✅ API Response:", data);

      if (data.response && data.response.records) {
        records = data.response.records
          .map((r) => ({
            ip: r.ip,
            location: r.location,
            lastSeen: r.lastseen,
          }))
          .filter((r) => r.ip && r.ip.includes(".") && r.lastSeen); // keep only meaningful IPv4
      }
    } else {
      // Scrape HTML if no API key
      const url = `https://viewdns.info/iphistory/?domain=${domain}`;
      const { data } = await axios.get(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      console.log("✅ Scraping HTML length:", data.length);

      const $ = cheerio.load(data);
      $("table tr").each((i, row) => {
        if (i === 0) return; // skip header
        const cols = $(row).find("td");
        if (cols.length >= 3) {
          const ip = $(cols[0]).text().trim();
          const location = $(cols[1]).text().trim();
          let lastSeen = $(cols[2]).text().trim();

          // Validate lastSeen looks like a date (simple check)
          if (!/\d{4}-\d{2}-\d{2}/.test(lastSeen)) lastSeen = null;

          if (ip && ip.includes(".") && lastSeen) {
            records.push({ ip, location, lastSeen });
          }
        }
      });
    }

    // Remove duplicate IPs (keep first occurrence)
    const seen = new Set();
    records = records.filter((r) => {
      if (seen.has(r.ip)) return false;
      seen.add(r.ip);
      return true;
    });

    // Optional: limit to top 10 most recent
    records = records.slice(0, 10);

    return res.json({ records });
  } catch (err) {
    console.error("❌ IP History Error:", err);
    return res.status(500).json({ error: err.message });
  }
};
