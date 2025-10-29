import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  CreditCard,
  Calendar,
  TrendingUp,
  Bell,
  BookOpen,
  DollarSign,
  Clock,
  Award
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Current CGPA',
      value: '8.7',
      change: '+0.3',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-green-600',
    },
    {
      title: 'Attendance %',
      value: '94%',
      change: '+2%',
      icon: <Calendar className="h-4 w-4" />,
      color: 'text-blue-600',
    },
    {
      title: 'Pending Fees',
      value: '₹12,500',
      change: 'Due in 15 days',
      icon: <DollarSign className="h-4 w-4" />,
      color: 'text-orange-600',
    },
    {
      title: 'Assignments',
      value: '3',
      change: '2 overdue',
      icon: <BookOpen className="h-4 w-4" />,
      color: 'text-purple-600',
    },
  ];

  const recentNotices = [
    {
      id: 1,
      title: 'Mid-term Exam Schedule Released',
      priority: 'high',
      date: '2025-01-15',
    },
    {
      id: 2,
      title: 'Fee Payment Reminder',
      priority: 'medium',
      date: '2025-01-14',
    },
    {
      id: 3,
      title: 'Campus Placement Drive',
      priority: 'low',
      date: '2025-01-13',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Student Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Welcome back, John Doe
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Notices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Notices</span>
              </CardTitle>
              <CardDescription>
                Latest announcements and important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{notice.title}</h4>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                  </div>
                  <Badge
                    variant={
                      notice.priority === 'high' ? 'destructive' :
                      notice.priority === 'medium' ? 'warning' : 'secondary'
                    }
                  >
                    {notice.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Fees Online
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Award className="h-4 w-4 mr-2" />
                Check Results
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Fee Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Fee Status</span>
            </CardTitle>
            <CardDescription>
              Current semester fee breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Tuition Fee</p>
                  <p className="text-2xl font-bold text-green-900">₹45,000</p>
                </div>
                <Badge variant="paid">Paid</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Hostel Fee</p>
                  <p className="text-2xl font-bold text-yellow-900">₹12,500</p>
                </div>
                <Badge variant="pending">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-800">Library Fine</p>
                  <p className="text-2xl font-bold text-red-900">₹500</p>
                </div>
                <Badge variant="overdue">Overdue</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentDashboard;
