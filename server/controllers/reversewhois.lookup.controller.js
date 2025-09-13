import axios from "axios";

export const reverseWhois = async (req, res) => {
  try {
    const { query } = req.body; // e.g. email, org, name
    if (!query) {
      return res.json({ success: false, message: "Query is required" });
    }

    // Example: ViewDNS API
    const apiKey = process.env.VIEWDNS_API;
    const url = `https://api.viewdns.info/reversewhois/?q=${encodeURIComponent(
      query
    )}&apikey=${apiKey}&output=json`;

    const { data } = await axios.get(url);

    res.json({ success: true, query, results: data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
