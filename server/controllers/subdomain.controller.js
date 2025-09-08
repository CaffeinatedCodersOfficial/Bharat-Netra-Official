import dns from "dns";

// Common subdomains dictionary
const commonSubdomains = [
  "www",
  "mail",
  "ftp",
  "blog",
  "dev",
  "api",
  "test",
  "portal",
  "admin",
  "shop",
  "webmail",
  "intranet",
  "cpanel",
  "beta",
  "staging",
  "secure",
  "vpn",
  "docs",
  "forum",
  "news",
  "cdn",
  "images",
  "static",
  "mail2",
  "m",
  "app",
  "support",
  "help",
  "billing",
  "server",
  "ns1",
  "ns2",
  "smtp",
  "imap",
  "pop",
  "mx",
  "web",
  "files",
  "downloads",
  "old",
  "backup",
  "crm",
  "login",
  "auth",
  "api1",
  "api2",
  "shop1",
  "shop2",
  "mobile",
  "portal2",
  "test1",
  "dev1",
  "qa",
  "demo",
  "beta1",
  "beta2",
  "staging1",
  "staging2",
  "gateway",
  "dashboard",
  "members",
  "accounts",
  "internal",
  "system",
  "client",
  "customer",
  "partners",
  "public",
  "private",
  "data",
  "analytics",
  "services",
  "media",
  "video",
  "assets",
  "docs2",
  "wiki",
  "community",
  "events",
  "tracker",
  "api-dev",
  "api-test",
  "dev-api",
  "sandbox",
  "uat",
  "secure-api",
  "auth-api",
  "payment",
  "payments",
  "checkout",
  "cart",
  "billing-api",
  "inbox",
  "sms",
  "notifications",
  "jobs",
  "careers",
  "events",
  "status",
  "monitor",
  "metrics",
  "logs",
  "alerts",
  "report",
  "reports",
  "webapp",
  "adminpanel",
  "backend",
  "frontend",
  "test-api",
  "devportal",
  "shop-api",
  "api-v1",
  "api-v2",
  "api-v3",
  "gateway-api",
  "db",
  "database",
  "sql",
  "nosql",
  "cache",
  "redis",
  "mongodb",
  "postgres",
  "mysql",
  "auth-service",
  "oauth",
  "sso",
  "identity",
  "login-api",
  "signup",
  "register",
  "verification",
  "confirm",
  "reset",
  "forgot",
  "tracking",
  "track",
  "analytics-api",
  "marketing",
  "ads",
  "adserver",
  "promo",
  "coupon",
  "offers",
  "deals",
  "beta-test",
  "sandbox-api",
  "staging-api",
  "test-server",
  "dev-server",
  "integration",
  "uat-api",
  "mock",
  "mock-api",
  "demo-api",
  "preview",
  "preview-api",
  "qa-api",
];

// Helper function to resolve subdomain
const resolveSubdomain = (sub, domain) =>
  new Promise((resolve) => {
    dns.resolve(`${sub}.${domain}`, "A", (err, addresses) => {
      if (!err && addresses && addresses.length > 0) {
        resolve(sub);
      } else {
        resolve(null);
      }
    });
  });

// Controller function
export const discoverSubdomains = async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  try {
    const foundSubdomains = [];

    const results = await Promise.all(
      commonSubdomains.map((sub) => resolveSubdomain(sub, domain))
    );

    results.forEach((sub) => {
      if (sub) foundSubdomains.push(`${sub}.${domain}`);
    });

    res.json({
      domain,
      subdomains: foundSubdomains.length
        ? foundSubdomains
        : ["No subdomains found"],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error discovering subdomains", details: err });
  }
};
