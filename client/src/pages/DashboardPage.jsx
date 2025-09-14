import React from "react";
import {
  User,
  Activity,
  Cpu,
  Database,
  Shield,
  Clock,
  BarChart3,
  AlertTriangle,
  Server ,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useEffect } from "react";


const DashboardPage = () => {
    const {refreshAuth, userData, isLoggedIn} = useContext(AppContext);
    console.log(userData);
    
  const user = {
  name: userData?.name,
  email: userData?.email,
  role: userData?.role,
  lastLogin: userData?.lastLogin 
    ? new Date(userData.lastLogin).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never logged in", // fallback if no login yet
  accountStatus: isLoggedIn ? "Active" : "Inactive",
};


  const stats = [
    { icon: Cpu, label: "API Calls", value: userData?.totalUsage },
    { icon: Database, label: "Tools Used", value: "8" },
    { icon: Activity, label: "Active Sessions", value: "5" },
    { icon: Shield, label: "Security Flags", value: "2" },
  ];

  const activities = [
    { time: "10:45 AM", action: "Logged in", status: "success" },
    { time: "10:47 AM", action: "Used WHOIS Lookup Tool", status: "success" },
    { time: "11:02 AM", action: "API Call Failed", status: "error" },
    { time: "11:15 AM", action: "Checked IP History", status: "success" },
  ];

  // Dummy Data for Graphs
  const apiUsageData = [
    { day: "Mon", calls: 1200 },
    { day: "Tue", calls: 2100 },
    { day: "Wed", calls: 1800 },
    { day: "Thu", calls: 2500 },
    { day: "Fri", calls: 2200 },
    { day: "Sat", calls: 2700 },
    { day: "Sun", calls: 1900 },
  ];

  const toolsUsageData = [
    { name: "WHOIS", value: 400 },
    { name: "IP History", value: 300 },
    { name: "DNS Lookup", value: 200 },
    { name: "SSL Checker", value: 100 },
  ];
  const COLORS = ["#880bd1", "#00C49F", "#FFBB28", "#FF4444"];
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#0a0016] to-black text-white px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,11,209,0.15),transparent_70%)]"></div>

      <h1 className="text-5xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent text-center mb-12">
        Bharat Netra Dashboard
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* User Info */}
        <div className="p-6 bg-black/40 border border-[#880bd1]/30 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#880bd1]/20 to-transparent opacity-50"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#880bd1]/30 border border-[#880bd1]">
              <User className="w-8 h-8 text-[#880bd1]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-[#880bd1]" /> Last Login:{" "}
                {user.lastLogin}
              </p>
              <p className="mt-2 text-sm">
                Status:{" "}
                <span className={`${isLoggedIn ? "text-green-400":"text-red-600"} font-semibold`}>
                  {user.accountStatus}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative p-6 bg-black/40 border-2 border-transparent rounded-2xl transition-all duration-300 hover:scale-105 hover:border-[#880bd1] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#880bd1]/30 via-transparent to-[#880bd1]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10 flex flex-col items-start">
                  <Icon className="w-10 h-10 text-[#880bd1] mb-3" />
                  <h3 className="text-3xl font-bold text-[#880bd1] group-hover:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12">
        {/* API Usage Trend */}
        <div className="p-6 bg-black/40 border border-[#880bd1]/30 rounded-2xl relative">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-[#880bd1]" />
            <h2 className="text-2xl font-bold">API Usage Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#880bd1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tools Usage */}
        <div className="p-6 bg-black/40 border border-[#880bd1]/30 rounded-2xl relative">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-[#880bd1]" />
            <h2 className="text-2xl font-bold">Tools Usage Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={toolsUsageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {toolsUsageData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity + Alerts */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12">
        {/* Recent Activity */}
        <div className="p-6 bg-black/40 border border-[#880bd1]/30 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#880bd1]/10 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              {activities.map((act, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-gray-800 pb-2"
                >
                  <span className="text-gray-300">{act.time}</span>
                  <span>{act.action}</span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      act.status === "success"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {act.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="p-6 bg-black/40 border border-[#880bd1]/30 rounded-2xl relative">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Security Alerts</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-red-400">
              <Shield className="w-5 h-5" /> 2 suspicious API calls flagged
            </li>
            <li className="flex items-center gap-2 text-yellow-400">
              <Server className="w-5 h-5" /> System load higher than usual
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
