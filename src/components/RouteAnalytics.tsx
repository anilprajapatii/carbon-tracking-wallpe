import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Route, TrendingUp, TrendingDown, Clock, Fuel } from 'lucide-react';

const routeEfficiencyData = [
  { route: 'Route A', trips: 45, efficiency: 85, fuelSaved: 12.3, co2Reduced: 32.8 },
  { route: 'Route B', trips: 38, efficiency: 78, fuelSaved: 9.8, co2Reduced: 26.1 },
  { route: 'Route C', trips: 29, efficiency: 72, fuelSaved: 7.2, co2Reduced: 19.2 },
  { route: 'Route D', trips: 22, efficiency: 68, fuelSaved: 5.5, co2Reduced: 14.7 }
];

const fuelEfficiencyTrend = [
  { month: 'Aug', efficiency: 3.2, target: 3.5 },
  { month: 'Sep', efficiency: 3.4, target: 3.5 },
  { month: 'Oct', efficiency: 3.6, target: 3.5 },
  { month: 'Nov', efficiency: 3.7, target: 3.5 },
  { month: 'Dec', efficiency: 3.8, target: 3.5 }
];

const tripDistribution = [
  { name: 'Coal Loading', value: 40, color: '#1E3A8A' },
  { name: 'Transportation', value: 25, color: '#15803D' },
  { name: 'Unloading', value: 20, color: '#F59E0B' },
  { name: 'Idling', value: 15, color: '#15803D' },
];

export function RouteAnalytics() {
  const totalTrips = routeEfficiencyData.reduce((sum, route) => sum + route.trips, 0);
  const avgEfficiency = Math.round(routeEfficiencyData.reduce((sum, route) => sum + route.efficiency, 0) / routeEfficiencyData.length);
  const totalFuelSaved = routeEfficiencyData.reduce((sum, route) => sum + route.fuelSaved, 0);

  return (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-[#1E3A8A]/10 rounded-lg text-center">
          <div className="text-lg font-bold text-[#1E3A8A]">{totalTrips}</div>
          <div className="text-xs text-muted-foreground">Total Trips</div>
        </div>
        <div className="p-3 bg-[#15803D]/10 rounded-lg text-center">
          <div className="text-lg font-bold text-[#15803D]">{avgEfficiency}%</div>
          <div className="text-xs text-muted-foreground">Avg Efficiency</div>
        </div>
        <div className="p-3 bg-[#F59E0B]/10 rounded-lg text-center">
          <div className="text-lg font-bold text-[#F59E0B]">{totalFuelSaved.toFixed(1)}L</div>
          <div className="text-xs text-muted-foreground">Fuel Saved</div>
        </div>
      </div>

      {/* Route Efficiency Chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-sm">Route Performance</span>
          <Badge variant="outline" className="text-[#15803D] border-[#15803D]/30">
            +15% Improvement
          </Badge>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={routeEfficiencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="route" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-medium">{label}</p>
                      <p className="text-[#1E3A8A]">Trips: {data.trips}</p>
                      <p className="text-[#15803D]">Efficiency: {data.efficiency}%</p>
                      <p className="text-[#F59E0B]">Fuel Saved: {data.fuelSaved}L</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="efficiency" fill="#1E3A8A" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Route Recommendations */}
      <div>
        <div className="font-medium text-sm mb-3">Optimization Recommendations</div>
        <div className="space-y-2">
          <div className="p-3 bg-[#15803D]/10 rounded-lg border border-[#15803D]/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-[#15803D]" />
              <span className="font-medium text-sm">Route A - High Performance</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Highest efficiency with 85% fuel optimization. Recommend increasing allocation.
            </p>
          </div>
          
          <div className="p-3 bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-[#F59E0B]" />
              <span className="font-medium text-sm">Route D - Needs Improvement</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Below target efficiency. Consider route modifications or reduced usage.
            </p>
          </div>
        </div>
      </div>

      {/* Trip Time Distribution */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-medium text-sm mb-3">Trip Time Analysis</div>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={tripDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={2}
              >
                {tripDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="font-medium text-sm">Breakdown</div>
          {tripDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
          
          <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3" />
              <span className="font-medium">Avg Trip Time</span>
            </div>
            <div>Total: 2h 15m</div>
            <div className="text-muted-foreground">15% faster than target</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full">
          <Route className="h-4 w-4 mr-2" />
          Optimize Routes
        </Button>
        <Button className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
          <Fuel className="h-4 w-4 mr-2" />
          View Fuel Report
        </Button>
      </div>
    </div>
  );
}