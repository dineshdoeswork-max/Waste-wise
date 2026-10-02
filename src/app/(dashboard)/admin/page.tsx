"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Truck,
  Users,
  AlertTriangle,
  ClipboardList,
  Download,
  Check,
  Search,
  Printer,
  FileSpreadsheet,
  X,
  Filter
} from "lucide-react";

const weeklyCollectionData = [
  { name: "Week 1", count: 420 },
  { name: "Week 2", count: 580 },
  { name: "Week 3", count: 710 },
  { name: "Week 4", count: 960 },
];

const wasteTypeData = [
  { name: "Plastic", value: 28, color: "#3b82f6" },
  { name: "Organic", value: 24, color: "#10b981" },
  { name: "Mixed", value: 18, color: "#64748b" },
  { name: "E-Waste", value: 12, color: "#ef4444" },
  { name: "Metal", value: 10, color: "#f59e0b" },
  { name: "Glass", value: 8, color: "#06b6d4" },
];

const wardPerformanceData = [
  { name: "Bandra W", requests: 120, completed: 110 },
  { name: "Andheri W", requests: 250, completed: 235 },
  { name: "Goregaon W", requests: 180, completed: 170 },
  { name: "Borivali W", requests: 220, completed: 200 },
  { name: "Malad W", requests: 195, completed: 180 },
  { name: "Kandivali W", requests: 210, completed: 195 },
  { name: "Dahisar W", requests: 150, completed: 140 },
  { name: "Jogeshwari W", requests: 130, completed: 120 },
];

const dailyTrendData = [
  { day: "Mon", requests: 45, completed: 40 },
  { day: "Tue", requests: 52, completed: 48 },
  { day: "Wed", requests: 38, completed: 40 },
  { day: "Thu", requests: 65, completed: 58 },
  { day: "Fri", requests: 58, completed: 54 },
  { day: "Sat", requests: 75, completed: 68 },
  { day: "Sun", requests: 82, completed: 72 },
  { day: "Mon", requests: 48, completed: 45 },
  { day: "Tue", requests: 55, completed: 50 },
  { day: "Wed", requests: 62, completed: 55 },
  { day: "Thu", requests: 70, completed: 62 },
  { day: "Fri", requests: 85, completed: 78 },
  { day: "Sat", requests: 90, completed: 85 },
  { day: "Sun", requests: 95, completed: 90 },
];

const recentActivityData = [
  {
    id: "REQ-8472",
    location: "Near Linking Road Signal, Bandra W",
    type: "Mixed",
    priority: "High",
    status: "Pending",
    time: "10 mins ago",
  },
  {
    id: "REQ-8471",
    location: "SV Road, Andheri W",
    type: "E-Waste",
    priority: "Critical",
    status: "In Progress",
    time: "25 mins ago",
  },
  {
    id: "REQ-8470",
    location: "Mindspace, Malad W",
    type: "Plastic",
    priority: "Medium",
    status: "Completed",
    time: "1 hour ago",
  },
  {
    id: "REQ-8469",
    location: "Lokhandwala Complex, Andheri W",
    type: "Organic",
    priority: "Low",
    status: "Completed",
    time: "2 hours ago",
  },
  {
    id: "REQ-8468",
    location: "IC Colony, Borivali W",
    type: "Metal",
    priority: "Medium",
    status: "In Progress",
    time: "2.5 hours ago",
  },
  {
    id: "REQ-8467",
    location: "Thakur Village, Kandivali W",
    type: "Glass",
    priority: "Low",
    status: "Pending",
    time: "3 hours ago",
  },
  {
    id: "REQ-8466",
    location: "Goregaon Sports Club, Goregaon W",
    type: "Mixed",
    priority: "High",
    status: "Pending",
    time: "4 hours ago",
  },
  {
    id: "REQ-8465",
    location: "Dahisar Toll Naka, Dahisar W",
    type: "Organic",
    priority: "Critical",
    status: "Completed",
    time: "5 hours ago",
  },
];

