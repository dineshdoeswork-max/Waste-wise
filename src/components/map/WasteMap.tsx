"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Defining types for our marker data
interface MarkerData {
  pos: [number, number];
  area: string;
  issue: string;
  type: string;
  reports: number;
  priority: string;
  status: string;
  color: string;
  radius: number;
}

const markers: MarkerData[] = [
  // Critical
  { pos: [19.0596, 72.8295], area: "Bandra West - Linking Road", issue: "Overflowing Public Bins", type: "Mixed Commercial", reports: 34, priority: "Critical", status: "Action Required", color: "#ef4444", radius: 12 },
  { pos: [19.0988, 72.8268], area: "Juhu Beach (North End)", issue: "Plastic Waste Accumulation", type: "Plastic & Marine", reports: 41, priority: "Critical", status: "Action Required", color: "#ef4444", radius: 12 },
  { pos: [19.2500, 72.8550], area: "Dahisar West - River Edge", issue: "Illegal Industrial Dumping", type: "Hazardous/Mixed", reports: 27, priority: "Critical", status: "Action Required", color: "#ef4444", radius: 12 },

  // High
  { pos: [19.1363, 72.8263], area: "Andheri West - Lokhandwala", issue: "Street Litter & Food Waste", type: "Organic & Plastic", reports: 22, priority: "High", status: "Scheduled", color: "#f97316", radius: 9 },
  { pos: [19.1663, 72.8365], area: "Goregaon West - SV Road", issue: "Construction Debris", type: "Debris", reports: 15, priority: "High", status: "Pending Assessment", color: "#f97316", radius: 9 },
  { pos: [19.1481, 72.8735], area: "Aarey Colony Border (Goregaon)", issue: "Forest Edge Dumping", type: "Mixed Waste", reports: 28, priority: "High", status: "Scheduled", color: "#f97316", radius: 9 },
  { pos: [19.1914, 72.8172], area: "Malad West - Marve Road", issue: "Open Garbage Dump", type: "Organic", reports: 19, priority: "High", status: "Scheduled", color: "#f97316", radius: 9 },

  // Medium
  { pos: [19.2185, 72.8503], area: "Kandivali West - Mahavir Nagar", issue: "Food Waste from Eateries", type: "Organic", reports: 9, priority: "Medium", status: "Monitoring", color: "#eab308", radius: 7 },
  { pos: [19.2307, 72.8567], area: "Borivali West - IC Colony", issue: "E-Waste Disposal Delay", type: "E-Waste", reports: 11, priority: "Medium", status: "Monitoring", color: "#eab308", radius: 7 },
  { pos: [19.2274, 72.8601], area: "Sanjay Gandhi National Park Entrance", issue: "Tourist Litter", type: "Plastic", reports: 14, priority: "Medium", status: "Monitoring", color: "#eab308", radius: 7 },

  // Resolved / Completed
  { pos: [19.0749, 72.8307], area: "Khar West - Station Road", issue: "Weekly Market Waste", type: "Organic", reports: 45, priority: "Resolved", status: "Completed", color: "#22c55e", radius: 6 },
  { pos: [19.0891, 72.8359], area: "Santacruz West - Market", issue: "Carton & Packaging", type: "Recyclable", reports: 38, priority: "Resolved", status: "Completed", color: "#22c55e", radius: 6 },
  { pos: [19.1365, 72.8299], area: "Versova Beach", issue: "Weekend Cleanup Drive", type: "Mixed Marine", reports: 62, priority: "Resolved", status: "Completed", color: "#22c55e", radius: 6 },
];

const hotspots: [number, number][] = [
  [19.0596, 72.8295], // Bandra Linking Rd
  [19.0988, 72.8268], // Juhu
  [19.2500, 72.8550], // Dahisar
];

export default function WasteMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // Leaflet map instance

  useEffect(() => {
    // Only import leaflet on the client side
    const L = require("leaflet");

    if (mapRef.current && !mapInstance.current) {
      // Initialize map focused on Mumbai Western Suburbs
      const map = L.map(mapRef.current).setView([19.16, 72.84], 11);
      mapInstance.current = map;

      // Add professional Esri Light Gray tile layer for a cleaner, modern look without API keys
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      }).addTo(map);

      // Add markers
      markers.forEach((m) => {
        const marker = L.circleMarker(m.pos, {
          radius: m.radius,
          color: "#ffffff",
          weight: 1.5,
          fillColor: m.color,
          fillOpacity: 0.85,
        }).addTo(map);

        const statusBadgeColor = m.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                m.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                                'bg-orange-100 text-orange-800';

        const popupContent = `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; min-width: 220px; padding: 4px;">
            <div style="font-weight: 700; color: #1e293b; margin-bottom: 4px; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">${m.area}</div>
            <div style="font-size: 13px; color: #475569; margin-top: 8px;">
              <div style="margin-bottom: 6px;"><strong style="color: #334155;">Issue:</strong> ${m.issue}</div>
              <div style="margin-bottom: 6px;"><strong style="color: #334155;">Type:</strong> ${m.type}</div>
              <div style="margin-bottom: 6px;"><strong style="color: #334155;">Reports:</strong> ${m.reports} citizens</div>
              <div style="margin-bottom: 8px;"><strong style="color: #334155;">Status:</strong> 
                <span style="display: inline-block; padding: 2px 6px; border-radius: 9999px; font-size: 11px; font-weight: 600; background-color: ${m.color}20; color: ${m.color}; border: 1px solid ${m.color}40;">
                  ${m.status}
                </span>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: 'custom-popup',
          closeButton: false
        });
      });

      // Add hotspots
      hotspots.forEach((pos) => {
        L.circle(pos, {
          radius: 1200,
          color: "#ef4444",
          fillColor: "#ef4444",
          fillOpacity: 0.1,
          weight: 1,
          dashArray: "4 4"
        }).addTo(map);
      });

      // Add Legend
      const legend = new L.Control({ position: "bottomright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        div.style.padding = "12px 16px";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)";
        div.style.fontFamily = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        div.style.fontSize = "13px";
        div.style.border = "1px solid #e2e8f0";
        
        const categories = [
          { label: "Critical Priority", color: "#ef4444" },
          { label: "High Priority", color: "#f97316" },
          { label: "Medium Priority", color: "#eab308" },
          { label: "Resolved", color: "#22c55e" },
        ];

        let html = '<div style="font-weight: 700; color: #1e293b; margin-bottom: 8px; font-size: 14px;">Incident Severity</div>';
        categories.forEach((c) => {
          html += `
            <div style="display: flex; align-items: center; margin-bottom: 6px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${c.color}; border: 1px solid #ffffff; box-shadow: 0 0 0 1px ${c.color}40; margin-right: 10px;"></div>
              <span style="color: #475569; font-weight: 500;">${c.label}</span>
            </div>
          `;
        });
        
        html += `
          <div style="display: flex; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
            <div style="width: 16px; height: 16px; border-radius: 50%; background-color: rgba(239, 68, 68, 0.1); border: 1px dashed #ef4444; margin-right: 8px;"></div>
            <span style="color: #475569; font-weight: 500; font-size: 12px;">Active Hotspot (1.2km)</span>
          </div>
        `;

        div.innerHTML = html;
        return div;
      };
      legend.addTo(map);
      
      // Add custom styles for popups to document
      const style = document.createElement('style');
      style.innerHTML = `
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "500px", zIndex: 0, borderRadius: "0.5rem", overflow: "hidden" }} />;
}

