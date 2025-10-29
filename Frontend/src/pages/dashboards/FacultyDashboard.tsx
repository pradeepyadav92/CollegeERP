import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Users,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  FileText,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import {
  mockFaculty,
  mockStudents,
  mockAttendanceRecords,
  mockClassSchedule,
  mockSubjects,
  mockExamResults,
  getFacultySchedule,
  getStudentById,
  getStudentAttendanceRecords
} from '@/lib/mockData';

const FacultyDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get current faculty (in a real app, this would come from auth context)
  const currentFaculty = mockFaculty[0]; // Dr. Sarah Wilson

  const schedule = getFacultySchedule(currentFaculty.id);
  const todaySchedule = schedule.filter(s => {
    const scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + (s.dayOfWeek - scheduleDate.getDay()));
    return scheduleDate.toISOString().split('T')[0] === selectedDate;
  });

  const students = mockStudents.filter(student =>
    student.department === currentFaculty.department
  );

  const attendanceStats = {
    total: students.length,
    present: students.filter(student => {
      const todayAttendance = getStudentAttendanceRecords(student.id)
        .filter(record => record.date === selectedDate);
      return todayAttendance.some(record => record.status === 'present');
    }).length,
    absent: students.filter(student => {
      const todayAttendance = getStudentAttendanceRecords(student.id)
        .filter(record => record.date === selectedDate);
      return todayAttendance.some(record => record.status === 'absent');
    }).length
  };

  const filteredStudents = students.filter(student => {
    if (searchQuery) {
      return student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedSubject !== 'all') {
      const subjectStudents = students.filter(s =>
        mockExamResults.some(result =>
          result.studentId === s.id && result.subjectId === selectedSubject
        )
      );
      return subjectStudents.some(s => s.id === student.id);
    }
    return true;
  });

  const getDayName = (dayIndex: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  const getAttendanceStatus = (studentId: string) => {
    const todayAttendance = getStudentAttendanceRecords(studentId)
      .filter(record => record.date === selectedDate);

    if (todayAttendance.length === 0) return 'not-marked';
    return todayAttendance[0].status;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Faculty Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Welcome back, {currentFaculty.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Apply for Leave
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaySchedule.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled for {new Date(selectedDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                In {currentFaculty.department}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.present}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((attendanceStats.present / students.length) * 100)}% attendance
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.absent}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="leave">Leave</TabsTrigger>
          </TabsList>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Class Schedule</span>
                </CardTitle>
                <CardDescription>
                  Your teaching schedule for the selected date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Select Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-48"
                  />
                </div>

                {todaySchedule.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No classes scheduled for {new Date(selectedDate).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todaySchedule.map((schedule) => {
                      const subject = mockSubjects.find(s => s.id === schedule.subjectId);
                      return (
                        <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{subject?.name} ({subject?.code})</h4>
                            <p className="text-sm text-muted-foreground">
                              {schedule.startTime} - {schedule.endTime} • Room {schedule.room}
                            </p>
                          </div>
                          <Badge variant="outline">{subject?.credits} Credits</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5" />
                  <span>Mark Attendance</span>
                </CardTitle>
                <CardDescription>
                  Mark student attendance for today's classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Search Students</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <label className="text-sm font-medium mb-2 block">Filter by Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {currentFaculty.subjects.map((subject, index) => (
                          <SelectItem key={index} value={mockSubjects.find(s => s.name === subject)?.id || index.toString()}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredStudents.map((student) => {
                    const attendanceStatus = getAttendanceStatus(student.id);
                    return (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              attendanceStatus === 'present' ? 'success' :
                              attendanceStatus === 'absent' ? 'destructive' :
                              'secondary'
                            }
                          >
                            {attendanceStatus === 'present' ? 'Present' :
                             attendanceStatus === 'absent' ? 'Absent' : 'Not Marked'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Mark Present
                          </Button>
                          <Button size="sm" variant="outline">
                            Mark Absent
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Student Performance</span>
                </CardTitle>
                <CardDescription>
                  Monitor student academic performance and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExamResults
                    .filter(result => students.some(s => s.id === result.studentId))
                    .map((result) => {
                      const student = getStudentById(result.studentId);
                      const subject = mockSubjects.find(s => s.id === result.subjectId);
                      return (
                        <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{student?.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {subject?.name} • {result.examType}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {result.marks}/{result.maxMarks} ({result.percentage}%)
                            </div>
                            <Badge
                              variant={
                                result.grade === 'A+' || result.grade === 'A' ? 'success' :
                                result.grade === 'B+' || result.grade === 'B' ? 'warning' :
                                'destructive'
                              }
                            >
                              Grade {result.grade}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leave Tab */}
          <TabsContent value="leave" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Leave Management</span>
                </CardTitle>
                <CardDescription>
                  Apply for leave and track leave applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Apply for Leave</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Leave Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sick">Sick Leave</SelectItem>
                            <SelectItem value="casual">Casual Leave</SelectItem>
                            <SelectItem value="emergency">Emergency Leave</SelectItem>
                            <SelectItem value="maternity">Maternity Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-2 block">From Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">To Date</label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reason</label>
                        <Input placeholder="Enter reason for leave" />
                      </div>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Leave Application
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Leave History</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-800">Sick Leave</p>
                            <p className="text-sm text-green-600">Jan 20-22, 2025</p>
                          </div>
                          <Badge variant="success">Approved</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-yellow-800">Casual Leave</p>
                            <p className="text-sm text-yellow-600">Feb 1-3, 2025</p>
                          </div>
                          <Badge variant="warning">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FacultyDashboard;
