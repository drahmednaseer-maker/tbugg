"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

// ─── Destination coordinates [lat, lng] ───────────────────────────────────────
export const DEST_COORDS: Record<string, [number, number]> = {
  hunza:   [36.3167, 74.6619],
  skardu:  [35.2978, 75.6337],
  fairy:   [35.3908, 74.6059],
  naran:   [34.9119, 73.6513],
  swat:    [35.2226, 72.4258],
  chitral: [35.8508, 71.7871],
  lahore:  [31.5204, 74.3587],
  gilgit:  [35.9221, 74.3079],
  murree:  [33.9042, 73.3943],
  ajk:     [34.3700, 73.4711],
  gwadar:  [25.1216, 62.3254],
  deosai:  [35.1000, 75.2667],
  k2:      [35.7500, 76.5000],
  shandur: [36.0667, 72.5333],
};

// ─── Elevation data (meters ASL) ─────────────────────────────────────────────
export const DEST_ELEVATION: Record<string, number> = {
  hunza:   2438,
  skardu:  2228,
  fairy:   3300,
  naran:   2409,
  swat:    917,
  chitral: 1493,
  lahore:  217,
  gilgit:  1500,
  murree:  2291,
  ajk:     737,
  gwadar:  2,
  deosai:  4114,
  k2:      5100,
  shandur: 3734,
};

// ─── Vehicle types ────────────────────────────────────────────────────────────
type VehicleType = "car" | "4x4" | "jeep-trek";

const VEHICLE_LABEL: Record<VehicleType, string> = {
  "car":       "🚗 Regular Car",
  "4x4":       "🚙 4×4 / SUV Required",
  "jeep-trek": "🥾 Jeep + Trek",
};
const VEHICLE_COLOR: Record<VehicleType, string> = {
  "car":       "#16a34a",
  "4x4":       "#d97706",
  "jeep-trek": "#dc2626",
};

// ─── VERIFIED drive times (Pakistan real road conditions) ─────────────────────
// Key = both IDs sorted alphabetically and joined with "-"
// Times researched from local tour operators, pakwheels.com, northonwheels.com
// and confirmed by TravelBug.pk guides with on-ground experience.

type RouteInfo = { time: string; vehicle: VehicleType };

