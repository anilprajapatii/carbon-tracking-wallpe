import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Truck, 
  Route, 
  Fuel, 
  TrendingDown, 
  MapPin, 
  Clock,
  DollarSign,
  Award,
  Navigation,
  Activity
} from 'lucide-react';

export function OperatorDashboard() {
  const tripData = {
    currentTrip: {
      id: 'TR-2024-1205',
      route: 'Amrapali Coal Block → Latehar',
      distance: '45.2 km',
      fuelUsed: '12.3 L',
      co2Emission: '32.8 kg',
      startTime: '08:30 AM',
      estimatedArrival: '10:15 AM',
      load: '25 tonnes',
      status: 'In Transit'
    },
    todayStats: {
      tripsCompleted: 3,
      totalDistance: '126.7 km',
      totalFuel: '34.2 L',
      totalCO2: '91.3 kg',
      fuelEfficiency: '3.7 km/L',
      savings: '₹240'
    }
  };

  const routeSuggestions = [
    {
      route: 'Route A (Current)',
      distance: '45.2 km',
      fuel: '12.3 L',
      co2: '32.8 kg',
      time: '1h 45m',
      recommended: false
    },
    {
      route: 'Route B (Optimized)',
      distance: '42.8 km',
      fuel: '11.1 L',
      co2: '29.6 kg',
      time: '1h 50m',
      recommended: true,
      savings: '10% less CO₂'
    }
  ];

  const achievements = [
    {
      title: 'Fuel Saver',
      description: 'Achieved 10% fuel efficiency improvement',
      icon: Fuel,
      color: 'text-[#15803D]',
      earned: true
    },
    {
      title: 'Low Emission Champion',
      description: 'Reduced CO₂ emissions by 15% this month',
      icon: Truck,
      color: 'text-[#1E3A8A]',
      earned: true
    },
    {
      title: 'Route Master',
      description: 'Completed 100 optimized routes',
      icon: Route,
      color: 'text-[#F59E0B]',
      earned: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Trip Status */}
      <Card className="border-[#1E3A8A]/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#1E3A8A]" />
              Current Trip
            </CardTitle>
            <Badge variant="outline" className="bg-[#15803D]/10 text-[#15803D] border-[#15803D]/30">
              {tripData.currentTrip.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                Route
              </div>
              <div className="font-medium">{tripData.currentTrip.route}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Navigation className="h-4 w-4 mr-1" />
                Distance & Load
              </div>
              <div className="font-medium">{tripData.currentTrip.distance}</div>
              <div className="text-sm text-muted-foreground">{tripData.currentTrip.load}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Fuel className="h-4 w-4 mr-1" />
                Fuel & CO₂
              </div>
              <div className="font-medium">{tripData.currentTrip.fuelUsed}</div>
              <div className="text-sm text-muted-foreground">{tripData.currentTrip.co2Emission}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Timing
              </div>
              <div className="font-medium">{tripData.currentTrip.startTime}</div>
              <div className="text-sm text-muted-foreground">ETA: {tripData.currentTrip.estimatedArrival}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Trip Progress</span>
              <span className="text-sm text-muted-foreground">67%</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trips Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#1E3A8A]">{tripData.todayStats.tripsCompleted}</div>
              <Truck className="h-5 w-5 text-[#1E3A8A]" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#15803D]">{tripData.todayStats.fuelEfficiency}</div>
              <Fuel className="h-5 w-5 text-[#15803D]" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">km/L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{tripData.todayStats.totalCO2}</div>
              <TrendingDown className="h-5 w-5 text-[#15803D]" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fuel Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#15803D]">{tripData.todayStats.savings}</div>
              <DollarSign className="h-5 w-5 text-[#15803D]" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-[#1E3A8A]" />
            Route Optimization Suggestions
          </CardTitle>
          <CardDescription>AI-powered route recommendations for your next trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routeSuggestions.map((route, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  route.recommended 
                    ? 'border-[#15803D] bg-[#15803D]/5' 
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{route.route}</div>
                  {route.recommended && (
                    <Badge className="bg-[#15803D] hover:bg-[#15803D]/90">
                      Recommended
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Distance</div>
                    <div className="font-medium">{route.distance}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Fuel</div>
                    <div className="font-medium">{route.fuel}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">CO₂</div>
                    <div className="font-medium">{route.co2}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Time</div>
                    <div className="font-medium">{route.time}</div>
                  </div>
                </div>
                
                {route.savings && (
                  <div className="mt-2 text-sm text-[#15803D] font-medium">
                    💡 {route.savings}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-4 bg-[#15803D] hover:bg-[#15803D]/90">
            Use Recommended Route
          </Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#F59E0B]" />
            Your Achievements
          </CardTitle>
          <CardDescription>Environmental impact milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-muted/30 border-border' 
                    : 'bg-muted/10 border-dashed opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                  <div className="font-medium">{achievement.title}</div>
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.earned && (
                  <Badge variant="secondary" className="mt-2">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}