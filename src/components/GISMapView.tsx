import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  MapPin,
  Layers,
  Zap,
  Wind,
  Route,
  ZoomIn,
  ZoomOut,
  Navigation,
} from "lucide-react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import "ol/ol.css";

export function GISMapView() {
  const [activeLayer, setActiveLayer] = useState<
    "emissions" | "aqi" | "routes"
  >("emissions");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  // Mock GIS data points
  const emissionHotspots = [
    {
      id: 1,
      lat: 24.2081,
      lng: 84.9875,
      intensity: "high",
      value: 95,
      type: "Coal Loading Point",
    },
    {
      id: 2,
      lat: 24.1975,
      lng: 84.9925,
      intensity: "medium",
      value: 67,
      type: "Transport Junction",
    },
    {
      id: 3,
      lat: 24.2134,
      lng: 85.0012,
      intensity: "low",
      value: 32,
      type: "Village Area",
    },
    {
      id: 4,
      lat: 24.1892,
      lng: 84.9756,
      intensity: "high",
      value: 87,
      type: "Industrial Zone",
    },
  ];

  const aqiStations = [
    {
      id: 1,
      name: "School Area",
      aqi: 45,
      status: "Good",
      lat: 24.2081,
      lng: 84.9875,
    },
    {
      id: 2,
      name: "Village Center",
      aqi: 78,
      status: "Moderate",
      lat: 24.1975,
      lng: 84.9925,
    },
    {
      id: 3,
      name: "Coal Block Vicinity",
      aqi: 95,
      status: "Poor",
      lat: 24.2134,
      lng: 85.0012,
    },
  ];

  const routes = [
    {
      id: 1,
      name: "Route A - Primary",
      efficiency: "High",
      emissions: "Low",
      distance: "45.2 km",
    },
    {
      id: 2,
      name: "Route B - Alternative",
      efficiency: "Medium",
      emissions: "Medium",
      distance: "48.7 km",
    },
    {
      id: 3,
      name: "Route C - Backup",
      efficiency: "Low",
      emissions: "High",
      distance: "52.1 km",
    },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-[#DC2626]";
      case "medium":
        return "bg-[#F59E0B]";
      case "low":
        return "bg-[#15803D]";
      default:
        return "bg-gray-500";
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-[#15803D]";
    if (aqi <= 100) return "bg-[#F59E0B]";
    return "bg-[#DC2626]";
  };

  //-------------------------------
  const mapRef = useRef();

  useEffect(() => {
    // const esriSatellite = new TileLayer({
    //   source: new XYZ({
    //     url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //     attributions: "Tiles © Esri",
    //   }),
    // });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([86.43589686685833, 23.810795924741583]), // Chatra District approx
        zoom: 12,
      }),
    });

    return () => map.setTarget();
  }, []);

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#1E3A8A]" />
          <span className="text-sm font-medium">Map Layers:</span>

          <div className="flex items-center gap-1">
            <Button
              variant={activeLayer === "emissions" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveLayer("emissions")}
              className={
                activeLayer === "emissions"
                  ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                  : ""
              }
            >
              <Zap className="h-3 w-3 mr-1" />
              Emissions
            </Button>
            <Button
              variant={activeLayer === "aqi" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveLayer("aqi")}
              className={
                activeLayer === "aqi"
                  ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                  : ""
              }
            >
              <Wind className="h-3 w-3 mr-1" />
              AQI
            </Button>
            <Button
              variant={activeLayer === "routes" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveLayer("routes")}
              className={
                activeLayer === "routes"
                  ? "bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                  : ""
              }
            >
              <Route className="h-3 w-3 mr-1" />
              Routes
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs">Heatmap</span>
            <Switch
              checked={showHeatmap}
              onCheckedChange={setShowHeatmap}
              size="sm"
            />
          </div>

          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mock Map Interface */}
      <div className="relative h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border">
        {/* Map background pattern */}
        <div ref={mapRef} className="w-full h-full" />
        <div className=" absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="h-full w-full">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Title */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 b">
          <div className="font-medium text-sm">
            Dhanbad city - Coal Transport Corridor
          </div>
          <div className="text-xs text-muted-foreground">
            Gosaidi Coal Block to Hirapur
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 min-w-48">
          <div className="font-medium text-sm mb-2">Legend</div>
          {activeLayer === "emissions" && (
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full"></div>
                <span>High Emissions (&gt;80 kg CO₂)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                <span>Medium Emissions (40-80 kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#15803D] rounded-full"></div>
                <span>Low Emissions (&lt;40 kg)</span>
              </div>
            </div>
          )}
          {activeLayer === "aqi" && (
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#15803D] rounded-full"></div>
                <span>Good (0-50)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                <span>Moderate (51-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full"></div>
                <span>Poor (&gt;100)</span>
              </div>
            </div>
          )}
          {activeLayer === "routes" && (
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#15803D]"></div>
                <span>Optimized Route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#F59E0B]"></div>
                <span>Alternative Route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#DC2626] border-dashed border"></div>
                <span>High Emission Route</span>
              </div>
            </div>
          )}
        </div>

        {/* Data Points Overlay */}
        <div className="absolute inset-0">
          {activeLayer === "emissions" &&
            emissionHotspots.map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${20 + point.id * 15}%`,
                  top: `${25 + point.id * 12}%`,
                }}
              >
                <div
                  className={`w-4 h-4 ${getIntensityColor(
                    point.intensity
                  )} rounded-full animate-pulse`}
                >
                  {showHeatmap && (
                    <div
                      className={`absolute inset-0 ${getIntensityColor(
                        point.intensity
                      )} rounded-full opacity-30 scale-150`}
                    ></div>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-white border rounded-lg p-2 shadow-lg whitespace-nowrap text-xs">
                    <div className="font-medium">{point.type}</div>
                    <div>CO₂: {point.value} kg</div>
                  </div>
                </div>
              </div>
            ))}

          {activeLayer === "aqi" &&
            aqiStations.map((station) => (
              <div
                key={station.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${15 + station.id * 20}%`,
                  top: `${30 + station.id * 15}%`,
                }}
              >
                <div
                  className={`w-6 h-6 ${getAQIColor(
                    station.aqi
                  )} rounded-lg flex items-center justify-center text-white text-xs font-bold`}
                >
                  {station.aqi}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-white border rounded-lg p-2 shadow-lg whitespace-nowrap text-xs">
                    <div className="font-medium">{station.name}</div>
                    <div>
                      AQI: {station.aqi} ({station.status})
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {activeLayer === "routes" && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Route A - Optimized */}
              <path
                d="M50 100 Q200 150 350 80"
                stroke="#15803D"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
              />
              {/* Route B - Alternative */}
              <path
                d="M50 100 Q180 200 350 80"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              {/* Route C - High Emission */}
              <path
                d="M50 100 Q220 250 350 80"
                stroke="#DC2626"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
              />
            </svg>
          )}
        </div>

        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded px-2 py-1 text-xs font-mono">
          23.810795°N, 86.435896°E
        </div>
      </div>

      {/* Data Summary */}
      {activeLayer === "routes" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {routes.map((route) => (
            <div key={route.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-sm mb-2">{route.name}</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span>{route.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      route.efficiency === "High"
                        ? "text-[#15803D]"
                        : route.efficiency === "Medium"
                        ? "text-[#F59E0B]"
                        : "text-[#DC2626]"
                    }`}
                  >
                    {route.efficiency}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
