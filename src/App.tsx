import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { CommunityDashboard } from './components/CommunityDashboard';
import { OperatorDashboard } from './components/OperatorDashboard';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { User, Shield, Users, Truck } from 'lucide-react';

export type UserRole = 'admin' | 'community' | 'operator';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderDashboard = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'community':
        return <CommunityDashboard />;
      case 'operator':
        return <OperatorDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'community':
        return <Users className="h-4 w-4" />;
      case 'operator':
        return <Truck className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'community':
        return 'Community Dashboard';
      case 'operator':
        return 'Operator Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        currentRole={currentRole} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <header className="bg-white border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-[#1E3A8A]">
              Carbon Tracking Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={currentRole} onValueChange={(value: UserRole) => setCurrentRole(value)}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  {getRoleIcon(currentRole)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin View
                  </div>
                </SelectItem>
                <SelectItem value="community">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Community View
                  </div>
                </SelectItem>
                <SelectItem value="operator">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Operator View
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}