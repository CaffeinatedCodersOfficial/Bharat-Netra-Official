import { scanSubdomains } from "../utils/subDomainScanner.js";

// Express controller for API route
export const discoverSubdomains = async (req, res) => {
  try {
    const { domain } = req.body; // expects { "domain": "example.com" }
    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    const results = await scanSubdomains(domain);
    res.json({ domain, subdomains: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
