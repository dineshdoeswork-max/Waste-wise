"use client";

import React, { useState } from 'react';
import { Camera, MapPin, RefreshCw, AlertTriangle, FileText, CheckCircle, Clock, ChevronDown, ChevronUp, Check, Activity, Calendar, Truck } from 'lucide-react';

const WasteTypes = ["Plastic", "Organic", "E-Waste", "Metal", "Glass", "Mixed Waste"];
const Quantities = ["Small Bag", "Multiple Bags", "Large Pile", "Truckload"];

const urgencies = [
  { label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
  { label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { label: 'Critical', color: 'bg-red-100 text-red-800 border-red-200' }
];

const initialReports = [
  { id: 'WR-2847', title: 'Plastic waste near Linking Road', location: 'Bandra W', priority: 'Critical', status: 'In Progress', date: 'Today 9:30 AM' },
  { id: 'WR-2841', title: 'Overflowing bin at Carter Road', location: 'Bandra W', priority: 'High', status: 'Assigned', date: 'Today 8:15 AM' },
  { id: 'WR-2835', title: 'Construction debris on SV Road', location: 'Andheri W', priority: 'Medium', status: 'Pending', date: 'Yesterday' },
  { id: 'WR-2829', title: 'E-waste dumped near station', location: 'Goregaon W', priority: 'High', status: 'Completed', date: 'Yesterday' },
  { id: 'WR-2814', title: 'Organic waste in park', location: 'Jogeshwari W', priority: 'Low', status: 'Completed', date: 'Oct 1' },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Low': return 'bg-green-100 text-green-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-700';
    case 'High': return 'bg-orange-100 text-orange-700';
    case 'Critical': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-slate-100 text-slate-600';
    case 'Assigned': return 'bg-blue-100 text-blue-600';
    case 'In Progress': return 'bg-purple-100 text-purple-600';
    case 'Completed': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState<'report' | 'request'>('report');
  const [urgency, setUrgency] = useState('Medium');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  
  // Dynamic reports state
  const [reports, setReports] = useState(initialReports);
  
  // Report Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wasteType, setWasteType] = useState('Plastic');
  const [quantity, setQuantity] = useState('Multiple Bags');
  const [location, setLocation] = useState('Near Lokhandwala Circle, Andheri West');
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Collection Request Form state
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState('Bandra West');
  const [preferredDate, setPreferredDate] = useState('');
  const [volume, setVolume] = useState('1-2 Bags');
  const [instructions, setInstructions] = useState('');
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newId = `WR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: newId,
      title: title.trim(),
      location: location.trim() || 'Western Suburbs',
      priority: urgency,
      status: 'Pending',
      date: 'Just now'
    };

    setReports([newReport, ...reports]);
    setReportSuccess(`Report ${newId} submitted successfully! Our dispatch team has been notified.`);
    setTitle('');
    setDescription('');
    
    setTimeout(() => {
      setReportSuccess(null);
    }, 5000);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setRequestSuccess(`Collection request scheduled for ${zone}! Municipal truck assigned.`);
    setAddress('');
    setInstructions('');
    
    setTimeout(() => {
      setRequestSuccess(null);
    }, 5000);
  };

  const resolvedCount = reports.filter(r => r.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Citizen Dashboard</h1>
          <p className="text-slate-500 mt-1">Report waste issues or request garbage collection in Mumbai Western Suburbs.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setActiveTab('report')}
                  className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'report' ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Report Issue
                </button>
                <button 
                  onClick={() => setActiveTab('request')}
                  className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'request' ? 'text-blue-700 border-b-2 border-blue-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                  <Truck className="w-4 h-4" />
                  Request Collection
                </button>
              </div>
              
              {activeTab === 'report' ? (
                <form onSubmit={handleReportSubmit} className="p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {reportSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span>{reportSuccess}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                      placeholder="e.g. Overflowing garbage bin" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                      rows={3} 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none" 
                      placeholder="Provide more details about the issue..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Waste Type</label>
                      <select 
                        value={wasteType}
                        onChange={(e) => setWasteType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                      >
                        {WasteTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                      <select 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                      >
                        {Quantities.map(qty => <option key={qty} value={qty}>{qty}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                    <div className="grid grid-cols-4 gap-2">
                      {urgencies.map((u) => (
                        <button
                          type="button"
                          key={u.label}
                          onClick={() => setUrgency(u.label)}
                          className={`py-2 px-1 text-xs font-medium rounded-md border text-center transition-all ${
                            urgency === u.label ? u.color + ' ring-2 ring-offset-1 ring-slate-400' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        <input 
                          type="text" 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Photo Proof</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-emerald-500 transition-colors" />
                      <p className="text-sm text-slate-600">Click to capture or drag & drop</p>
                      <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-emerald-200 transition-all active:scale-[0.98]"
                  >
                    Submit Report
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRequestSubmit} className="p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {requestSuccess && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{requestSuccess}</span>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4" /> Priority Area Based Assignment
                    </h3>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Garbage collection requests are automatically assigned and scheduled based on the priority level of your area to optimize municipal routes and efficiency.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                    <textarea 
                      rows={2} 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                      placeholder="Enter your full building/society address..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Collection Area / Zone</label>
                    <select 
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      <option>Bandra West</option>
                      <option>Khar West</option>
                      <option>Santacruz West</option>
                      <option>Andheri West</option>
                      <option>Goregaon West</option>
                      <option>Malad West</option>
                      <option>Borivali West</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="date" 
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Volume</label>
                      <select 
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
                      >
                        <option>1-2 Bags</option>
                        <option>3-5 Bags</option>
                        <option>Mini-Truck (Bulk)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Special Instructions (Optional)</label>
                    <input 
                      type="text" 
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="e.g. Call before arrival, Gate code..." 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-blue-200 transition-all active:scale-[0.98] mt-2"
                  >
                    Request Collection
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - My Reports */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 text-slate-500 mb-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Total Reports</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">{reports.length}</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 text-slate-500 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium">Resolved</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">
                  {resolvedCount} <span className="text-sm font-medium text-emerald-600 ml-1">
                    ({Math.round((resolvedCount / (reports.length || 1)) * 100)}%)
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 text-slate-500 mb-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium">Avg Resolution</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">4.2 <span className="text-sm font-medium text-slate-500 ml-1">hrs</span></div>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-600" />
                  Recent Activity
                </h2>
                <span className="text-sm text-slate-500 font-medium">Mumbai Western Suburbs</span>
              </div>
              
              <div className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <div key={report.id} className="p-5 hover:bg-slate-50 transition-colors">
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                    >
                      <div className="space-y-1.5 flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500">{report.id}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {report.date}
                          </span>
                        </div>
                        <h3 className="font-medium text-slate-900 leading-snug">{report.title}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {report.location}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(report.status)}`}>
                            {report.status === 'Completed' && <Check className="w-3 h-3" />}
                            {report.status}
                          </span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 p-1">
                          {expandedReport === report.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedReport === report.id && (
                      <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 bg-slate-50/50 p-4 rounded-lg">
                        <p className="mb-2"><strong>Issue Details:</strong> Found an increasing amount of {report.title.toLowerCase()} that needs immediate attention from the municipal corporation. It poses health hazards.</p>
                        <div className="flex gap-4 mt-3">
                          <button className="text-emerald-600 font-medium hover:underline text-xs">View Photos</button>
                          <button className="text-blue-600 font-medium hover:underline text-xs">Track Progress</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
