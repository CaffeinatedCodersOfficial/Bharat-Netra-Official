import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const tools = [
  "WHOIS Lookup",
  "Subdomain Finder",
  "Password Hash Breaker",
  "IP History Lookup",
  "Reverse IP Lookup",
  "Reverse WHOIS Lookup",
  "Port Scanner",
  "Bulk IP Lookup",
  "Abuse Contact Lookup",
  "Malware Check",
  "Email Header Analyzer",
  "Mobile Carrier Lookup",
  "Reverse Image Search",
  "Email Validator",
  "MAC Address Lookup",
];

// Helper to summarize Malware Check results
function summarizeMalwareData(data) {
  const stats = data.attributes.last_analysis_stats;
  const totalEngines = Object.values(stats).reduce((a, b) => a + b, 0);

  let status = "Safe";
  if (stats.malicious > 0) status = "Malicious";
  else if (stats.suspicious > 0) status = "Suspicious";

  const maliciousEngines = [];
  const results = data.attributes.last_analysis_results;
  for (let engine in results) {
    if (results[engine].category === "malicious") {
      maliciousEngines.push(engine);
    }
  }

  return {
    url: data.attributes.url,
    status,
    summary: `${stats.malicious} / ${totalEngines} engines flagged this URL as malicious.`,
    maliciousEngines,
  };
}

