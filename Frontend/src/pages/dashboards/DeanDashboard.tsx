import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Crown,
  TrendingUp,
  Users,
  Award,
  Calendar,
  CheckCircle,
  XCircle,
  Building,
  BookOpen,
  DollarSign,
  Target,
  AlertTriangle,
  Eye,
  Download,
  Plus
} from 'lucide-react';
import {
  mockDepartments,
  mockFaculty,
  mockStudents,
  mockExamResults,
  mockLeaveApplications,
  mockFeeRecords,
  getAcademicPerformance,
  getFinancialSummary,
  getPendingLeaveApplications
} from '@/lib/mockData';

const DeanDashboard: React.FC = () => {
  const [selectedSemester] = useState<string>('6');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const academicPerformance = getAcademicPerformance();
  const financialSummary = getFinancialSummary();
  const pendingLeaves = getPendingLeaveApplications();

  const collegeStats = {
    totalStudents: mockStudents.length,
    totalFaculty: mockFaculty.length,
    totalDepartments: mockDepartments.length,
    avgAttendance: 92,
    overallPassRate: academicPerformance.passRate,
    totalRevenue: financialSummary.paidFees,
    pendingApprovals: pendingLeaves.length
  };

  const departmentComparison = mockDepartments.map(dept => {
    const deptStudents = mockStudents.filter(s => s.department === dept.name);
    const deptFaculty = mockFaculty.filter(f => f.department === dept.name);
    const deptResults = mockExamResults.filter(result =>
      deptStudents.some(student => student.id === result.studentId)
    );

    return {
      ...dept,
      studentCount: deptStudents.length,
      facultyCount: deptFaculty.length,
      avgPerformance: deptResults.length > 0
        ? deptResults.reduce((sum, result) => sum + result.percentage, 0) / deptResults.length
        : 0
    };
  });

  const filteredDepartments = selectedDepartment === 'all'
    ? departmentComparison
    : departmentComparison.filter(dept => dept.id === selectedDepartment);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Dean Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Academic Dean - Engineering College
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* College Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collegeStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Across all departments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collegeStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">
                Teaching staff members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collegeStats.overallPassRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Academic performance
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collegeStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">College Analytics</TabsTrigger>
            <TabsTrigger value="departments">Department Comparison</TabsTrigger>
            <TabsTrigger value="approvals">Curriculum Approvals</TabsTrigger>
            <TabsTrigger value="faculty">Faculty Reviews</TabsTrigger>
          </TabsList>

          {/* College Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Academic Performance Trends</span>
                  </CardTitle>
                  <CardDescription>
                    Semester-wise performance analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Current Semester</p>
                        <p className="text-sm text-muted-foreground">Spring 2025</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {academicPerformance.passRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Pass Rate</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Average Marks</p>
                        <p className="text-sm text-muted-foreground">All subjects</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {academicPerformance.avgMarks.toFixed(1)}
                        </div>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Grade Distribution</p>
                        <p className="text-sm text-muted-foreground">A+ to F grades</p>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-1">
                          {Object.entries(academicPerformance.gradeDistribution).map(([grade, count]) => (
                            <Badge key={grade} variant="outline">
                              {grade}: {count as number}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Financial Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Fee collection and financial health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Total Collected</p>
                        <p className="text-sm text-muted-foreground">This semester</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₹{financialSummary.paidFees.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {financialSummary.collectionRate.toFixed(1)}% rate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Pending Amount</p>
                        <p className="text-sm text-muted-foreground">Outstanding fees</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-600">
                          ₹{financialSummary.pendingFees.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Need follow-up</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">Overdue Amount</p>
                        <p className="text-sm text-muted-foreground">Past due date</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">
                          ₹{financialSummary.overdueFees.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Urgent action needed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Department Comparison Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Department Comparison</span>
                </CardTitle>
                <CardDescription>
                  Compare performance across all departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {mockDepartments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.studentCount} students • {dept.facultyCount} faculty
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getPerformanceColor(dept.avgPerformance)}`}>
                            {dept.avgPerformance.toFixed(1)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Avg Performance</p>
                        </div>
                        <Badge
                          variant={
                            dept.avgPerformance >= 85 ? 'success' :
                            dept.avgPerformance >= 70 ? 'warning' : 'destructive'
                          }
                        >
                          {dept.avgPerformance >= 85 ? 'Excellent' :
                           dept.avgPerformance >= 70 ? 'Good' : 'Needs Attention'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Curriculum Approvals</span>
                </CardTitle>
                <CardDescription>
                  Review and approve curriculum changes and new course proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">New AI/ML Course Proposal</h4>
                      <p className="text-sm text-muted-foreground">
                        Department: Computer Science • Proposed by: Dr. Sarah Wilson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        4 credits • Prerequisites: Data Structures, Algorithms
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="warning">Pending</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Thermodynamics Lab Update</h4>
                      <p className="text-sm text-muted-foreground">
                        Department: Mechanical Engineering • Minor syllabus update
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equipment modernization and safety protocols
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success">Approved</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Faculty Reviews Tab */}
          <TabsContent value="faculty" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Faculty Performance Reviews</span>
                </CardTitle>
                <CardDescription>
                  Monitor and review faculty performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFaculty.map((faculty) => {
                    const facultyResults = mockExamResults.filter(result =>
                      mockStudents.some(student =>
                        student.id === result.studentId &&
                        student.department === faculty.department
                      )
                    );

                    const avgPerformance = facultyResults.length > 0
                      ? facultyResults.reduce((sum, result) => sum + result.percentage, 0) / facultyResults.length
                      : 0;

                    return (
                      <div key={faculty.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{faculty.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {faculty.employeeId} • {faculty.designation}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {faculty.department} • {faculty.experience} years experience
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getPerformanceColor(avgPerformance)}`}>
                              {avgPerformance.toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">Avg Performance</p>
                          </div>
                          <Badge
                            variant={
                              avgPerformance >= 85 ? 'success' :
                              avgPerformance >= 70 ? 'warning' : 'destructive'
                            }
                          >
                            {avgPerformance >= 85 ? 'Excellent' :
                             avgPerformance >= 70 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DeanDashboard;
