import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Shield,
  TrendingUp,
  Award,
  Users,
  Building,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  TrendingDown,
  Activity,
  FileText,
  Settings,
  Eye,
  Plus,
  Download
} from 'lucide-react';
import {
  mockDepartments,
  mockStudents,
  mockFaculty,
  mockExamResults,
  mockFeeRecords,
  getAcademicPerformance,
  getFinancialSummary,
  getAttendanceSummary
} from '@/lib/mockData';

const DirectorDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedInitiative, setSelectedInitiative] = useState<string>('all');

  const academicPerformance = getAcademicPerformance();
  const financialSummary = getFinancialSummary();
  const attendanceSummary = getAttendanceSummary();

  const institutionalKPIs = {
    totalStudents: mockStudents.length,
    totalFaculty: mockFaculty.length,
    totalDepartments: mockDepartments.length,
    overallPassRate: academicPerformance.passRate,
    avgAttendance: attendanceSummary.attendanceRate,
    totalRevenue: financialSummary.paidFees,
    budgetUtilization: 78, // Percentage of budget used
    placementRate: 85, // Placement percentage
    accreditationScore: 4.2, // NAAC/NBA score
    researchPublications: 45,
    studentSatisfaction: 4.1 // Out of 5
  };

  const strategicInitiatives = [
    {
      id: 1,
      name: 'Digital Transformation',
      status: 'in-progress',
      progress: 65,
      budget: 500000,
      deadline: '2025-06-30',
      description: 'Implement campus-wide digital infrastructure'
    },
    {
      id: 2,
      name: 'Industry Partnerships',
      status: 'on-track',
      progress: 80,
      budget: 300000,
      deadline: '2025-12-31',
      description: 'Establish partnerships with leading tech companies'
    },
    {
      id: 3,
      name: 'Research Excellence',
      status: 'at-risk',
      progress: 45,
      budget: 400000,
      deadline: '2025-08-31',
      description: 'Increase research output and faculty publications'
    },
    {
      id: 4,
      name: 'Campus Sustainability',
      status: 'completed',
      progress: 100,
      budget: 250000,
      deadline: '2025-03-31',
      description: 'Implement green campus initiatives'
    }
  ];

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
        : 0,
      budgetAllocated: Math.floor(Math.random() * 500000) + 100000,
      budgetUtilized: Math.floor(Math.random() * 80) + 60
    };
  });

  const filteredInitiatives = selectedInitiative === 'all'
    ? strategicInitiatives
    : strategicInitiatives.filter(initiative => initiative.id.toString() === selectedInitiative);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'on-track': return 'info';
      case 'at-risk': return 'destructive';
      default: return 'secondary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Director Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Institutional Director - Strategic Oversight
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Strategic Planning
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Annual Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Institutional KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalKPIs.overallPassRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Academic excellence metric
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalKPIs.budgetUtilization}%</div>
              <p className="text-xs text-muted-foreground">
                Financial efficiency
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalKPIs.placementRate}%</div>
              <p className="text-xs text-muted-foreground">
                Career outcomes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accreditation Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalKPIs.accreditationScore}</div>
              <p className="text-xs text-muted-foreground">
                NAAC/NBA rating
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Institutional Overview</TabsTrigger>
            <TabsTrigger value="departments">Department Performance</TabsTrigger>
            <TabsTrigger value="initiatives">Strategic Initiatives</TabsTrigger>
            <TabsTrigger value="accreditation">Accreditation Status</TabsTrigger>
            <TabsTrigger value="planning">Strategic Planning</TabsTrigger>
          </TabsList>

          {/* Institutional Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Academic Performance Trends</span>
                  </CardTitle>
                  <CardDescription>
                    Institution-wide academic metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Overall Pass Rate</p>
                        <p className="text-sm text-muted-foreground">All departments combined</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {institutionalKPIs.overallPassRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Above target</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Student Satisfaction</p>
                        <p className="text-sm text-muted-foreground">Annual survey results</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {institutionalKPIs.studentSatisfaction}/5.0
                        </div>
                        <p className="text-sm text-muted-foreground">Excellent</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Research Output</p>
                        <p className="text-sm text-muted-foreground">Publications this year</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {institutionalKPIs.researchPublications}
                        </div>
                        <p className="text-sm text-muted-foreground">Papers published</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Operational Metrics</span>
                  </CardTitle>
                  <CardDescription>
                    Key operational and administrative metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Total Enrollment</p>
                        <p className="text-sm text-muted-foreground">Active students</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {institutionalKPIs.totalStudents}
                        </div>
                        <p className="text-sm text-muted-foreground">Across {institutionalKPIs.totalDepartments} departments</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Faculty Strength</p>
                        <p className="text-sm text-muted-foreground">Teaching staff</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {institutionalKPIs.totalFaculty}
                        </div>
                        <p className="text-sm text-muted-foreground">Qualified professionals</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium">Attendance Rate</p>
                        <p className="text-sm text-muted-foreground">Overall attendance</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">
                          {institutionalKPIs.avgAttendance.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Healthy participation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Department Performance Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Department-wise Performance</span>
                </CardTitle>
                <CardDescription>
                  Compare performance metrics across all departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentComparison.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.studentCount} students • {dept.facultyCount} faculty
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Budget: ₹{dept.budgetAllocated.toLocaleString()} • Utilized: {dept.budgetUtilized}%
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">
                            {dept.avgPerformance.toFixed(1)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Performance</p>
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

          {/* Strategic Initiatives Tab */}
          <TabsContent value="initiatives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Strategic Initiatives</span>
                </CardTitle>
                <CardDescription>
                  Monitor progress of strategic institutional initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Select value={selectedInitiative} onValueChange={setSelectedInitiative}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Initiatives</SelectItem>
                      <SelectItem value="1">In Progress</SelectItem>
                      <SelectItem value="2">On Track</SelectItem>
                      <SelectItem value="3">At Risk</SelectItem>
                      <SelectItem value="4">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {filteredInitiatives.map((initiative) => (
                    <div key={initiative.id} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{initiative.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Budget: ₹{initiative.budget.toLocaleString()} • Deadline: {new Date(initiative.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(initiative.status) as any}>
                          {initiative.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {initiative.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${getProgressColor(initiative.progress)}`}
                            style={{ width: `${initiative.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {initiative.status === 'at-risk' && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-800">
                              This initiative requires immediate attention
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accreditation Status Tab */}
          <TabsContent value="accreditation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Accreditation Status</span>
                </CardTitle>
                <CardDescription>
                  Current accreditation ratings and compliance status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {institutionalKPIs.accreditationScore}
                    </div>
                    <p className="text-sm text-yellow-800">
                      NAAC Grade A
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Valid until 2027
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      4.1
                    </div>
                    <p className="text-sm text-blue-800">
                      NBA Accreditation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Engineering programs
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h4 className="font-medium">Accreditation Components</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Curriculum Design</p>
                        <p className="text-sm text-muted-foreground">Quality and relevance</p>
                      </div>
                      <Badge variant="success">4.5/5</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Faculty Quality</p>
                        <p className="text-sm text-muted-foreground">Qualifications and experience</p>
                      </div>
                      <Badge variant="success">4.3/5</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Infrastructure</p>
                        <p className="text-sm text-muted-foreground">Facilities and resources</p>
                      </div>
                      <Badge variant="warning">3.8/5</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Student Support</p>
                        <p className="text-sm text-muted-foreground">Services and placement</p>
                      </div>
                      <Badge variant="success">4.2/5</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategic Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Strategic Planning & Budgeting</span>
                </CardTitle>
                <CardDescription>
                  Long-term institutional planning and resource allocation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{financialSummary.paidFees.toLocaleString()}
                    </div>
                    <p className="text-sm text-blue-800">
                      Annual Revenue
                    </p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {institutionalKPIs.budgetUtilization}%
                    </div>
                    <p className="text-sm text-green-800">
                      Budget Utilized
                    </p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹2.5Cr
                    </div>
                    <p className="text-sm text-purple-800">
                      Total Budget
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Budget Allocation by Department</h4>
                  <div className="space-y-3">
                    {departmentComparison.map((dept) => (
                      <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium">{dept.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {dept.studentCount} students • {dept.facultyCount} faculty
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{dept.budgetAllocated.toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">
                            {dept.budgetUtilized}% utilized
                          </p>
                        </div>
                      </div>
                    ))}
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

export default DirectorDashboard;