const Terminal = () => {
  const backendUrl = "https://bharat-netra-official.onrender.com";
  const [selectedTool, setSelectedTool] = useState(null);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedTool && inputRef.current) inputRef.current.focus();
  }, [selectedTool]);

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setHistory([`⚡ ${tool} terminal opened`]);
    setInputValue("");
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedTool(null);
    setHistory([]);
    setInputValue("");
    setLoading(false);
  };

  const handleInputKey = async (e) => {
    if (e.key !== "Enter") return;

    const command = inputValue.trim();
    if (!command) return;

    if (command.toLowerCase() === "clear") {
      setHistory([`⚡ ${selectedTool} terminal opened`]);
      setInputValue("");
      return;
    }

    if (command.toLowerCase() === "cd..") {
      handleBack();
      return;
    }

    setHistory((prev) => [...prev, `$ ${command}`]);
    setInputValue("");
    setLoading(true);

    try {
      // WHOIS Lookup
      if (selectedTool === "WHOIS Lookup") {
        const res = await axios.post(backendUrl + "/api/domain/domain-info", {
          domain: command,
        });
        setTimeout(() => {
          setHistory((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
          setLoading(false);
        }, 800);
      }

      // Subdomain Finder
      else if (selectedTool === "Subdomain Finder") {
        const res = await axios.post(
          backendUrl + "/api/subdomain/discover-subdomain",
          { domain: command }
        );
        setTimeout(() => {
          if (res.data.subdomains && res.data.subdomains.length > 0) {
            res.data.subdomains.forEach((sub) =>
              setHistory((prev) => [
                ...prev,
                `${sub.subdomain} → ${sub.ip} (${sub.type})`,
              ])
            );
          } else {
            setHistory((prev) => [...prev, "No subdomains found"]);
          }
          setLoading(false);
        }, 800);
      }

      // IP History Lookup
      else if (selectedTool === "IP History Lookup") {
        const res = await axios.get(
          backendUrl + `/api/ip/ip-history?domain=${command}`
        );
        setTimeout(() => {
          if (res.data.records && res.data.records.length > 0) {
            res.data.records.forEach((rec) => {
              setHistory((prev) => [
                ...prev,
                `${rec.ip} | ${rec.location} | Last Seen: ${rec.lastSeen}`,
              ]);
            });
          } else {
            setHistory((prev) => [...prev, "No IP history found"]);
          }
          setLoading(false);
        }, 800);
      }

      // Email Validator Tool
      else if (selectedTool === "Email Validator") {
        const res = await axios.post(backendUrl + "/api/email/validate-email", {
          email: command,
        });
        setTimeout(() => {
          if (res.data) {
            setHistory((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
          }
          setLoading(false);
        }, 800);
      }

      // Malware Check (summarized)
      else if (selectedTool === "Malware Check") {
        const res = await axios.post(
          backendUrl + "/api/malware/check-malware",
          {
            url: command,
          }
        );

        setTimeout(() => {
          if (res.data && res.data.data) {
            const summary = summarizeMalwareData(res.data.data);
            setHistory((prev) => [
              ...prev,
              `Malware Check Result for ${summary.url}:`,
              `Status: ${summary.status}`,
              summary.summary,
              summary.maliciousEngines.length
                ? `Malicious engines: ${summary.maliciousEngines.join(", ")}`
                : "No malicious engines detected",
            ]);
          } else {
            setHistory((prev) => [
              ...prev,
              `No malware information found for ${command}`,
            ]);
          }
          setLoading(false);
        }, 800);
      }

      // Port Scanner
      else if (selectedTool === "Port Scanner") {
        // Expected input format: "example.com 80,443,8080"
        const [host, portsStr] = command.split(" ");
        if (!host || !portsStr) {
          setHistory((prev) => [
            ...prev,
            "❌ Invalid input. Use: hostname port1,port2,...",
          ]);
          setLoading(false);
          return;
        }

        const ports = portsStr.split(",").map((p) => parseInt(p.trim()));
        const res = await axios.post(`${backendUrl}/api/ports/scan-ports`, {
          host,
          ports,
        });

        setTimeout(() => {
          res.data.results.forEach((r) => {
            setHistory((prev) => [...prev, `Port ${r.port}: ${r.status}`]);
          });
          setLoading(false);
        }, 800);
      }
      //macAddress lookup
      else if (selectedTool === "MAC Address Lookup") {
        const res = await axios.post(
          backendUrl + "/api/macAddress/macAdd-lookup",
          {
            macAddress: command,
          },
        );
        setTimeout(() => {
          if (res.data) {
            setHistory((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
            setLoading(false);
          }
        }, 800);
      }

      // Mobile Carrier Lookup 🚀
      else if (selectedTool === "Mobile Carrier Lookup") {
        const res = await axios.post(
          backendUrl + "/api/carrier/check-carrier",
          { phone: command }
        );

        setTimeout(() => {
          if (res.data) {
            setHistory((prev) => [
              ...prev,
              `Carrier Lookup Result for ${command}:`,
              `Valid: ${res.data.valid ? "Yes" : "No"}`,
              `Country: ${res.data.country || "N/A"}`,
              `Carrier: ${res.data.carrier || "N/A"}`,
              `Type: ${res.data.phone_type || "N/A"}`,
              `International: ${res.data.international || "N/A"}`,
            ]);
          } else {
            setHistory((prev) => [...prev, "No carrier info found"]);
          }
          setLoading(false);
        }, 800);
      }

      // Placeholder for other tools
      else {
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            `Tool "${selectedTool}" is not implemented yet`,
          ]);
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          `❌ Error: ${err.response?.data?.error || err.message}`,
        ]);
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="relative w-full h-[80vh] max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] via-[#121212] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col w-full h-full text-gray-200 font-mono border border-gray-700/50 rounded-xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1e1e1e]/90 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <span className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-md"></span>
            <span className="w-3.5 h-3.5 bg-yellow-400 rounded-md shadow-md"></span>
            <span className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-md"></span>
          </div>
          <p className="text-sm md:text-base font-medium tracking-wide font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent">
            {selectedTool ? selectedTool : "BharatNetra Hack Tools Terminal"}
          </p>
          <div className="w-12"></div>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto text-sm leading-relaxed">
          {!selectedTool ? (
            // Tools Grid
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="group relative p-4 bg-[#252526] border border-[#2d2d2d] rounded-lg transition-all duration-300 transform hover:scale-[1.03] hover:border-[#880bd1] cursor-pointer"
                  onClick={() => handleToolClick(tool)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#880bd1]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  <p className="relative z-10 text-gray-300 font-medium group-hover:text-white transition-colors">
                    {tool}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Terminal
            <div className="flex flex-col space-y-3 relative">
              {/* Back arrow */}
              <div
                className="absolute -top-1 left-0 text-gray-400 cursor-pointer hover:text-white transition"
                onClick={handleBack}
              >
                <FaArrowLeft />
              </div>

              {/* History */}
              <div className="space-y-2">
                {history.map((line, idx) => (
                  <pre key={idx} className="whitespace-pre-wrap text-gray-300">
                    {line}
                  </pre>
                ))}
                {loading && (
                  <pre className="text-[#880bd1] animate-pulse">...loading</pre>
                )}
              </div>

              {/* Input */}
              <div className="flex items-center space-x-2 mt-4">
                <span className="text-[#880bd1] font-semibold">$</span>
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKey}
                  className="flex-1 bg-transparent border-none outline-none text-white caret-[#880bd1] placeholder-gray-500 text-sm md:text-base"
                  placeholder={
                    selectedTool === "Subdomain Finder"
                      ? "Enter domain to discover subdomains..."
                      : selectedTool === "IP History Lookup"
                        ? "Enter domain to check IP history..."
                        : selectedTool === "Email Validator"
                          ? "Enter email to validate"
                          : selectedTool === "Malware Check"
                            ? "Enter URL to check for malware..."
                            : selectedTool === "Port Scanner"
                              ? "Enter host and ports (example.com 80,443,8080)..."
                              : selectedTool === "MAC Address Lookup"
                                ? "Enter Mac Address"
                                : "Enter your domain..."

                  }
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
