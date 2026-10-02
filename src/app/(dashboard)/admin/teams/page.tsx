"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Truck, Wrench, AlertCircle, Map, Plus, 
  CheckCircle2, X, Send, ShieldAlert, Sparkles, Check
} from "lucide-react";

interface TeamItem {
  id: number;
  name: string;
  plate: string;
  status: "Active" | "Maintenance" | "Inactive";
  pickups: number;
  maxPickups: number;
  lead: string;
  zone: string;
}

const initialTeams: TeamItem[] = [
  { id: 1, name: "Bandra Fleet Alpha", plate: "MH-02-AB-1234", status: "Active", pickups: 8, maxPickups: 15, lead: "Rajesh Kumar", zone: "Bandra West" },
  { id: 2, name: "Bandra Fleet Beta", plate: "MH-02-AB-5678", status: "Active", pickups: 6, maxPickups: 15, lead: "Suresh Patil", zone: "Bandra West" },
  { id: 3, name: "Andheri Fleet Alpha", plate: "MH-02-CD-1234", status: "Active", pickups: 12, maxPickups: 15, lead: "Amit Shah", zone: "Andheri West" },
  { id: 4, name: "Andheri Fleet Beta", plate: "MH-02-CD-5678", status: "Active", pickups: 9, maxPickups: 15, lead: "Vikram Desai", zone: "Andheri West" },
  { id: 5, name: "Goregaon Fleet", plate: "MH-02-EF-1234", status: "Active", pickups: 7, maxPickups: 15, lead: "Deepak Joshi", zone: "Goregaon West" },
  { id: 6, name: "Borivali Fleet Alpha", plate: "MH-02-GH-1234", status: "Active", pickups: 10, maxPickups: 15, lead: "Manoj Tiwari", zone: "Borivali West" },
  { id: 7, name: "Borivali Fleet Beta", plate: "MH-02-GH-5678", status: "Maintenance", pickups: 0, maxPickups: 15, lead: "Sanjay More", zone: "Borivali West" },
  { id: 8, name: "Malad Fleet", plate: "MH-02-IJ-1234", status: "Active", pickups: 5, maxPickups: 15, lead: "Rahul Gupta", zone: "Malad West" },
  { id: 9, name: "Kandivali Fleet", plate: "MH-02-KL-1234", status: "Active", pickups: 8, maxPickups: 15, lead: "Nitin Sharma", zone: "Kandivali West" },
  { id: 10, name: "Dahisar Fleet", plate: "MH-02-MN-1234", status: "Active", pickups: 4, maxPickups: 15, lead: "Pravin Sawant", zone: "Dahisar West" },
  { id: 11, name: "Jogeshwari Fleet", plate: "MH-02-OP-1234", status: "Maintenance", pickups: 0, maxPickups: 15, lead: "Sachin Kulkarni", zone: "Jogeshwari West" },
  { id: 12, name: "Versova Fleet", plate: "MH-02-QR-1234", status: "Active", pickups: 6, maxPickups: 15, lead: "Anil Pawar", zone: "Versova & Juhu" },
];

const priorityHotspots = [
  { id: "H-1", name: "Bandra West - Linking Road (Critical - Overflowing Bins)", priority: "Critical" },
  { id: "H-2", name: "Juhu Beach North End (Critical - Plastic Accumulation)", priority: "Critical" },
  { id: "H-3", name: "Dahisar West River Edge (Critical - Dumping Debris)", priority: "Critical" },
  { id: "H-4", name: "Goregaon West - SV Road (High - Sidewalk Spillage)", priority: "High" },
  { id: "H-5", name: "Malad West - Link Road (Critical - E-Waste near Drain)", priority: "Critical" },
  { id: "H-6", name: "Borivali West - IC Colony (Medium - Weekly Clearance)", priority: "Medium" },
];

function TeamsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [teams, setTeams] = useState<TeamItem[]>(initialTeams);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<string>(priorityHotspots[0].name);
  const [dispatchUrgency, setDispatchUrgency] = useState<string>("Critical");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Team form states
  const [newTeamName, setNewTeamName] = useState("");
  const [newPlate, setNewPlate] = useState("");
  const [newLead, setNewLead] = useState("");
  const [newZone, setNewZone] = useState("Bandra West");

  // Check if routed with ?action=dispatch
  useEffect(() => {
    if (searchParams.get("action") === "dispatch") {
      setIsDispatchModalOpen(true);
    }
  }, [searchParams]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleOpenDispatchForTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
    setIsDispatchModalOpen(true);
  };

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const team = teams.find((t) => t.id === selectedTeamId);
    if (!team) return;

    setTeams((prev) =>
      prev.map((t) =>
        t.id === selectedTeamId
          ? { ...t, pickups: Math.min(t.maxPickups, t.pickups + 1) }
          : t
      )
    );

    setIsDispatchModalOpen(false);
    showToast(
      `✓ Dispatch successful! ${team.name} (${team.plate}) dispatched to "${selectedHotspot}" with ${dispatchUrgency} priority.`
    );
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newPlate.trim()) return;

    const newTeam: TeamItem = {
      id: Date.now(),
      name: newTeamName.trim(),
      plate: newPlate.trim(),
      status: "Active",
      pickups: 0,
      maxPickups: 15,
      lead: newLead.trim() || "Assigned Officer",
      zone: newZone,
    };

    setTeams([newTeam, ...teams]);
    setIsAddTeamModalOpen(false);
    setNewTeamName("");
    setNewPlate("");
    setNewLead("");
    showToast(`✓ New fleet "${newTeam.name}" successfully registered and ready for operations!`);
  };

  const activeCount = teams.filter((t) => t.status === "Active").length;
  const maintenanceCount = teams.filter((t) => t.status === "Maintenance").length;
  const inactiveCount = teams.filter((t) => t.status === "Inactive").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-md">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium flex-1">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Collection Teams - Fleet Management
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
              {activeCount} Active Fleets
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Dispatch, monitor, and configure municipal waste trucks across western suburbs zones.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={() => setIsDispatchModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Dispatch Fleet Now
          </Button>

          <Button
            onClick={() => setIsAddTeamModalOpen(true)}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            <Plus className="mr-1.5 h-4 w-4 text-emerald-600" /> Add Team
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Teams</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{teams.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Now</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{activeCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On Maintenance</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{maintenanceCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inactive / Standby</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{inactiveCount}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="border-slate-200 flex flex-col hover:border-slate-300 transition-all shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-800">{team.name}</CardTitle>
                  <div className="flex items-center text-slate-500 text-xs mt-1 font-mono">
                    <Truck className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    <span>{team.plate}</span>
                    <span className="mx-1.5">•</span>
                    <span className="text-slate-600 font-sans">{team.zone}</span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    team.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : team.status === "Maintenance"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {team.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Team Lead:</span>
                <span className="text-slate-900 font-semibold">{team.lead}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Today&apos;s Pickups:</span>
                  <span className="font-bold text-slate-800">
                    {team.pickups} / {team.maxPickups}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      team.status === "Maintenance" ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(100, (team.pickups / team.maxPickups) * 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100 gap-2">
              <Link href="/admin/map" className="flex-1">
                <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 text-xs">
                  <Map className="mr-1.5 h-3.5 w-3.5 text-blue-600" /> Route Map
                </Button>
              </Link>
              <Button
                onClick={() => handleOpenDispatchForTeam(team.id)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                disabled={team.status !== "Active"}
              >
                <Send className="mr-1.5 h-3.5 w-3.5" /> Dispatch
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dispatch Fleet Modal */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  Dispatch Collection Fleet
                </h3>
                <p className="text-xs text-slate-500">Assign a mobile team to an urgent Mumbai waste hotspot</p>
              </div>
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Active Fleet
                </label>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold bg-white"
                >
                  {teams
                    .filter((t) => t.status === "Active")
                    .map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.plate}) — {team.zone} [{team.pickups}/{team.maxPickups} pickups]
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Priority Incident / Hotspot
                </label>
                <select
                  value={selectedHotspot}
                  onChange={(e) => setSelectedHotspot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold bg-white"
                >
                  {priorityHotspots.map((hotspot) => (
                    <option key={hotspot.id} value={hotspot.name}>
                      [{hotspot.priority}] {hotspot.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Urgency Override
                  </label>
                  <select
                    value={dispatchUrgency}
                    onChange={(e) => setDispatchUrgency(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium bg-white"
                  >
                    <option value="Critical">Critical (Immediate Route Ingestion)</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assigned Compactor
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Municipal 5-Ton Compactor"
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Live GPS Route Ingestion Ready
                </p>
                <p className="text-emerald-700">
                  Dispatching will instantly broadcast the optimal route and GPS coordinates to the collector dashboard app.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDispatchModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <Send className="w-4 h-4 mr-1.5" /> Confirm Dispatch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Team Modal */}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  Register New Fleet Team
                </h3>
                <p className="text-xs text-slate-500">Add a new waste collection truck to the municipal roster</p>
              </div>
              <button
                onClick={() => setIsAddTeamModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Team / Fleet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malad Fleet Gamma"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Vehicle Number Plate
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MH-02-XY-1234"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assigned Zone
                  </label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                  >
                    <option>Bandra West</option>
                    <option>Andheri West</option>
                    <option>Goregaon West</option>
                    <option>Malad West</option>
                    <option>Borivali West</option>
                    <option>Kandivali West</option>
                    <option>Dahisar West</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Team Lead / Driver Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kulkarni"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddTeamModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <Check className="w-4 h-4 mr-1.5" /> Save Fleet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeamsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Fleet & Teams...</div>}>
      <TeamsContent />
    </Suspense>
  );
}
