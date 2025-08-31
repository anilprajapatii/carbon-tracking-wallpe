import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { 
  Wind, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  MapPin, 
  Calendar,
  Users,
  Leaf,
  Languages
} from 'lucide-react';

export function CommunityDashboard() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const text = {
    en: {
      title: 'Community Air Quality Dashboard',
      subtitle: 'Real-time environmental monitoring for your area',
      currentAQI: 'Current Air Quality',
      alerts: 'Health Alerts',
      locations: 'Monitored Locations',
      education: 'Educational Resources',
      safeLevel: 'Safe Level',
      moderateLevel: 'Moderate Level',
      poorLevel: 'Poor Level',
      stayIndoors: 'Consider staying indoors during peak hours',
      normalActivity: 'Normal outdoor activities are safe',
      checkUpdates: 'Check for regular updates',
      schoolArea: 'School Area',
      village: 'Village Center',
      coalBlock: 'Near Coal Block'
    },
    hi: {
      title: 'सामुदायिक वायु गुणवत्ता डैशबोर्ड',
      subtitle: 'आपके क्षेत्र की वास्तविक समय पर्यावरण निगरानी',
      currentAQI: 'वर्तमान वायु गुणवत्ता',
      alerts: 'स्वास्थ्य चेतावनी',
      locations: 'निगरानी स्थान',
      education: 'शैक्षिक संसाधन',
      safeLevel: 'सुरक्षित स्तर',
      moderateLevel: 'मध्यम स्तर',
      poorLevel: 'खराब स्तर',
      stayIndoors: 'व्यस्त समय में घर के अंदर रहने पर विचार करें',
      normalActivity: 'सामान्य बाहरी गतिविधियां सुरक्षित हैं',
      checkUpdates: 'नियमित अपडेट के लिए जांच करें',
      schoolArea: 'स्कूल क्षेत्र',
      village: 'गांव केंद्र',
      coalBlock: 'कोयला ब्लॉक के पास'
    }
  };

  const currentText = text[language];

  const aqiData = [
    {
      location: currentText.schoolArea,
      aqi: 45,
      status: 'Good',
      color: 'bg-[#15803D]',
      textColor: 'text-[#15803D]'
    },
    {
      location: currentText.village,
      aqi: 78,
      status: 'Moderate',
      color: 'bg-[#F59E0B]',
      textColor: 'text-[#F59E0B]'
    },
    {
      location: currentText.coalBlock,
      aqi: 95,
      status: 'Poor',
      color: 'bg-[#DC2626]',
      textColor: 'text-[#DC2626]'
    }
  ];

  const alerts = [
    {
      type: 'info',
      message: language === 'en' 
        ? 'Air quality is good today. Normal activities recommended.'
        : 'आज हवा की गुणवत्ता अच्छी है। सामान्य गतिविधियों की सिफारिश की जाती है।',
      icon: CheckCircle,
      color: 'text-[#15803D]'
    },
    {
      type: 'warning',
      message: language === 'en'
        ? 'Moderate AQI near coal transport route. Sensitive individuals should limit outdoor exposure.'
        : 'कोयला परिवहन मार्ग के पास मध्यम AQI। संवेदनशील व्यक्तियों को बाहरी एक्सपोजर सीमित करना चाहिए।',
      icon: AlertTriangle,
      color: 'text-[#F59E0B]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Language Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">{currentText.title}</h1>
          <p className="text-muted-foreground mt-2">{currentText.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span className="text-sm">EN</span>
          <Switch 
            checked={language === 'hi'} 
            onCheckedChange={(checked) => setLanguage(checked ? 'hi' : 'en')}
          />
          <span className="text-sm">हिं</span>
        </div>
      </div>

      {/* Current AQI Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-[#1E3A8A]" />
            {currentText.currentAQI}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aqiData.map((location, index) => (
              <div key={index} className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-16 h-16 ${location.color} rounded-full flex items-center justify-center text-white`}>
                    <span className="text-2xl font-bold">{location.aqi}</span>
                  </div>
                </div>
                <div className="font-medium">{location.location}</div>
                <Badge variant="outline" className={`mt-2 ${location.textColor} border-current`}>
                  {location.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
            {currentText.alerts}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => (
            <Alert key={index}>
              <alert.icon className={`h-4 w-4 ${alert.color}`} />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Educational Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#15803D]" />
              {currentText.education}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#15803D]/10 rounded-lg">
              <h4 className="font-medium text-[#15803D] mb-2">
                {language === 'en' ? 'Understanding AQI' : 'AQI को समझना'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Air Quality Index (AQI) measures how clean or polluted the air is in your area.'
                  : 'वायु गुणवत्ता सूचकांक (AQI) मापता है कि आपके क्षेत्र में हवा कितनी साफ या प्रदूषित है।'}
              </p>
            </div>
            
            <div className="p-4 bg-[#1E3A8A]/10 rounded-lg">
              <h4 className="font-medium text-[#1E3A8A] mb-2">
                {language === 'en' ? 'Health Tips' : 'स्वास्थ्य सुझाव'}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {language === 'en' ? 'Stay hydrated' : 'हाइड्रेटेड रहें'}</li>
                <li>• {language === 'en' ? 'Use masks during high AQI' : 'उच्च AQI के दौरान मास्क का उपयोग करें'}</li>
                <li>• {language === 'en' ? 'Keep windows closed' : 'खिड़कियां बंद रखें'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#1E3A8A]" />
              {language === 'en' ? 'Community Engagement' : 'सामुदायिक सहभागिता'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">
                  {language === 'en' ? 'Weekly Meeting' : 'साप्ताहिक बैठक'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Sundays, 10 AM' : 'रविवार, सुबह 10 बजे'}
                </div>
              </div>
              <Calendar className="h-5 w-5 text-[#1E3A8A]" />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">
                  {language === 'en' ? 'SHG Training' : 'SHG प्रशिक्षण'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? '50+ women enrolled' : '50+ महिलाएं नामांकित'}
                </div>
              </div>
              <Badge variant="secondary">{language === 'en' ? 'Active' : 'सक्रिय'}</Badge>
            </div>

            <Button className="w-full bg-[#15803D] hover:bg-[#15803D]/90">
              {language === 'en' ? 'Join Community Group' : 'सामुदायिक समूह में शामिल हों'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}