const priorityColors: Record<string, string> = {
  Low: "bg-slate-100 text-slate-700 border-slate-200",
  Medium: "bg-blue-100 text-blue-700 border-blue-200",
  High: "bg-amber-100 text-amber-700 border-amber-200",
  Critical: "bg-red-100 text-red-700 border-red-200",
};

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Format and export official CSV report
  const handleExportReport = () => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const timeStr = today.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const fileName = `Mumbai_Waste_Management_Report_${dateStr}.csv`;

    let csvContent = "\uFEFF"; // UTF-8 BOM for clean Microsoft Excel compatibility

    // Header Metadata
    csvContent += "MUMBAI MUNICIPAL CORPORATION - BRIHANMUMBAI SOLID WASTE MANAGEMENT DEPARTMENT\n";
    csvContent += "COMPREHENSIVE FIELD OPERATIONS & COLLECTION METRICS REPORT\n";
    csvContent += `Generated Date,${dateStr},Generated Time,${timeStr},Jurisdiction,Mumbai Western Suburbs (Zones 1-4)\n`;
    csvContent += `Report Status,Consolidated Official,Department,Solid Waste Operations Division\n\n`;

    // 1. Executive Summary
    csvContent += "=== 1. EXECUTIVE KPI SUMMARY METRICS ===\n";
    csvContent += "Metric,Value,Benchmark / Trend\n";
    csvContent += "Total Waste Requests,2847,+18.2% vs previous 30 days\n";
    csvContent += "Pending Pickups,342,28 Critical priority requiring immediate dispatch\n";
    csvContent += "Active Fleets / Teams Deployed,24 of 30,80% active deployment rate\n";
    csvContent += "Completed Pickups Today,156,On schedule for municipal targets\n";
    csvContent += "Average Turnaround Response Time,2.4 hrs,-32% turnaround speed improvement\n";
    csvContent += "Citizen Satisfaction Rate,94.2%,Based on verified app ratings\n\n";

    // 2. Ward-wise Performance
    csvContent += "=== 2. WARD-WISE COLLECTION EFFICIENCY ===\n";
    csvContent += "Ward Name,Total Logged Requests,Completed Pickups,Pending Pickups,Completion Rate (%)\n";
    wardPerformanceData.forEach((w) => {
      const rate = ((w.completed / w.requests) * 100).toFixed(1);
      csvContent += `"${w.name}",${w.requests},${w.completed},${w.requests - w.completed},${rate}%\n`;
    });
    csvContent += "\n";

    // 3. Waste Type Composition
    csvContent += "=== 3. WASTE COMPOSITION ANALYSIS ===\n";
    csvContent += "Waste Stream,Distribution (%),Assigned Primary Facility\n";
    wasteTypeData.forEach((item) => {
      csvContent += `"${item.name}",${item.value}%,Kanjurmarg & Deonar Municipal Plants\n`;
    });
    csvContent += "\n";

    // 4. Incident Logs
    csvContent += "=== 4. FIELD INCIDENT & RECENT ACTIVITY LOG ===\n";
    csvContent += "Request ID,Location,Waste Type,Priority Level,Status,Reported Time\n";
    recentActivityData.forEach((req) => {
      csvContent += `"${req.id}","${req.location}","${req.type}","${req.priority}","${req.status}","${req.time}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFileName(fileName);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 5000);
  };

  // Filtered recent activity table
  const filteredActivity = recentActivityData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "All" || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen font-sans">
      {/* Download Toast Notification */}
      {downloadSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Report Downloaded Successfully!</p>
            <p className="text-xs text-slate-400">{downloadedFileName} (CSV Format)</p>
          </div>
          <button onClick={() => setDownloadSuccess(false)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Mumbai Waste Management Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of western suburbs collection metrics and field operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Export Report Button */}
          <button 
            onClick={handleExportReport}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Report</span>
          </button>

          {/* Dispatch Team Button: Redirects to Fleet & Teams section */}
          <Link
            href="/admin/teams?action=dispatch"
            className="px-5 py-2.5 bg-emerald-600 rounded-xl shadow-sm text-sm font-semibold text-white hover:bg-emerald-700 transition-all flex items-center gap-2 active:scale-95"
          >
            <Truck className="w-4 h-4" />
            <span>Dispatch Team</span>
          </Link>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Requests
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2,847</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Pickups
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">342</div>
            <p className="text-xs text-red-500 flex items-center mt-1 font-medium">
              28 critical priority
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Teams
            </CardTitle>
            <Truck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24/30</div>
            <p className="text-xs text-slate-500 mt-1">
              Fleets currently active
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">156</div>
            <p className="text-xs text-slate-500 mt-1">
              verified pickups
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2.4 hrs</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -32% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Citizen Satisfaction
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">94.2%</div>
            <p className="text-xs text-slate-500 mt-1">
              Based on recent feedback
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Weekly Trend */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Weekly Collection Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyCollectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Ward Performance */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Ward-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="requests" name="Total Requests" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Daily Trend */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Daily Collection Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Line type="monotone" dataKey="requests" name="New Requests" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="completed" name="Completed" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Waste Types (Glitch fixed: added relative positioning) */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Requests by Waste Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="40%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 bg-white/90 p-3 rounded-xl border border-slate-100 shadow-sm">
              {wasteTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <span className="text-slate-500 font-bold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table with Search & Filter */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">Recent Activity & Field Incidents</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Live incoming reports from Mumbai Western Suburbs</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area or ID..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 sm:w-56"
              />
            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 font-medium"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Request ID</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Waste Type</th>
                  <th className="px-6 py-4 font-semibold">Priority</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Reported</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivity.length > 0 ? (
                  filteredActivity.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{request.id}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{request.location}</td>
                      <td className="px-6 py-4 text-slate-600">{request.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${priorityColors[request.priority]}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{request.time}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href="/admin/teams?action=dispatch"
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          Dispatch &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400 text-xs">
                      No incident reports match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
