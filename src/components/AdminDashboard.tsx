import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { EmissionMetrics } from './EmissionMetrics';
import { GISMapView } from './GISMapView';
import { AQIMonitor } from './AQIMonitor';
import { CarbonCredits } from './CarbonCredits';
import { RouteAnalytics } from './RouteAnalytics';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Truck, 
  MapPin, 
  Wind,
  IndianRupee,
  FileText,
  Download
} from 'lucide-react';

export function AdminDashboard() {
  const kpiData = [
    {
      title: 'Total CO₂ Emissions',
      value: '1,247 kg',
      change: '-8.2%',
      trend: 'down',
      icon: Activity,
      color: 'text-[#15803D]'
    },
    {
      title: 'Active Trucks',
      value: '42',
      change: '+2',
      trend: 'up',
      icon: Truck,
      color: 'text-[#1E3A8A]'
    },
    {
      title: 'Routes Optimized',
      value: '18',
      change: '+12%',
      trend: 'up',
      icon: MapPin,
      color: 'text-[#1E3A8A]'
    },
    {
      title: 'Average AQI',
      value: '87',
      change: '+5',
      trend: 'up',
      icon: Wind,
      color: 'text-[#F59E0B]'
    },
    {
      title: 'Carbon Credits',
      value: '₹24,560',
      change: '+15.3%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-[#15803D]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-[#15803D]" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-[#15803D]" />
                )}
                <span className={kpi.trend === 'down' ? 'text-[#15803D]' : 'text-[#F59E0B]'}>
                  {kpi.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emission Tracking */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Real-time Emission Tracking</CardTitle>
                <CardDescription>CO₂ emissions per truck trip with AI predictions</CardDescription>
              </div>
              <Badge variant="outline" className="bg-[#15803D]/10 text-[#15803D]">
                Live Data
              </Badge>
            </CardHeader>
            <CardContent>
              <EmissionMetrics />
            </CardContent>
          </Card>
        </div>

        {/* AQI Monitor */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>AQI Monitoring</CardTitle>
              <CardDescription>Air quality across monitored locations</CardDescription>
            </CardHeader>
            <CardContent>
              <AQIMonitor />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* GIS Map and Route Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GIS Visualization</CardTitle>
            <CardDescription>Emission heatmaps and route analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <GISMapView />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Analytics</CardTitle>
            <CardDescription>Logistics efficiency and optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <RouteAnalytics />
          </CardContent>
        </Card>
      </div>

      {/* Carbon Credits and ESG */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Credit Monetization</CardTitle>
            <CardDescription>Revenue potential and credit tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <CarbonCredits />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>ESG Reporting</CardTitle>
              <CardDescription>Automated compliance reports</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#1E3A8A]" />
                  <div>
                    <div className="font-medium">Monthly ESG Report</div>
                    <div className="text-sm text-muted-foreground">December 2024</div>
                  </div>
                </div>
                <Badge variant="secondary">Ready</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#1E3A8A]" />
                  <div>
                    <div className="font-medium">Carbon Credit Report</div>
                    <div className="text-sm text-muted-foreground">Q4 2024</div>
                  </div>
                </div>
                <Badge variant="secondary">Processing</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-[#15803D]/10 rounded-lg">
                  <div className="text-lg font-semibold text-[#15803D]">94%</div>
                  <div className="text-sm text-muted-foreground">Compliance Score</div>
                </div>
                <div className="text-center p-3 bg-[#1E3A8A]/10 rounded-lg">
                  <div className="text-lg font-semibold text-[#1E3A8A]">-18.2%</div>
                  <div className="text-sm text-muted-foreground">Emission Reduction</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}