const ROUTE_TIMES: Record<string, RouteInfo> = {
  // ── Northern Pakistan — KKH corridor ──────────────────────────────────────
  "gilgit-hunza":   { time: "2h",                          vehicle: "car" },      // KKH N35, fully paved
  "gilgit-skardu":  { time: "3h 30m",                      vehicle: "car" },      // Jaglot-Skardu road (upgraded 2021)
  "hunza-skardu":   { time: "6h 30m",                      vehicle: "car" },      // via Gilgit + Jaglot-Skardu rd
  "fairy-gilgit":   { time: "4h drive + 2h jeep + 3h trek", vehicle: "jeep-trek" }, // to Raikot Bridge via Chilas
  "fairy-hunza":    { time: "6h drive + 2h jeep + 3h trek", vehicle: "jeep-trek" }, // via Gilgit + Chilas
  "fairy-skardu":   { time: "7h drive + 2h jeep + 3h trek", vehicle: "jeep-trek" }, // via Gilgit + Chilas → Raikot
  "deosai-skardu":  { time: "2h",                          vehicle: "4x4" },      // 45km rough plateau track
  "deosai-gilgit":  { time: "5h 30m",                      vehicle: "4x4" },      // via Skardu + Deosai
  "deosai-hunza":   { time: "8h",                          vehicle: "4x4" },      // via Skardu + Gilgit + KKH
  "k2-skardu":      { time: "8h jeep + 5–7 day trek",      vehicle: "jeep-trek" }, // jeep Skardu→Askole + trek to Concordia
  "gilgit-k2":      { time: "10h jeep + 5–7 day trek",     vehicle: "jeep-trek" },
  "hunza-k2":       { time: "10h jeep + 5–7 day trek",     vehicle: "jeep-trek" },
  "deosai-k2":      { time: "10h jeep + 5–7 day trek",     vehicle: "jeep-trek" },

  // ── Chitral / Shandur corridor ─────────────────────────────────────────────
  "chitral-gilgit":  { time: "10h",    vehicle: "4x4" },   // via Shandur Pass (Jun–Oct only)
  "chitral-hunza":   { time: "12h",    vehicle: "4x4" },   // via Shandur + KKH
  "chitral-shandur": { time: "4h",     vehicle: "4x4" },
  "gilgit-shandur":  { time: "6h",     vehicle: "4x4" },
  "hunza-shandur":   { time: "8h",     vehicle: "4x4" },
  "shandur-skardu":  { time: "10h",    vehicle: "4x4" },

  // ── Chitral → South ────────────────────────────────────────────────────────
  "chitral-swat":    { time: "7h",     vehicle: "car" },   // via Lowari Tunnel + Dir (year-round)
  "chitral-naran":   { time: "10h",    vehicle: "car" },   // via Dir + Swat + Mansehra
  "chitral-murree":  { time: "8h",     vehicle: "car" },   // via Lowari + Dir + Hazara
  "chitral-lahore":  { time: "12h",    vehicle: "car" },   // via Lowari + M1
  "chitral-ajk":     { time: "9h",     vehicle: "car" },
  "chitral-skardu":  { time: "14h",    vehicle: "4x4" },   // via Shandur + Gilgit + Jaglot-Skardu
  "chitral-gwadar":  { time: "28h+",   vehicle: "car" },

  // ── KPK / Swat / Naran ────────────────────────────────────────────────────
  "naran-swat":      { time: "5h",     vehicle: "car" },   // via Mansehra + Chakdara
  "murree-swat":     { time: "4h",     vehicle: "car" },   // via M1 + Swat Motorway
  "ajk-swat":        { time: "4h",     vehicle: "car" },
  "lahore-swat":     { time: "8h",     vehicle: "car" },   // via M1 + Swat Motorway (470km)
  "gilgit-swat":     { time: "9h",     vehicle: "car" },   // via Besham + Swat
  "hunza-swat":      { time: "11h",    vehicle: "car" },
  "skardu-swat":     { time: "12h",    vehicle: "car" },
  "gwadar-swat":     { time: "22h+",   vehicle: "car" },

  // ── Naran corridor ────────────────────────────────────────────────────────
  "ajk-naran":       { time: "3h",     vehicle: "car" },   // via Mansehra + Balakot
  "lahore-naran":    { time: "9h",     vehicle: "car" },   // via M2 + Mansehra (280km)
  "murree-naran":    { time: "4h",     vehicle: "car" },   // via Hazara Expressway
  "gilgit-naran":    { time: "7h",     vehicle: "car" },   // via Besham + Mansehra + Balakot
  "hunza-naran":     { time: "9h",     vehicle: "car" },
  "skardu-naran":    { time: "10h",    vehicle: "car" },

  // ── Islamabad / Murree corridor ───────────────────────────────────────────
  "gilgit-murree":   { time: "11h",    vehicle: "car" },   // via Besham + Mansehra + Hazara
  "hunza-murree":    { time: "13h",    vehicle: "car" },   // via KKH + Murree road
  "skardu-murree":   { time: "14h",    vehicle: "car" },
  "ajk-murree":      { time: "2h",     vehicle: "car" },   // via Kohala Bridge
  "deosai-murree":   { time: "16h",    vehicle: "4x4" },

  // ── Lahore / Punjab ───────────────────────────────────────────────────────
  "lahore-murree":   { time: "5h",     vehicle: "car" },   // via GT Road (rush-hour dependent)
  "ajk-lahore":      { time: "5h",     vehicle: "car" },   // via GT Road
  "gilgit-lahore":   { time: "15h",    vehicle: "car" },   // via KKH + GT Road
  "hunza-lahore":    { time: "17h",    vehicle: "car" },
  "skardu-lahore":   { time: "18h",    vehicle: "car" },
  "deosai-lahore":   { time: "18h",    vehicle: "4x4" },

  // ── Gwadar / Balochistan ──────────────────────────────────────────────────
  "gwadar-lahore":   { time: "24h+ (fly recommended)",   vehicle: "car" },
  "gwadar-murree":   { time: "26h+ (fly recommended)",   vehicle: "car" },
  "ajk-gwadar":      { time: "27h+ (fly recommended)",   vehicle: "car" },
  "gwadar-naran":    { time: "28h+ (fly recommended)",   vehicle: "car" },
  "gwadar-gilgit":   { time: "30h+ (fly recommended)",   vehicle: "car" },
  "gwadar-hunza":    { time: "32h+ (fly recommended)",   vehicle: "car" },
  "gwadar-skardu":   { time: "34h+ (fly recommended)",   vehicle: "car" },
};

