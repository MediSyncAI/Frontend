"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {Appointment, HealthMetrics, Status, Trend, RecentTest, Prescription} from "../types/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  Heart, 
  Activity, 
  Calendar, 
  FileText, 
  Bell,
  Settings,
  Download,
  Plus,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import Header from '../Header';

export default function Page() {
  const [userProfile] = useState({
    name: 'John Smith',
    age: 42,
    bloodType: 'O+',
    allergies: ['Peanuts', 'Shellfish'],
    emergencyContact: '+1 (555) 123-4567',
    lastVisit: '2024-12-15'
  });

const [healthMetrics] = useState<HealthMetrics>({
  heartRate: { value: 72, status: "normal", trend: "stable" },
  bloodPressure: { systolic: 120, diastolic: 80, status: "normal", trend: "improved" },
  weight: { value: 170, unit: "lbs", status: "normal", trend: "stable" },
  temperature: { value: 98.6, unit: "°F", status: "normal", trend: "stable" },
});

const [appointments] = useState<Appointment[]>([
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2025-01-18",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "2025-01-22",
    time: "2:00 PM",
    type: "Annual Checkup",
    status: "pending",
  },
]);

const [prescriptions] = useState<Prescription[]>([
  {
    id: 1,
    medication: "Lisinopril 10mg",
    dosage: "Once daily",
    prescribed: "Dr. Sarah Johnson",
    startDate: "2024-12-01",
    endDate: "2025-02-01",
    status: "active",
  },
  { 
    id: 2,
    medication: "Metformin 500mg",
    dosage: "Twice daily",
    prescribed: "Dr. Michael Chen",
    startDate: "2024-11-15",
    endDate: "2025-01-15",
    status: "expiring",
  },
]);

const [recentTests] = useState<RecentTest[]>([
  {
    id: 1,
    test: "Blood Panel",
    date: "2024-12-10",
    status: "completed",
    result: "Normal",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    test: "ECG",
    date: "2024-12-05",
    status: "completed",
    result: "Normal",
    doctor: "Dr. Sarah Johnson",
  },
]);



const getStatusColor = (status: Status): string => {
  const colors: Record<Status, string> = {
    normal: 'text-green-600 bg-green-100',
    active: 'text-green-600 bg-green-100',
    confirmed: 'text-blue-600 bg-blue-100',
    pending: 'text-yellow-600 bg-yellow-100',
    expiring: 'text-orange-600 bg-orange-100',
    completed: 'text-green-600 bg-green-100',
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};

const getTrendIcon = (trend: Trend) => {
  switch (trend) {
    case 'improved':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'stable':
      return <Activity className="h-4 w-4 text-blue-600" />;
    case 'declined':
    default:
      return <AlertCircle className="h-4 w-4 text-orange-600" />;
  }
};


  return (
    <>
    <Header/>
    
    
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl text-gray-900 mb-2">Health Dashboard</h1>
            <p className="text-xl text-gray-600">Welcome back, {userProfile.name}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-2xl text-gray-900">{healthMetrics.heartRate.value} <span className="text-sm">BPM</span></p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(healthMetrics.heartRate.trend)}
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <Badge className={`mt-2 ${getStatusColor(healthMetrics.heartRate.status)}`}>
                {healthMetrics.heartRate.status}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-2xl text-gray-900">
                    {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(healthMetrics.bloodPressure.trend)}
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <Badge className={`mt-2 ${getStatusColor(healthMetrics.bloodPressure.status)}`}>
                {healthMetrics.bloodPressure.status}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-2xl text-gray-900">{healthMetrics.weight.value} <span className="text-sm">{healthMetrics.weight.unit}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(healthMetrics.weight.trend)}
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <Badge className={`mt-2 ${getStatusColor(healthMetrics.weight.status)}`}>
                {healthMetrics.weight.status}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-2xl text-gray-900">{healthMetrics.temperature.value}<span className="text-sm">{healthMetrics.temperature.unit}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(healthMetrics.temperature.trend)}
                  <Activity className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <Badge className={`mt-2 ${getStatusColor(healthMetrics.temperature.status)}`}>
                {healthMetrics.temperature.status}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Appointments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg text-gray-900">Upcoming Appointments</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appointments.slice(0, 2).map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{appointment.doctor}</p>
                          <p className="text-xs text-gray-600">{appointment.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Prescriptions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg text-gray-900">Active Prescriptions</h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prescriptions.filter(p => p.status === 'active' || p.status === 'expiring').map(prescription => (
                    <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        {/* <p className="text-sm text-gray-900">{prescription.medication}</p> */}
                        <p className="text-xs text-gray-600">{prescription.dosage}</p>
                      </div>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Health Progress */}
            <Card>
              <CardHeader>
                <h3 className="text-lg text-gray-900">Health Progress This Month</h3>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Exercise Goal</span>
                      <span className="text-gray-900">12/15 days</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Medication Compliance</span>
                      <span className="text-gray-900">28/30 days</span>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg text-gray-900">All Appointments</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-900">{appointment.doctor}</h4>
                          <p className="text-xs text-gray-600">{appointment.specialty}</p>
                          <p className="text-xs text-gray-500">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-600">{appointment.time}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg text-gray-900">All Prescriptions</h3>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map(prescription => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="text-sm text-gray-900">{prescription.medication}</h4>
                        <p className="text-xs text-gray-600">Dosage: {prescription.dosage}</p>
                        <p className="text-xs text-gray-600">Prescribed by: {prescription.prescribed}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(prescription.startDate).toLocaleDateString()} - {new Date(prescription.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg text-gray-900">Test Results</h3>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Test
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map(test => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-900">{test.test}</h4>
                          <p className="text-xs text-gray-600">Ordered by: {test.doctor}</p>
                          <p className="text-xs text-gray-500">{new Date(test.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                        <p className="text-xs text-gray-600">Result: {test.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg text-gray-900">Personal Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">{userProfile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="text-gray-900">{userProfile.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Type:</span>
                      <span className="text-gray-900">{userProfile.bloodType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Contact:</span>
                      <span className="text-gray-900">{userProfile.emergencyContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Visit:</span>
                      <span className="text-gray-900">{new Date(userProfile.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg text-gray-900">Medical Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">Known Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm text-gray-700 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Download Medical Records
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Share with Doctor
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Update Emergency Contacts
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}