import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Users,
  Calendar,
  GraduationCap,
  BookOpen,
  FileCheck,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Send
} from 'lucide-react';
import {
  mockStudents,
  mockDepartments,
  mockExamResults,
  mockLeaveApplications,
  getPendingLeaveApplications,
  getStudentById
} from '@/lib/mockData';

const RegistrarDashboard: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('6');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pendingLeaves = getPendingLeaveApplications();

  const admissionStats = {
    newApplications: 45,
    approvedAdmissions: 38,
    pendingDocuments: 12,
    rollNumbersAssigned: 156,
    documentsGenerated: 89,
    pendingVerifications: 7
  };

  const examStats = {
    scheduledExams: 12,
    completedExams: 8,
    pendingResults: 4,
    totalStudentsAppeared: 289,
    averageAttendance: 94,
    passPercentage: 87
  };

  const filteredStudents = mockStudents.filter(student => {
    if (searchQuery) {
      return student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedDepartment !== 'all') {
      const dept = mockDepartments.find(d => d.id === selectedDepartment);
      return student.department === dept?.name;
    }
    return true;
  });

  const documentRequests = [
    { id: 1, studentName: 'John Doe', documentType: 'Transfer Certificate', status: 'pending', requestedDate: '2025-01-10' },
    { id: 2, studentName: 'Jane Smith', documentType: 'Bonafide Certificate', status: 'approved', requestedDate: '2025-01-12' },
    { id: 3, studentName: 'Mike Johnson', documentType: 'Migration Certificate', status: 'processing', requestedDate: '2025-01-14' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Registrar Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Academic Registrar Office
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Exam
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Applications</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admissionStats.newApplications}</div>
              <p className="text-xs text-muted-foreground">
                {admissionStats.approvedAdmissions} approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
              <FileCheck className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admissionStats.pendingDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Require verification
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Exams</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{examStats.scheduledExams}</div>
              <p className="text-xs text-muted-foreground">
                {examStats.completedExams} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Generated</CardTitle>
              <Download className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admissionStats.documentsGenerated}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="admissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="exams">Exam Management</TabsTrigger>
            <TabsTrigger value="documents">Document Generation</TabsTrigger>
            <TabsTrigger value="records">Student Records</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          </TabsList>

          {/* Admissions Tab */}
          <TabsContent value="admissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Admission Management</span>
                </CardTitle>
                <CardDescription>
                  Review and approve new student applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{admissionStats.newApplications}</div>
                      <p className="text-sm text-blue-800">New Applications</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{admissionStats.approvedAdmissions}</div>
                      <p className="text-sm text-green-800">Approved</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{admissionStats.pendingDocuments}</div>
                      <p className="text-sm text-yellow-800">Pending Documents</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {mockStudents.slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Applied for: {student.department} • Roll: {student.rollNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Application Date: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="warning">Under Review</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review Application
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
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Management Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Exam Schedule Management</span>
                </CardTitle>
                <CardDescription>
                  Schedule and manage examination timetables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Semester</label>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="3">Semester 3</SelectItem>
                        <SelectItem value="4">Semester 4</SelectItem>
                        <SelectItem value="5">Semester 5</SelectItem>
                        <SelectItem value="6">Semester 6</SelectItem>
                        <SelectItem value="7">Semester 7</SelectItem>
                        <SelectItem value="8">Semester 8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule New Exam
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{examStats.completedExams}</div>
                      <p className="text-sm text-green-800">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{examStats.scheduledExams}</div>
                      <p className="text-sm text-blue-800">Scheduled</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{examStats.pendingResults}</div>
                      <p className="text-sm text-purple-800">Results Pending</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Upcoming Exams</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium">Data Structures Final Exam</h5>
                          <p className="text-sm text-muted-foreground">Jan 25, 2025 • 10:00 AM - 1:00 PM</p>
                        </div>
                        <Badge variant="warning">Scheduled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium">Algorithms Mid-term</h5>
                          <p className="text-sm text-muted-foreground">Feb 5, 2025 • 2:00 PM - 4:00 PM</p>
                        </div>
                        <Badge variant="warning">Scheduled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Generation Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5" />
                  <span>Document Generation</span>
                </CardTitle>
                <CardDescription>
                  Generate certificates and official documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button variant="outline" className="h-24 flex-col space-y-2">
                    <GraduationCap className="h-6 w-6" />
                    <span>Transfer Certificate</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Migration Certificate</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Bonafide Certificate</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Document Requests</h4>
                  <div className="space-y-3">
                    {documentRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium">{request.studentName}</h5>
                          <p className="text-sm text-muted-foreground">
                            {request.documentType} • Requested: {new Date(request.requestedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              request.status === 'approved' ? 'success' :
                              request.status === 'pending' ? 'warning' :
                              'secondary'
                            }
                          >
                            {request.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {request.status === 'pending' && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student Records</span>
                </CardTitle>
                <CardDescription>
                  Manage and update student academic records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Departments" />
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
                </div>

                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.rollNumber} • {student.department} • Semester {student.semester}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          CGPA: {student.cgpa} • Attendance: {student.attendancePercentage}%
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Record
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Update Record
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Pending Approvals</span>
                </CardTitle>
                <CardDescription>
                  Review pending approvals for various requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingLeaves.slice(0, 3).map((leave) => {
                    const applicant = getStudentById(leave.applicantId);
                    return (
                      <div key={leave.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
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

export default RegistrarDashboard;
