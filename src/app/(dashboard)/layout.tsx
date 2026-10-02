"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Leaf, 
  LayoutDashboard, 
  Map as MapIcon, 
  Users, 
  Settings, 
  LogOut, 
  Truck, 
  Home, 
  AlertTriangle,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error", e);
    }
    router.push("/login");
  };

  const isAdmin = pathname.startsWith("/admin");
  const isCitizen = pathname.startsWith("/citizen");
  const isCollector = pathname.startsWith("/collector");

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col hidden md:flex shrink-0">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">WasteWise</span>
          </Link>
        </div>

        {/* Dynamic Navigation according to Role */}
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          {isAdmin && (
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Admin Operations
              </div>
              <nav className="space-y-1">
                <Link
                  href="/admin"
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === "/admin"
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 mr-3" />
                  City Dashboard
                </Link>
                <Link
                  href="/admin/map"
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === "/admin/map"
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <MapIcon className="h-4 w-4 mr-3" />
                  Hotspot Heatmap
                </Link>
                <Link
                  href="/admin/teams"
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === "/admin/teams"
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Fleet & Teams
                </Link>
                <Link
                  href="/admin/settings"
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === "/admin/settings"
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
              </nav>
            </div>
          )}

          {isCitizen && (
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Citizen Portal
              </div>
              <nav className="space-y-1">
                <Link
                  href="/citizen"
                  className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-700"
                >
                  <Home className="h-4 w-4 mr-3" />
                  Citizen Portal
                </Link>
                <div className="px-3.5 py-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2 mb-2 font-medium text-slate-700">
                    <AlertTriangle className="h-3.5 w-3.5 text-emerald-600" /> Report Waste
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <Truck className="h-3.5 w-3.5 text-blue-600" /> Request Collection
                  </div>
                </div>
              </nav>
            </div>
          )}

          {isCollector && (
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Driver & Crew
              </div>
              <nav className="space-y-1">
                <Link
                  href="/collector"
                  className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700"
                >
                  <Truck className="h-4 w-4 mr-3" />
                  Today&apos;s Pickups
                </Link>
                <div className="px-3.5 py-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <ClipboardList className="h-3.5 w-3.5 text-blue-600" /> Route Optimizer Active
                  </div>
                </div>
              </nav>
            </div>
          )}

          {/* Quick Role Switcher for seamless testing */}
          <div className="pt-4 border-t border-slate-100">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Switch Role View
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <Link
                href="/citizen"
                className={`px-3 py-1.5 rounded-lg flex items-center justify-between ${
                  isCitizen ? "bg-slate-100 font-bold text-emerald-800" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Citizen View</span>
                {isCitizen && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </Link>
              <Link
                href="/collector"
                className={`px-3 py-1.5 rounded-lg flex items-center justify-between ${
                  isCollector ? "bg-slate-100 font-bold text-blue-800" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Collector View</span>
                {isCollector && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </Link>
              <Link
                href="/admin"
                className={`px-3 py-1.5 rounded-lg flex items-center justify-between ${
                  isAdmin ? "bg-slate-100 font-bold text-purple-800" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Admin View</span>
                {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
              </Link>
            </div>
          </div>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {userEmail && (
            <div className="px-2 py-1 text-xs text-slate-500 truncate" title={userEmail}>
              Logged in as <br /><span className="font-semibold text-slate-700">{userEmail}</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 text-sm"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-lg text-slate-900">WasteWise</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-xs text-slate-600 font-medium">
              Portal
            </Link>
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
