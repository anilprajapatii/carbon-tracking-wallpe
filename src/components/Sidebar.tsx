import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  BarChart3, 
  Map, 
  Wind, 
  IndianRupee, 
  Route, 
  FileText, 
  Settings, 
  Menu,
  Activity,
  MapPin,
  Leaf,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import type { UserRole } from '../App';

interface SidebarProps {
  currentRole: UserRole;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentRole, isOpen, onToggle }: SidebarProps) {
  const getMenuItems = () => {
    const baseItems = [
      { icon: BarChart3, label: 'Overview', id: 'overview' },
      { icon: Activity, label: 'Emission Tracking', id: 'emissions' },
      { icon: Map, label: 'GIS Visualization', id: 'gis' },
    ];

    switch (currentRole) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Wind, label: 'AQI Monitoring', id: 'aqi' },
          { icon: IndianRupee, label: 'Carbon Credits', id: 'credits' },
          { icon: Route, label: 'Route Analytics', id: 'routes' },
          { icon: FileText, label: 'ESG Reports', id: 'reports' },
          { icon: Settings, label: 'System Health', id: 'system' },
        ];
      case 'community':
        return [
          { icon: Wind, label: 'Air Quality', id: 'aqi' },
          { icon: AlertTriangle, label: 'Alerts', id: 'alerts' },
          { icon: Leaf, label: 'Environment', id: 'environment' },
          { icon: FileText, label: 'Reports', id: 'reports' },
        ];
      case 'operator':
        return [
          ...baseItems,
          { icon: Route, label: 'My Routes', id: 'routes' },
          { icon: TrendingUp, label: 'Efficiency', id: 'efficiency' },
          { icon: MapPin, label: 'Trip History', id: 'trips' },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-border transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="h-16 w-16 rounded-lg flex items-center justify-center">
                <img src="/logo.jpg" alt="" />
              </div>
              <div>
                <div className="font-semibold text-sm">Carbon Tracking Dashboard</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 ${!isOpen ? 'px-2' : 'px-3'}`}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-3 truncate">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <>
          <Separator className="mt-4" />
          <div className="p-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-[#15803D]" />
                <span className="text-sm">System Status</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Sensors Online:</span>
                  <span className="text-[#15803D]">47/50</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Sync:</span>
                  <span className="text-[#15803D]">Active</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}