import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Calendar,
  Award,
  Building,
  Search,
  Filter,
  Plus,
  Eye,
  AlertTriangle
} from 'lucide-react';
import {
  mockDepartments,
  mockFaculty,
  mockStudents,
  mockSubjects,
  mockLeaveApplications,
  mockExamResults,
  getDepartmentFaculty,
  getDepartmentStudents,
  getPendingLeaveApplications,
  getFacultyById,
  getStudentById
} from '@/lib/mockData';

const HODDashboard: React.FC = () => {
  const [selectedDepartment] = useState<string>('1'); // Computer Science
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentDepartment = mockDepartments.find(d => d.id === selectedDepartment);
  const departmentFaculty = getDepartmentFaculty(selectedDepartment);
  const departmentStudents = getDepartmentStudents(selectedDepartment);
  const pendingLeaves = getPendingLeaveApplications();

  const departmentStats = {
    totalStudents: departmentStudents.length,
    totalFaculty: departmentFaculty.length,
    totalSubjects: mockSubjects.filter(s => s.department === currentDepartment?.name).length,
    avgAttendance: 92, // Calculated from mock data
    passRate: 87 // Calculated from mock data
  };

  const filteredFaculty = departmentFaculty.filter(faculty => {
    if (searchQuery) {
      return faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             faculty.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getWorkloadLevel = (facultyId: string) => {
    const facultySubjects = mockSubjects.filter(s => s.facultyId === facultyId);
    const totalCredits = facultySubjects.reduce((sum, subject) => sum + subject.credits, 0);

    if (totalCredits >= 20) return 'high';
    if (totalCredits >= 15) return 'medium';
    return 'low';
  };

  const getLeaveStatus = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    HOD Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Head of Department - {currentDepartment?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Assign Subject
              </Button>
              <Button variant="outline" size="sm">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Enrolled in {currentDepartment?.name}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">
                Teaching staff members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.avgAttendance}%</div>
              <p className="text-xs text-muted-foreground">
                Department average
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
              <Award className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.passRate}%</div>
              <p className="text-xs text-muted-foreground">
                Academic performance
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faculty" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faculty">Faculty Management</TabsTrigger>
            <TabsTrigger value="approvals">Leave Approvals</TabsTrigger>
            <TabsTrigger value="workload">Workload Distribution</TabsTrigger>
            <TabsTrigger value="performance">Department Performance</TabsTrigger>
          </TabsList>

          {/* Faculty Management Tab */}
          <TabsContent value="faculty" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Faculty Management</span>
                </CardTitle>
                <CardDescription>
                  Manage faculty members and their assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search faculty by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Faculty
                  </Button>
                </div>

                <div className="grid gap-4">
                  {filteredFaculty.map((faculty) => {
                    const workloadLevel = getWorkloadLevel(faculty.id);
                    const facultySubjects = mockSubjects.filter(s => s.facultyId === faculty.id);

                    return (
                      <div key={faculty.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{faculty.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {faculty.employeeId} • {faculty.designation}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {facultySubjects.length} subjects assigned
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              workloadLevel === 'high' ? 'destructive' :
                              workloadLevel === 'medium' ? 'warning' : 'success'
                            }
                          >
                            {workloadLevel} workload
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leave Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Leave Approvals</span>
                </CardTitle>
                <CardDescription>
                  Review and approve faculty and student leave applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingLeaves
                    .filter(leave => {
                      // Filter leaves for department members
                      if (leave.applicantType === 'faculty') {
                        const faculty = getFacultyById(leave.applicantId);
                        return faculty?.department === currentDepartment?.name;
                      } else {
                        const student = getStudentById(leave.applicantId);
                        return student?.department === currentDepartment?.name;
                      }
                    })
                    .map((leave) => {
                      const applicant = leave.applicantType === 'faculty'
                        ? getFacultyById(leave.applicantId)
                        : getStudentById(leave.applicantId);

                      return (
                        <div key={leave.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{applicant?.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {leave.leaveType} leave • {leave.startDate} to {leave.endDate}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Reason: {leave.reason}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="warning">Pending</Badge>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workload Distribution Tab */}
          <TabsContent value="workload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Faculty Workload Distribution</span>
                </CardTitle>
                <CardDescription>
                  Monitor and balance faculty teaching load
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentFaculty.map((faculty) => {
                    const facultySubjects = mockSubjects.filter(s => s.facultyId === faculty.id);
                    const totalCredits = facultySubjects.reduce((sum, subject) => sum + subject.credits, 0);
                    const workloadPercentage = Math.min((totalCredits / 20) * 100, 100);

                    return (
                      <div key={faculty.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{faculty.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {faculty.designation} • {facultySubjects.length} subjects
                            </p>
                          </div>
                          <Badge
                            variant={
                              totalCredits >= 20 ? 'destructive' :
                              totalCredits >= 15 ? 'warning' : 'success'
                            }
                          >
                            {totalCredits} credits
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Workload</span>
                            <span>{Math.round(workloadPercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                totalCredits >= 20 ? 'bg-red-500' :
                                totalCredits >= 15 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${workloadPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {facultySubjects.map((subject) => (
                            <Badge key={subject.id} variant="outline">
                              {subject.name} ({subject.credits} credits)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Department Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Department Performance</span>
                </CardTitle>
                <CardDescription>
                  Academic performance metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {departmentStats.avgAttendance}%
                    </div>
                    <p className="text-sm text-green-800">
                      Average Attendance
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {departmentStats.passRate}%
                    </div>
                    <p className="text-sm text-blue-800">
                      Pass Rate
                    </p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      4.2
                    </div>
                    <p className="text-sm text-purple-800">
                      Avg CGPA
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Subject-wise Performance</h4>
                  <div className="space-y-3">
                    {mockSubjects
                      .filter(s => s.department === currentDepartment?.name)
                      .map((subject) => {
                        const subjectResults = mockExamResults.filter(r => r.subjectId === subject.id);
                        const avgMarks = subjectResults.reduce((sum, result) => sum + result.percentage, 0) / subjectResults.length;

                        return (
                          <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h5 className="font-medium">{subject.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                {subject.code} • {subject.credits} credits
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {avgMarks.toFixed(1)}%
                              </div>
                              <Badge
                                variant={
                                  avgMarks >= 80 ? 'success' :
                                  avgMarks >= 60 ? 'warning' : 'destructive'
                                }
                              >
                                {avgMarks >= 80 ? 'Excellent' :
                                 avgMarks >= 60 ? 'Good' : 'Needs Attention'}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
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

export default HODDashboard;
