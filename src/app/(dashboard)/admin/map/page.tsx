"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Truck, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";

// Dynamically import map to avoid SSR issues
const WasteMap = dynamic(() => import("@/components/map/WasteMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-500 font-medium">
      Loading Municipal Heatmap Engine...
    </div>
  )
});

const hotspotsData = [
  { area: "Bandra West (Linking Road)", density: "High", requests: 34, priority: "Critical", borderColor: "border-l-red-500", badgeColor: "bg-red-100 text-red-700" },
  { area: "Juhu Beach (North End)", density: "High", requests: 41, priority: "Critical", borderColor: "border-l-red-500", badgeColor: "bg-red-100 text-red-700" },
  { area: "Andheri West (Lokhandwala)", density: "Medium", requests: 22, priority: "High", borderColor: "border-l-amber-500", badgeColor: "bg-amber-100 text-amber-700" },
  { area: "Goregaon West (SV Road)", density: "Medium", requests: 15, priority: "High", borderColor: "border-l-amber-500", badgeColor: "bg-amber-100 text-amber-700" },
  { area: "Borivali West (Gorai / IC Colony)", density: "Moderate", requests: 12, priority: "Medium", borderColor: "border-l-blue-500", badgeColor: "bg-blue-100 text-blue-700" },
];

export default function AdminMapPage() {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Live Heatmap & Hotspots</h2>
          <p className="text-slate-500 text-sm">Real-time geographical view of waste collection requests and active teams.</p>
        </div>
        <Link
          href="/admin/teams?action=dispatch"
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Truck className="w-3.5 h-3.5" /> Quick Dispatch Team
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[580px]">
        <div className="lg:col-span-3 h-full rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <WasteMap />
        </div>
        
        <div className="space-y-3 overflow-y-auto max-h-[640px] pr-1">
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-bold text-sm text-slate-800 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1.5 text-amber-500" />
              Active Incident Hotspots
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>

          {hotspotsData.map((hotspot, i) => (
            <Card key={i} className={`border-l-4 ${hotspot.borderColor} shadow-sm hover:border-slate-300 transition-all`}>
              <CardHeader className="p-3.5 pb-2">
                <div className="flex justify-between items-start gap-1">
                  <CardTitle className="text-xs font-bold text-slate-900">{hotspot.area}</CardTitle>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${hotspot.badgeColor}`}>
                    {hotspot.priority}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-3.5 pt-0 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Reports Logged:</span>
                  <span className="font-bold text-slate-900">{hotspot.requests} citizens</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Density:</span>
                  <span className="font-semibold text-slate-700">{hotspot.density}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <Link
                    href={`/admin/teams?action=dispatch`}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <Truck className="w-3 h-3" /> Dispatch Fleet &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
