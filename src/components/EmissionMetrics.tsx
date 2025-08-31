import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingDown, TrendingUp, Activity } from 'lucide-react';

const emissionData = [
  { time: '08:00', co2: 45, fuel: 12.2, rpm: 1200, load: 22 },
  { time: '09:00', co2: 52, fuel: 14.1, rpm: 1350, load: 25 },
  { time: '10:00', co2: 38, fuel: 10.8, rpm: 1100, load: 20 },
  { time: '11:00', co2: 61, fuel: 16.3, rpm: 1450, load: 28 },
  { time: '12:00', co2: 43, fuel: 11.9, rpm: 1180, load: 23 },
  { time: '13:00', co2: 56, fuel: 15.2, rpm: 1380, load: 26 },
  { time: '14:00', co2: 41, fuel: 11.3, rpm: 1150, load: 21 }
];

const truckData = [
  { id: 'JH-01-1234', trips: 8, type: 'Dumper', co2: 342, weight: 10, fuel: 127.5, efficiency: 3.2, status: 'Active' },
  { id: 'JH-01-1235', trips: 6, type: 'Dozer', co2: 289, weight: 25, fuel: 108.2, efficiency: 3.5, status: 'Active' },
  { id: 'JH-01-1236', trips: 7, type: 'Driller', co2: 315, weight: 35, fuel: 118.9, efficiency: 3.1, status: 'Maintenance' },
  { id: 'JH-01-1237', trips: 9, type: 'Grader', co2: 376, weight: 50, fuel: 139.8, efficiency: 2.9, status: 'Active' },
  { id: 'JH-01-1238', trips: 5, type: 'LMV', co2: 267, weight: "50+", fuel: 99.1, efficiency: 3.6, status: 'Active' }
];

export function EmissionMetrics() {
  return (
    <div className="space-y-6">
      {/* Real-time Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Real-time CO₂ Emissions</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#15803D]/10 text-[#15803D]">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Button variant="outline" size="sm">Export Data</Button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={emissionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
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
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-medium">{`Time: ${label}`}</p>
                      <p className="text-[#1E3A8A]">{`CO₂: ${payload[0]?.value} kg`}</p>
                      <p className="text-[#15803D]">{`Fuel: ${payload[0]?.payload?.fuel} L`}</p>
                      <p className="text-muted-foreground">{`Load: ${payload[0]?.payload?.load} tonnes`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="co2" 
              stroke="#1E3A8A" 
              strokeWidth={2}
              dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Per-truck Analytics */}
      <div>
        <h3 className="font-medium mb-4">Vehicle Performance Today</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Vehicle ID</th>
                <th className="text-left p-2">Trips</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">CO₂ (kg)</th>
                <th className="text-left p-2">Weight (ton)</th>
                <th className="text-left p-2">Fuel (L)</th>
                <th className="text-left p-2">Efficiency</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {truckData.map((truck, index) => (
                <tr key={truck.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{truck.id}</td>
                  <td className="p-2">{truck.trips}</td>
                  <td className="p-2">{truck.type}</td>
                  <td className="p-2">{truck.co2}</td>
                  <td className="p-2">{truck.weight}</td>
                  <td className="p-2">{truck.fuel}</td>
                  <td className="p-2">
                    <span className={truck.efficiency >= 3.4 ? 'text-[#15803D]' : 'text-[#F59E0B]'}>
                      {truck.efficiency} km/L
                    </span>
                  </td>
                  <td className="p-2">
                    <Badge 
                      variant="outline"
                      className={
                        truck.status === 'Active' 
                          ? 'bg-[#15803D]/10 text-[#15803D] border-[#15803D]/30'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                      }
                    >
                      {truck.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    {index % 2 === 0 ? (
                      <TrendingDown className="h-4 w-4 text-[#15803D]" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-[#F59E0B]" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Model Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-[#1E3A8A]">±4.2%</div>
          <div className="text-sm text-muted-foreground">AI Model Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-[#15803D]">-12.3%</div>
          <div className="text-sm text-muted-foreground">Emission Reduction</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-[#F59E0B]">10,247</div>
          <div className="text-sm text-muted-foreground">Trip Records Processed</div>
        </div>
      </div>
    </div>
  );
}