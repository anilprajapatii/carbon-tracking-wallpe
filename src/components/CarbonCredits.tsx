import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { DollarSign, TrendingUp, Award, FileText, Leaf } from 'lucide-react';

export function CarbonCredits() {
  const creditData = {
    totalCredits: 142.5,
    monthlyEarned: 24.3,
    potentialRevenue: 24560,
    verifiedCredits: 118.2,
    pendingVerification: 24.3,
    marketPrice: 172.50
  };

  const transactions = [
    {
      date: '2024-12-15',
      credits: 8.5,
      revenue: 1466.25,
      status: 'Verified',
      buyer: 'Green Corp Ltd.'
    },
    {
      date: '2024-12-10', 
      credits: 12.3,
      revenue: 2121.75,
      status: 'Verified',
      buyer: 'EcoTech Industries'
    },
    {
      date: '2024-12-05',
      credits: 6.8,
      revenue: 1173.00,
      status: 'Pending',
      buyer: 'Sustainable Solutions'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Credit Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#15803D]/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-4 w-4 text-[#15803D]" />
            <span className="text-sm font-medium">Total Credits</span>
          </div>
          <div className="text-xl font-bold text-[#15803D]">{creditData.totalCredits}</div>
          <div className="text-xs text-muted-foreground">tCO₂e</div>
        </div>

        <div className="p-3 bg-[#1E3A8A]/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            ₹
            <span className="text-sm font-medium">Revenue</span>
          </div>
          <div className="text-xl font-bold text-[#1E3A8A]">₹{creditData.potentialRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">This month</div>
        </div>
      </div>

      {/* Verification Progress */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Verification Progress</span>
          <Badge variant="outline" className="text-[#F59E0B] border-[#F59E0B]/30">
            {Math.round((creditData.verifiedCredits / creditData.totalCredits) * 100)}% Complete
          </Badge>
        </div>
        <Progress 
          value={(creditData.verifiedCredits / creditData.totalCredits) * 100} 
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Verified: {creditData.verifiedCredits} tCO₂e</span>
          <span>Pending: {creditData.pendingVerification} tCO₂e</span>
        </div>
      </div>

      {/* Market Information */}
      <div className="p-3 bg-[#F59E0B]/10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-sm font-medium">Market Price</span>
          </div>
          <Badge variant="secondary">Verra Standard</Badge>
        </div>
        <div className="text-lg font-semibold">₹{creditData.marketPrice}/tCO₂e</div>
        <div className="text-xs text-muted-foreground">+5.2% from last week</div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-sm">Recent Transactions</span>
          <Button variant="outline" size="sm">
            <FileText className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
        
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">{transaction.buyer}</div>
                <Badge 
                  variant="outline"
                  className={transaction.status === 'Verified' 
                    ? 'bg-[#15803D]/10 text-[#15803D] border-[#15803D]/30'
                    : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Credits</div>
                  <div className="font-medium">{transaction.credits} tCO₂e</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Revenue</div>
                  <div className="font-medium">₹{transaction.revenue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Date</div>
                  <div className="font-medium">{transaction.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full">
          <Award className="h-4 w-4 mr-2" />
          Submit for Verification
        </Button>
        <Button className="w-full bg-[#15803D] hover:bg-[#15803D]/90">
          <DollarSign className="h-4 w-4 mr-2" />
          List on Marketplace
        </Button>
      </div>
    </div>
  );
}