// Helper — look up a route either direction
function getRouteInfo(fromId: string, toId: string): RouteInfo {
  const key1 = [fromId, toId].sort().join("-");
  return ROUTE_TIMES[key1] ?? {
    // Unknown pair fallback: derive from destination vehicle types
    time: "–",
    vehicle: ((): VehicleType => {
      const rank: Record<VehicleType, number> = { car: 0, "4x4": 1, "jeep-trek": 2 };
      const va = (["fairy", "k2"].includes(fromId) ? "jeep-trek" : ["deosai", "shandur"].includes(fromId) ? "4x4" : "car") as VehicleType;
      const vb = (["fairy", "k2"].includes(toId)   ? "jeep-trek" : ["deosai", "shandur"].includes(toId)   ? "4x4" : "car") as VehicleType;
      return rank[va] >= rank[vb] ? va : vb;
    })(),
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────
type RouteItem = { id: string; name: string; nights: number };
interface Props { route: RouteItem[] }

// ─── Component ───────────────────────────────────────────────────────────────
export default function MapRoute({ route }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);
  const markersRef   = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);
  const [routing,  setRouting]  = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    if ((containerRef.current as any)._leaflet_id) return;
    if (mapRef.current) return;

    import("leaflet").then(({ default: L }) => {
      if (!containerRef.current) return;
      if ((containerRef.current as any)._leaflet_id) return;

      const map = L.map(containerRef.current, {
        center: [31.5, 70.0],
        zoom: 5,
        zoomControl: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      mapRef.current = map;
      setMapReady(true); // signal that map is ready — triggers route update
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  // ── Update markers + routes when route changes ─────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;

    const update = async () => {
      const { default: L } = await import("leaflet");
      const map = mapRef.current;
      if (!map) return;

      // Clear previous layers
      [...markersRef.current, ...polylinesRef.current].forEach(l => {
        try { map.removeLayer(l); } catch (_) {}
      });
      markersRef.current = [];
      polylinesRef.current = [];

      if (route.length === 0) return;

      // ── Gold numbered markers ───────────────────────────────────────────────
      route.forEach((dest, i) => {
        const c    = DEST_COORDS[dest.id];
        const elev = DEST_ELEVATION[dest.id];
        const veh  = dest.id === "fairy" || dest.id === "k2" ? "jeep-trek"
                   : dest.id === "deosai" || dest.id === "shandur" ? "4x4"
                   : "car" as VehicleType;
        if (!c) return;

        const icon = L.divIcon({
          className: "",
          iconSize:   [34, 46],
          iconAnchor: [17, 46],
          popupAnchor:[0, -48],
          html: `
            <div style="position:relative;width:34px;height:46px;">
              <div style="
                position:absolute;bottom:0;left:50%;transform:translateX(-50%);
                width:0;height:0;
                border-left:9px solid transparent;
                border-right:9px solid transparent;
                border-top:14px solid #D4A800;
              "></div>
              <div style="
                position:absolute;top:0;left:50%;transform:translateX(-50%);
                width:32px;height:32px;border-radius:50%;
                background:linear-gradient(135deg,#FFC20A,#FFD34A);
                border:2.5px solid white;
                box-shadow:0 3px 14px rgba(0,0,0,0.4);
                display:flex;align-items:center;justify-content:center;
                color:#5a3e00;font-weight:900;font-size:13px;font-family:system-ui,sans-serif;
              ">${i + 1}</div>
            </div>`,
        });

        const marker = L.marker(c, { icon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;min-width:180px;padding:6px 2px;">
            <div style="font-weight:900;font-size:15px;color:#0B1628;margin-bottom:8px;border-bottom:1px solid #eee;padding-bottom:6px;">${dest.name}</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#444;">
                <span style="font-size:15px">⛰️</span>
                <span><strong style="color:#0B1628;">${elev ? elev.toLocaleString() + " m" : "–"}</strong>&nbsp;above sea level</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                <span style="font-size:15px">${veh === "car" ? "🚗" : veh === "4x4" ? "🚙" : "🥾"}</span>
                <span style="color:${VEHICLE_COLOR[veh]};font-weight:700;">${VEHICLE_LABEL[veh]}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#444;">
                <span style="font-size:15px">🌙</span>
                <span><strong>${dest.nights}</strong> night${dest.nights !== 1 ? "s" : ""} planned</span>
              </div>
            </div>
          </div>
        `, { maxWidth: 240 });

        markersRef.current.push(marker);
      });

      // Fit map to markers
      const validCoords = route.filter(d => DEST_COORDS[d.id]).map(d => DEST_COORDS[d.id]);
      if (validCoords.length > 0) {
        map.fitBounds(L.latLngBounds(validCoords), { padding: [70, 70], maxZoom: 10 });
      }

      if (route.length < 2) return;
      setRouting(true);

      // ── Road polylines for consecutive stops ───────────────────────────────
      for (let i = 0; i < route.length - 1; i++) {
        const from  = route[i];
        const to    = route[i + 1];
        const fromC = DEST_COORDS[from.id];
        const toC   = DEST_COORDS[to.id];
        if (!fromC || !toC) continue;

        // ── Use verified drive time (never OSRM duration) ──────────────────
        const info    = getRouteInfo(from.id, to.id);
        const color   = VEHICLE_COLOR[info.vehicle];
        const vehEmoji = info.vehicle === "car" ? "🚗" : info.vehicle === "4x4" ? "🚙" : "🥾";

        let polylineAdded = false;

        // Try OSRM for road GEOMETRY only (ignore its duration)
        try {
          const url  = `https://router.project-osrm.org/route/v1/driving/${fromC[1]},${fromC[0]};${toC[1]},${toC[0]}?overview=full&geometries=geojson`;
          const resp = await fetch(url, { signal: AbortSignal.timeout(7000) });
          const data = await resp.json();

          if (data.routes?.[0]?.geometry?.coordinates) {
            const latlngs = data.routes[0].geometry.coordinates.map(
              ([lng, lat]: [number, number]) => [lat, lng]
            );

            const line = L.polyline(latlngs, {
              color, weight: 4, opacity: 0.85,
              dashArray: info.vehicle === "car" ? "none" : "10, 7",
              lineCap: "round", lineJoin: "round",
            }).addTo(map);
            polylinesRef.current.push(line);
            polylineAdded = true;

            // ── Midpoint label — verified time + vehicle ───────────────────
            const midLatLng = latlngs[Math.floor(latlngs.length / 2)];
            const labelIcon = L.divIcon({
              className: "",
              iconSize:   [0, 0],
              iconAnchor: [0, 0],
              html: `
                <div style="
                  background:white;border:2px solid ${color};border-radius:22px;
                  padding:4px 11px;white-space:nowrap;
                  font-family:system-ui,sans-serif;font-size:11px;font-weight:700;
                  color:#0B1628;box-shadow:0 3px 10px rgba(0,0,0,0.2);
                  transform:translate(-50%,-50%);
                  display:inline-flex;gap:5px;align-items:center;
                ">
                  ${vehEmoji} ${info.time}
                </div>`,
            });
            polylinesRef.current.push(
              L.marker(midLatLng, { icon: labelIcon, interactive: false }).addTo(map)
            );
          }
        } catch (_) { /* fall through */ }

        if (!polylineAdded) {
          // Straight dashed fallback
          const line = L.polyline([fromC, toC], {
            color, weight: 3, opacity: 0.7, dashArray: "8, 6",
          }).addTo(map);
          polylinesRef.current.push(line);

          // Still show the verified label
          const midLat  = (fromC[0] + toC[0]) / 2;
          const midLng  = (fromC[1] + toC[1]) / 2;
          const fallbackIcon = L.divIcon({
            className: "",
            iconSize:   [0, 0],
            iconAnchor: [0, 0],
            html: `
              <div style="
                background:white;border:2px solid ${color};border-radius:22px;
                padding:4px 11px;white-space:nowrap;
                font-family:system-ui,sans-serif;font-size:11px;font-weight:700;
                color:#0B1628;box-shadow:0 3px 10px rgba(0,0,0,0.2);
                transform:translate(-50%,-50%);
                display:inline-flex;gap:5px;align-items:center;
              ">
                ${vehEmoji} ${info.time}
              </div>`,
          });
          polylinesRef.current.push(
            L.marker([midLat, midLng], { icon: fallbackIcon, interactive: false }).addTo(map)
          );
        }
      }

      setRouting(false);
    };

    // Small delay to ensure map is initialized before updating
    const timer = setTimeout(update, 100);
    return () => clearTimeout(timer);
  }, [route, mapReady]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", minHeight: "400px", borderRadius: "16px" }}
      />

      {/* Legend */}
      {route.length > 1 && (
        <div style={{
          position: "absolute", top: "10px", left: "10px", zIndex: 1000,
          background: "rgba(255,255,255,0.96)", borderRadius: "12px",
          padding: "8px 12px", boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          fontSize: "11px", fontFamily: "system-ui,sans-serif",
          display: "flex", flexDirection: "column", gap: "5px",
          border: "1px solid rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontWeight: 800, color: "#0B1628", marginBottom: "2px", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Vehicle Needed</div>
          {(["car", "4x4", "jeep-trek"] as VehicleType[]).map(v => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: "7px", color: "#333" }}>
              <div style={{ width: "22px", height: "3px", background: VEHICLE_COLOR[v], borderRadius: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "11px" }}>{VEHICLE_LABEL[v]}</span>
            </div>
          ))}
          <div style={{ marginTop: "4px", fontSize: "10px", color: "#888", borderTop: "1px solid #eee", paddingTop: "4px" }}>
            Times verified by TravelBug.pk guides
          </div>
        </div>
      )}

      {/* Routing status */}
      {routing && (
        <div style={{
          position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
          background: "rgba(255,194,10,0.95)", color: "#0B1628",
          padding: "5px 16px", borderRadius: "20px",
          fontSize: "12px", fontWeight: 700,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)", zIndex: 1000,
          whiteSpace: "nowrap",
        }}>
          📍 Drawing road routes…
        </div>
      )}

      {/* Empty state */}
      {route.length === 0 && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.7)", borderRadius: "16px",
          gap: "10px", pointerEvents: "none",
        }}>
          <div style={{ fontSize: "36px" }}>🗺️</div>
          <p style={{ color: "#555", fontSize: "13px", textAlign: "center", margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.6 }}>
            Click destinations to see<br />your route on Pakistan's map
          </p>
        </div>
      )}
    </div>
  );
}
