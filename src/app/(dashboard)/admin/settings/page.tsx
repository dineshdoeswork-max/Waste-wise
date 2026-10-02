"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sliders, Bell, Map, ShieldCheck, Database, Save, RotateCcw } from "lucide-react";

export default function SettingsPage() {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [requireGeotag, setRequireGeotag] = useState(true);
  const [citizenSms, setCitizenSms] = useState(true);
  const [gpsInterval, setGpsInterval] = useState("15s");
  const [tileProvider, setTileProvider] = useState("esri-light");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = () => {
    setAutoDispatch(true);
    setRequireGeotag(true);
    setCitizenSms(true);
    setGpsInterval("15s");
    setTileProvider("esri-light");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6 font-sans">
      {savedSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <p className="text-sm font-semibold">Settings successfully updated!</p>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin & System Settings</h1>
        <p className="text-slate-500 mt-1">Configure automated routing parameters, dispatch algorithms, and telemetry.</p>
      </div>

      <div className="space-y-6">
        {/* Routing & Dispatch Settings */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Sliders className="w-5 h-5 text-emerald-600" /> Dispatch & Optimization Engine
            </CardTitle>
            <CardDescription>Configure AI priority sorting and automated fleet dispatches.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-800">Auto-Dispatch Critical Priority Reports</p>
                <p className="text-xs text-slate-500">Automatically prompt nearest active fleet when critical hospital or drainage hazards occur.</p>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-800">Mandatory GPS Geotag Photo Verification</p>
                <p className="text-xs text-slate-500">Require collectors to provide camera proof with matching coordinates before closing task.</p>
              </div>
              <input
                type="checkbox"
                checked={requireGeotag}
                onChange={(e) => setRequireGeotag(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-800">GPS Telemetry Polling Rate</p>
                <p className="text-xs text-slate-500">Frequency of collection truck real-time GPS coordinate broadcasts.</p>
              </div>
              <select
                value={gpsInterval}
                onChange={(e) => setGpsInterval(e.target.value)}
                className="text-xs font-semibold p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="5s">Every 5 seconds (High Precision)</option>
                <option value="15s">Every 15 seconds (Recommended)</option>
                <option value="30s">Every 30 seconds (Data Saving)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Map */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Bell className="w-5 h-5 text-blue-600" /> Notifications & Cartography
            </CardTitle>
            <CardDescription>Public communication and map layer visualization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-800">Citizen Proximity SMS Alerts</p>
                <p className="text-xs text-slate-500">Send automatic SMS to citizen when municipal compactor is within 1.0 km.</p>
              </div>
              <input
                type="checkbox"
                checked={citizenSms}
                onChange={(e) => setCitizenSms(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-800">Base Map Provider</p>
                <p className="text-xs text-slate-500">Select cartographic tile styling for the admin heatmap.</p>
              </div>
              <select
                value={tileProvider}
                onChange={(e) => setTileProvider(e.target.value)}
                className="text-xs font-semibold p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="esri-light">Esri Light Canvas (Clean & High Contrast)</option>
                <option value="osm-standard">OpenStreetMap Standard</option>
                <option value="carto-dark">CartoDB Dark Matter</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={handleReset} className="border-slate-300 text-slate-700">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Defaults
          </Button>
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            <Save className="w-4 h-4 mr-2" /> Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
