import React from 'react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Wind, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

const aqiData = [
  {
    location: 'School Area - Primary',
    aqi: 45,
    pm25: 18,
    pm10: 32,
    status: 'Good',
    color: '#15803D',
    trend: 'stable'
  },
  {
    location: 'Village Center',
    aqi: 78,
    pm25: 35,
    pm10: 58,
    status: 'Moderate', 
    color: '#F59E0B',
    trend: 'increasing'
  },
  {
    location: 'Coal Transport Route',
    aqi: 95,
    pm25: 48,
    pm10: 87,
    status: 'Poor',
    color: '#DC2626',
    trend: 'decreasing'
  },
  {
    location: 'Panchayat Office',
    aqi: 62,
    pm25: 28,
    pm10: 41,
    status: 'Moderate',
    color: '#F59E0B', 
    trend: 'stable'
  }
];

export function AQIMonitor() {
  const getAQIMessage = (aqi: number) => {
    if (aqi <= 50) return { message: 'Air quality is good. Normal activities recommended.', icon: CheckCircle, color: 'text-[#15803D]' };
    if (aqi <= 100) return { message: 'Moderate air quality. Sensitive individuals should limit outdoor exposure.', icon: AlertTriangle, color: 'text-[#F59E0B]' };
    return { message: 'Poor air quality. Limit outdoor activities and use masks.', icon: AlertTriangle, color: 'text-[#DC2626]' };
  };

  const averageAQI = Math.round(aqiData.reduce((sum, item) => sum + item.aqi, 0) / aqiData.length);
  const alertInfo = getAQIMessage(averageAQI);

  return (
    <div className="space-y-4">
      {/* Overall Status Alert */}
      <Alert>
        <alertInfo.icon className={`h-4 w-4 ${alertInfo.color}`} />
        <AlertDescription>
          <strong>Average AQI: {averageAQI}</strong> - {alertInfo.message}
        </AlertDescription>
      </Alert>

      {/* AQI Monitoring Stations */}
      <div className="space-y-3">
        {aqiData.map((station, index) => (
          <div key={index} className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{station.location}</span>
              </div>
              <Badge 
                variant="outline"
                style={{ 
                  backgroundColor: `${station.color}10`,
                  borderColor: `${station.color}50`,
                  color: station.color
                }}
              >
                {station.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: station.color }}>
                  {station.aqi}
                </div>
                <div className="text-xs text-muted-foreground">AQI</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{station.pm25}</div>
                <div className="text-xs text-muted-foreground">PM2.5</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{station.pm10}</div>
                <div className="text-xs text-muted-foreground">PM10</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Air Quality Level</span>
                <span>{station.aqi}/500</span>
              </div>
              <Progress 
                value={(station.aqi / 500) * 100} 
                className="h-2"
                style={{
                  '--progress-foreground': station.color
                } as React.CSSProperties}
              />
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Last updated: 2 min ago</span>
              <span className={`flex items-center gap-1 ${
                station.trend === 'increasing' ? 'text-[#DC2626]' : 
                station.trend === 'decreasing' ? 'text-[#15803D]' : 
                'text-muted-foreground'
              }`}>
                <Wind className="h-3 w-3" />
                {station.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Trend Summary */}
      <div className="p-3 bg-[#1E3A8A]/5 rounded-lg border border-[#1E3A8A]/20">
        <div className="font-medium text-sm mb-2 text-[#1E3A8A]">24-Hour Trend</div>
        <div className="text-xs text-muted-foreground mb-2">
          AQI has improved by 12% compared to yesterday average
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium">6 AM</div>
            <div className="text-muted-foreground">89</div>
          </div>
          <div className="text-center">
            <div className="font-medium">12 PM</div>
            <div className="text-muted-foreground">76</div>
          </div>
          <div className="text-center">
            <div className="font-medium">6 PM</div>
            <div className="text-muted-foreground">82</div>
          </div>
          <div className="text-center">
            <div className="font-medium">Now</div>
            <div className="font-medium text-[#15803D]">{averageAQI}</div>
          </div>
        </div>
      </div>
    </div>
  );
}