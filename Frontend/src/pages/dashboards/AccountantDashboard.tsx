import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  Calendar,
  Download,
  Search,
  Filter,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import {
  mockStudents,
  mockFeeRecords,
  mockDepartments,
  getFinancialSummary,
  getStudentFeeRecords
} from '@/lib/mockData';

const AccountantDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const financialSummary = getFinancialSummary();

  const paymentStats = {
    totalStudents: mockStudents.length,
    paidStudents: mockFeeRecords.filter(record => record.status === 'paid').length,
    pendingStudents: mockFeeRecords.filter(record => record.status === 'pending').length,
    overdueStudents: mockFeeRecords.filter(record => record.status === 'overdue').length,
    collectionRate: financialSummary.collectionRate,
    totalCollected: financialSummary.paidFees,
    totalPending: financialSummary.pendingFees,
    totalOverdue: financialSummary.overdueFees
  };

  const recentPayments = mockFeeRecords
    .filter(record => record.status === 'paid')
    .sort((a, b) => new Date(b.paidDate || '').getTime() - new Date(a.paidDate || '').getTime())
    .slice(0, 5);

  const pendingPayments = mockFeeRecords
    .filter(record => record.status === 'pending' || record.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 10);

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

  const getStudentFeeStatus = (studentId: string) => {
    const feeRecords = getStudentFeeRecords(studentId);
    const hasOverdue = feeRecords.some(record => record.status === 'overdue');
    const hasPending = feeRecords.some(record => record.status === 'pending');
    const allPaid = feeRecords.every(record => record.status === 'paid');

    if (hasOverdue) return { status: 'overdue', color: 'destructive' };
    if (hasPending) return { status: 'pending', color: 'warning' };
    if (allPaid) return { status: 'paid', color: 'success' };
    return { status: 'partial', color: 'secondary' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Accountant Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">
                    Finance & Accounts Department
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
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
        {/* Financial Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{paymentStats.totalCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {paymentStats.collectionRate.toFixed(1)}% collection rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{paymentStats.totalPending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {paymentStats.pendingStudents} students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{paymentStats.totalOverdue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {paymentStats.overdueStudents} students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentStats.paidStudents}/{paymentStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Payment completion rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payments">Payment Tracking</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="students">Student Accounts</TabsTrigger>
            <TabsTrigger value="processing">Payment Processing</TabsTrigger>
          </TabsList>

          {/* Payment Tracking Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Recent Payments</span>
                  </CardTitle>
                  <CardDescription>
                    Latest fee payments received
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPayments.map((payment) => {
                      const student = mockStudents.find(s => s.id === payment.studentId);
                      return (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{student?.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student?.rollNumber} • {payment.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ₹{payment.amount.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : ''}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Pending Payments</span>
                  </CardTitle>
                  <CardDescription>
                    Students with outstanding fees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingPayments.map((payment) => {
                      const student = mockStudents.find(s => s.id === payment.studentId);
                      const isOverdue = new Date(payment.dueDate) < new Date();
                      return (
                        <div key={payment.id} className={`flex items-center justify-between p-3 rounded-lg ${
                          isOverdue ? 'bg-red-50' : 'bg-yellow-50'
                        }`}>
                          <div>
                            <h4 className="font-medium">{student?.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student?.rollNumber} • Due: {new Date(payment.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`}>
                              ₹{payment.amount.toLocaleString()}
                            </div>
                            <Badge variant={isOverdue ? 'destructive' : 'warning'}>
                              {isOverdue ? 'Overdue' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Financial Reports</span>
                </CardTitle>
                <CardDescription>
                  Generate and view financial reports by period and department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Report Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-48">
                    <label className="text-sm font-medium mb-2 block">Department</label>
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
                  <div className="flex items-end">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ₹{financialSummary.paidFees.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-800">
                      Total Collected
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {financialSummary.collectionRate.toFixed(1)}%
                    </div>
                    <p className="text-sm text-blue-800">
                      Collection Rate
                    </p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹{financialSummary.pendingFees.toLocaleString()}
                    </div>
                    <p className="text-sm text-purple-800">
                      Outstanding
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Accounts Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student Accounts</span>
                </CardTitle>
                <CardDescription>
                  Monitor individual student fee status and payment history
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
                  {filteredStudents.map((student) => {
                    const feeStatus = getStudentFeeStatus(student.id);
                    const studentFees = getStudentFeeRecords(student.id);
                    const totalAmount = studentFees.reduce((sum, fee) => sum + fee.amount, 0);
                    const paidAmount = studentFees
                      .filter(fee => fee.status === 'paid')
                      .reduce((sum, fee) => sum + fee.amount, 0);

                    return (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.rollNumber} • {student.department}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total: ₹{totalAmount.toLocaleString()} • Paid: ₹{paidAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={feeStatus.color as any}>
                            {feeStatus.status}
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

          {/* Payment Processing Tab */}
          <TabsContent value="processing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Processing</span>
                </CardTitle>
                <CardDescription>
                  Process online, offline, and cheque payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{financialSummary.paidFees.toLocaleString()}
                    </div>
                    <p className="text-sm text-blue-800">
                      Online Payments
                    </p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ₹45,000
                    </div>
                    <p className="text-sm text-green-800">
                      Bank Transfers
                    </p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹12,000
                    </div>
                    <p className="text-sm text-purple-800">
                      Cheque/DD
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Transactions</h4>
                  <div className="space-y-3">
                    {recentPayments.slice(0, 3).map((payment) => {
                      const student = mockStudents.find(s => s.id === payment.studentId);
                      return (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium">{student?.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {payment.paymentMethod} • {payment.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{payment.amount.toLocaleString()}</div>
                            <Badge variant="success">Processed</Badge>
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

export default AccountantDashboard;
