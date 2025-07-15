'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Brain,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  User,
  School,
  Stethoscope,
  Scale,
  Target,
  Heart
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const mockData = {
    children: [
      {
        id: '1',
        name: 'Abdul',
        age: 8,
        ehcPlanProgress: 78,
        assessmentsComplete: 3,
        assessmentsTotal: 4,
        urgentActions: 1,
        nextAppointment: '2025-01-20',
        recentActivity: 'EHC Plan draft received'
      },
      {
        id: '2',
        name: 'Jibril',
        age: 6,
        ehcPlanProgress: 45,
        assessmentsComplete: 2,
        assessmentsTotal: 5,
        urgentActions: 2,
        nextAppointment: '2025-01-18',
        recentActivity: 'Autism assessment scheduled'
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'urgent',
        title: 'EHC Plan Review Due',
        message: 'Annual review for Abdul is due within 5 days',
        date: '2025-01-15',
        icon: AlertTriangle,
        color: 'text-red-600'
      },
      {
        id: '2',
        type: 'info',
        title: 'Assessment Report Ready',
        message: 'Speech therapy assessment for Jibril is available',
        date: '2025-01-14',
        icon: FileText,
        color: 'text-blue-600'
      },
      {
        id: '3',
        type: 'success',
        title: 'Professional Matched',
        message: 'New occupational therapist assigned to Abdul',
        date: '2025-01-13',
        icon: Users,
        color: 'text-green-600'
      }
    ],
    upcomingAppointments: [
      {
        id: '1',
        title: 'Autism Assessment - Jibril',
        professional: 'Dr. Sarah Johnson',
        type: 'Medical Assessment',
        date: '2025-01-18',
        time: '10:00 AM',
        location: 'Birmingham Children\'s Hospital'
      },
      {
        id: '2',
        title: 'Annual Review - Abdul',
        professional: 'School SENCO',
        type: 'EHC Plan Review',
        date: '2025-01-20',
        time: '2:00 PM',
        location: 'Mainstream Primary School'
      },
      {
        id: '3',
        title: 'Speech Therapy - Jibril',
        professional: 'Emma Thompson, SLT',
        type: 'Therapy Session',
        date: '2025-01-22',
        time: '3:30 PM',
        location: 'Community Health Centre'
      }
    ],
    quickStats: {
      totalChildren: 2,
      activeAssessments: 5,
      completedMilestones: 12,
      professionalTeamSize: 8,
      documentsStored: 47,
      averageProgress: 62
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (urgentActions: number) => {
    if (urgentActions === 0) return <Badge className="bg-green-100 text-green-700">On Track</Badge>;
    if (urgentActions === 1) return <Badge className="bg-orange-100 text-orange-700">1 Action</Badge>;
    return <Badge className="bg-red-100 text-red-700">{urgentActions} Actions</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                  SpectrumCare Dashboard
                </h1>
                <p className="text-sm text-slate-500">Family Support Hub</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp Commands
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
              <div className="relative">
                <Bell className="h-6 w-6 text-slate-400 cursor-pointer hover:text-slate-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.totalChildren}</p>
                    <p className="text-xs text-slate-500">Children</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.activeAssessments}</p>
                    <p className="text-xs text-slate-500">Assessments</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.completedMilestones}</p>
                    <p className="text-xs text-slate-500">Milestones</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.professionalTeamSize}</p>
                    <p className="text-xs text-slate-500">Professionals</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.documentsStored}</p>
                    <p className="text-xs text-slate-500">Documents</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{mockData.quickStats.averageProgress}%</p>
                    <p className="text-xs text-slate-500">Progress</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Children Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>Children Overview</span>
                    </CardTitle>
                    <CardDescription>Track progress and manage support for each child</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockData.children.map((child) => (
                      <Card key={child.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {child.name[0]}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{child.name}</h3>
                              <p className="text-sm text-slate-500">Age {child.age}</p>
                            </div>
                          </div>
                          {getPriorityBadge(child.urgentActions)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-slate-600">EHC Plan Progress</span>
                              <span className={`text-sm font-medium ${getProgressColor(child.ehcPlanProgress)}`}>
                                {child.ehcPlanProgress}%
                              </span>
                            </div>
                            <Progress value={child.ehcPlanProgress} className="h-2" />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-slate-600">Assessments</span>
                              <span className="text-sm font-medium text-slate-900">
                                {child.assessmentsComplete}/{child.assessmentsTotal}
                              </span>
                            </div>
                            <Progress
                              value={(child.assessmentsComplete / child.assessmentsTotal) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-slate-500">
                              <Calendar className="h-4 w-4" />
                              <span>Next: {child.nextAppointment}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockData.children.map((child) => (
                      <div key={child.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{child.recentActivity}</p>
                          <p className="text-xs text-slate-500">{child.name} • Today</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <span>Notifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.notifications.map((notification) => (
                      <Alert key={notification.id} className="p-3">
                        <notification.icon className={`h-4 w-4 ${notification.color}`} />
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm">{notification.title}</h4>
                          <AlertDescription className="text-xs mt-1">
                            {notification.message}
                          </AlertDescription>
                          <p className="text-xs text-slate-400 mt-1">{notification.date}</p>
                        </div>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Request Assessment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Scale className="h-4 w-4 mr-2" />
                      Legal Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="children" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Children Profiles</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Child Profile
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockData.children.map((child) => (
                <Card key={child.id} className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      {child.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{child.name}</h3>
                      <p className="text-slate-500">Age {child.age} years</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{child.assessmentsComplete}</div>
                        <div className="text-sm text-blue-700">Assessments Complete</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{child.ehcPlanProgress}%</div>
                        <div className="text-sm text-green-700">Plan Progress</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900">Professional Team</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-purple-100 text-purple-700">Educational Psychologist</Badge>
                        <Badge className="bg-green-100 text-green-700">Speech Therapist</Badge>
                        <Badge className="bg-orange-100 text-orange-700">Occupational Therapist</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Records
                      </Button>
                      <Button className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Upcoming Appointments</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>

            <div className="space-y-4">
              {mockData.upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {appointment.type.includes('Medical') && <Stethoscope className="h-6 w-6 text-blue-600" />}
                        {appointment.type.includes('EHC') && <FileText className="h-6 w-6 text-green-600" />}
                        {appointment.type.includes('Therapy') && <Heart className="h-6 w-6 text-purple-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{appointment.title}</h3>
                        <p className="text-slate-600">{appointment.professional}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date} at {appointment.time}</span>
                          </span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">
                      {appointment.type}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Document Library</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Autism Assessment Report - Abdul', type: 'Medical Report', date: '2025-01-10', icon: FileText, color: 'text-red-600' },
                { name: 'Speech Therapy Evaluation - Jibril', type: 'Assessment', date: '2025-01-08', icon: FileText, color: 'text-blue-600' },
                { name: 'EHC Plan Draft - Abdul', type: 'Legal Document', date: '2025-01-05', icon: FileText, color: 'text-green-600' },
                { name: 'School Report - Jibril', type: 'Educational', date: '2025-01-03', icon: FileText, color: 'text-purple-600' },
                { name: 'OT Assessment Photos - Abdul', type: 'Supporting Evidence', date: '2025-01-01', icon: FileText, color: 'text-orange-600' },
                { name: 'Medical History Summary', type: 'Medical Record', date: '2024-12-28', icon: FileText, color: 'text-pink-600' }
              ].map((doc, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <doc.icon className={`h-5 w-5 ${doc.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 text-sm mb-1">{doc.name}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                        <span className="text-xs text-slate-500">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
