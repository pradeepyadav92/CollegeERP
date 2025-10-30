import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap,
  User,
  Home,
  BookOpen,
  FileText,
  Upload,
  Building2,
  CreditCard,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    category: '',
    religion: '',
    nationality: 'Indian',
    aadhaarNumber: '',
    email: '',
    mobile: '',
    alternateMobile: '',
    fatherName: '',
    fatherOccupation: '',
    fatherMobile: '',
    motherName: '',
    motherOccupation: '',
    guardianName: '',
    annualIncome: '',
    permanentAddress: '',
    currentAddress: '',
    state: '',
    district: '',
    pinCode: '',
    tenthSchool: '',
    tenthBoard: '',
    tenthYear: '',
    tenthRoll: '',
    tenthPercentage: '',
    twelfthSchool: '',
    twelfthBoard: '',
    twelfthYear: '',
    twelfthRoll: '',
    twelfthPercentage: '',
    entranceExam: '',
    entranceRoll: '',
    entranceRank: '',
    entranceScore: '',
    courseName: '',
    branch: '',
    admissionCategory: '',
    academicYear: '',
    admissionDate: '',
    requireHostel: 'no',
    requireTransport: 'no',
    localGuardianName: '',
    localGuardianAddress: '',
    medicalCondition: '',
    feeType: '',
    transactionId: '',
    paymentMode: '',
    paymentDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    setSubmitted(true);
  };

  const sameAsPermament = () => {
    setFormData(prev => ({ ...prev, currentAddress: prev.permanentAddress }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Registration Submitted!</CardTitle>
            <CardDescription>
              Your registration has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>What's Next?</strong>
              </p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Your application will be reviewed by the Registrar</li>
                <li>Upon approval, you will receive a unique Roll Number</li>
                <li>Check your email ({formData.email}) for updates</li>
                <li>Once approved, you can login using your Roll Number</li>
              </ol>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Application ID:</strong> REG-{Date.now().toString().slice(-8)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Submitted On:</strong> {new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Registration</h1>
                <p className="text-sm text-gray-600">Complete all sections to register</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              <TabsTrigger value="personal" className="text-xs">
                <User className="h-4 w-4 mr-1" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="family" className="text-xs">
                Family
              </TabsTrigger>
              <TabsTrigger value="address" className="text-xs">
                <Home className="h-4 w-4 mr-1" />
                Address
              </TabsTrigger>
              <TabsTrigger value="academic" className="text-xs">
                <BookOpen className="h-4 w-4 mr-1" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="course" className="text-xs">
                <GraduationCap className="h-4 w-4 mr-1" />
                Course
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">
                <Upload className="h-4 w-4 mr-1" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="hostel" className="text-xs">
                <Building2 className="h-4 w-4 mr-1" />
                Hostel
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs">
                <CreditCard className="h-4 w-4 mr-1" />
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Enter your personal details as per your official documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per marksheet) *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your complete name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange('bloodGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="EWS">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Input
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      placeholder="Enter religion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter nationality"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                    <Input
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={12}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email ID *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternateMobile">Alternate Contact Number</Label>
                    <Input
                      id="alternateMobile"
                      name="alternateMobile"
                      type="tel"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                      placeholder="Enter alternate number"
                      maxLength={10}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end mt-4">
                <Button type="button" onClick={() => setActiveTab('family')}>
                  Next: Family Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="family">
              <Card>
                <CardHeader>
                  <CardTitle>Family Details</CardTitle>
                  <CardDescription>
                    Enter your parent and guardian information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter father's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherOccupation">Father's Occupation *</Label>
                    <Input
                      id="fatherOccupation"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Business, Government Employee"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherMobile">Father's Mobile Number *</Label>
                    <Input
                      id="fatherMobile"
                      name="fatherMobile"
                      type="tel"
                      value={formData.fatherMobile}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name *</Label>
                    <Input
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter mother's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                    <Input
                      id="motherOccupation"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      placeholder="e.g., Homemaker, Teacher"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Guardian Name (if applicable)</Label>
                    <Input
                      id="guardianName"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      placeholder="Enter guardian name"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="annualIncome">Family Annual Income (₹) *</Label>
                    <Input
                      id="annualIncome"
                      name="annualIncome"
                      type="number"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter annual income in rupees"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('personal')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('address')}>
                  Next: Address Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Address Details
                  </CardTitle>
                  <CardDescription>
                    Provide your permanent and current address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddress">Permanent Address *</Label>
                    <Textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter full permanent address"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={sameAsPermament}>
                      Copy from Permanent Address
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAddress">Current / Correspondence Address *</Label>
                    <Textarea
                      id="currentAddress"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter current address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter district"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinCode">PIN Code *</Label>
                      <Input
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 6-digit PIN code"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('family')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('academic')}>
                  Next: Academic Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Academic Details
                  </CardTitle>
                  <CardDescription>
                    Enter your 10th, 12th and entrance exam details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Class 10th Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tenthSchool">School Name *</Label>
                        <Input
                          id="tenthSchool"
                          name="tenthSchool"
                          value={formData.tenthSchool}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter school name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenthBoard">Board Name *</Label>
                        <Select value={formData.tenthBoard} onValueChange={(value) => handleSelectChange('tenthBoard', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CBSE">CBSE</SelectItem>
                            <SelectItem value="ICSE">ICSE</SelectItem>
                            <SelectItem value="State Board">State Board</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenthYear">Passing Year *</Label>
                        <Input
                          id="tenthYear"
                          name="tenthYear"
                          type="number"
                          value={formData.tenthYear}
                          onChange={handleInputChange}
                          required
                          placeholder="YYYY"
                          min="1990"
                          max="2030"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenthRoll">Roll Number *</Label>
                        <Input
                          id="tenthRoll"
                          name="tenthRoll"
                          value={formData.tenthRoll}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter roll number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenthPercentage">Percentage / CGPA *</Label>
                        <Input
                          id="tenthPercentage"
                          name="tenthPercentage"
                          type="number"
                          step="0.01"
                          value={formData.tenthPercentage}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter percentage or CGPA"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Class 12th Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="twelfthSchool">School Name *</Label>
                        <Input
                          id="twelfthSchool"
                          name="twelfthSchool"
                          value={formData.twelfthSchool}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter school name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twelfthBoard">Board Name *</Label>
                        <Select value={formData.twelfthBoard} onValueChange={(value) => handleSelectChange('twelfthBoard', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CBSE">CBSE</SelectItem>
                            <SelectItem value="ICSE">ICSE</SelectItem>
                            <SelectItem value="State Board">State Board</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twelfthYear">Passing Year *</Label>
                        <Input
                          id="twelfthYear"
                          name="twelfthYear"
                          type="number"
                          value={formData.twelfthYear}
                          onChange={handleInputChange}
                          required
                          placeholder="YYYY"
                          min="1990"
                          max="2030"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twelfthRoll">Roll Number *</Label>
                        <Input
                          id="twelfthRoll"
                          name="twelfthRoll"
                          value={formData.twelfthRoll}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter roll number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twelfthPercentage">Percentage / CGPA *</Label>
                        <Input
                          id="twelfthPercentage"
                          name="twelfthPercentage"
                          type="number"
                          step="0.01"
                          value={formData.twelfthPercentage}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter percentage or CGPA"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Entrance Exam Details (if applicable)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="entranceExam">Exam Name</Label>
                        <Input
                          id="entranceExam"
                          name="entranceExam"
                          value={formData.entranceExam}
                          onChange={handleInputChange}
                          placeholder="e.g., JEE, CUET, NEET"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entranceRoll">Roll Number</Label>
                        <Input
                          id="entranceRoll"
                          name="entranceRoll"
                          value={formData.entranceRoll}
                          onChange={handleInputChange}
                          placeholder="Enter roll number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entranceRank">Rank</Label>
                        <Input
                          id="entranceRank"
                          name="entranceRank"
                          value={formData.entranceRank}
                          onChange={handleInputChange}
                          placeholder="Enter rank"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entranceScore">Score</Label>
                        <Input
                          id="entranceScore"
                          name="entranceScore"
                          value={formData.entranceScore}
                          onChange={handleInputChange}
                          placeholder="Enter score"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('address')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('course')}>
                  Next: Course Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="course">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Course & Admission Details
                  </CardTitle>
                  <CardDescription>
                    Select your course and provide admission information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course / Program Name *</Label>
                    <Select value={formData.courseName} onValueChange={(value) => handleSelectChange('courseName', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B.Tech">B.Tech</SelectItem>
                        <SelectItem value="B.Sc">B.Sc</SelectItem>
                        <SelectItem value="BBA">BBA</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                        <SelectItem value="B.Com">B.Com</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch / Specialization *</Label>
                    <Input
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Computer Science, Mechanical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionCategory">Admission Category *</Label>
                    <Select value={formData.admissionCategory} onValueChange={(value) => handleSelectChange('admissionCategory', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Merit">Merit</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Quota">Quota</SelectItem>
                        <SelectItem value="Reserved">Reserved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year / Session *</Label>
                    <Input
                      id="academicYear"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2025-2029"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date *</Label>
                    <Input
                      id="admissionDate"
                      name="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('academic')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('documents')}>
                  Next: Documents
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Document Upload
                  </CardTitle>
                  <CardDescription>
                    Upload required documents (PDF or Image format)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'photo', label: 'Passport Size Photo *', required: true },
                      { id: 'signature', label: 'Digital Signature *', required: true },
                      { id: 'tenth', label: '10th Marksheet *', required: true },
                      { id: 'twelfth', label: '12th Marksheet *', required: true },
                      { id: 'tc', label: 'Transfer Certificate', required: false },
                      { id: 'migration', label: 'Migration Certificate', required: false },
                      { id: 'character', label: 'Character Certificate', required: false },
                      { id: 'caste', label: 'Caste Certificate (if applicable)', required: false },
                      { id: 'income', label: 'Income Certificate', required: false },
                      { id: 'domicile', label: 'Domicile Certificate', required: false },
                      { id: 'entrance', label: 'Entrance Exam Score Card', required: false },
                      { id: 'aadhaar', label: 'Aadhaar Card', required: false },
                    ].map((doc) => (
                      <div key={doc.id} className="space-y-2">
                        <Label htmlFor={doc.id}>{doc.label}</Label>
                        <Input
                          id={doc.id}
                          name={doc.id}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required={doc.required}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Please ensure all documents are clear and readable. 
                      Maximum file size: 2MB per document. Accepted formats: PDF, JPG, PNG
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('course')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('hostel')}>
                  Next: Hostel/Transport
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="hostel">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Hostel & Transport Details
                  </CardTitle>
                  <CardDescription>
                    Select if you require hostel or transport facilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="requireHostel">Require Hostel Accommodation?</Label>
                      <Select value={formData.requireHostel} onValueChange={(value) => handleSelectChange('requireHostel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requireTransport">Require College Transport?</Label>
                      <Select value={formData.requireTransport} onValueChange={(value) => handleSelectChange('requireTransport', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.requireHostel === 'yes' && (
                    <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Hostel Student Details</h4>
                      <div className="space-y-2">
                        <Label htmlFor="localGuardianName">Local Guardian Name</Label>
                        <Input
                          id="localGuardianName"
                          name="localGuardianName"
                          value={formData.localGuardianName}
                          onChange={handleInputChange}
                          placeholder="Enter local guardian name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="localGuardianAddress">Local Guardian Address</Label>
                        <Textarea
                          id="localGuardianAddress"
                          name="localGuardianAddress"
                          value={formData.localGuardianAddress}
                          onChange={handleInputChange}
                          placeholder="Enter local guardian address"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="medicalCondition">Medical Condition / Allergy (if any)</Label>
                    <Textarea
                      id="medicalCondition"
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      placeholder="Mention any medical conditions or allergies"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('documents')}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab('payment')}>
                  Next: Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Fee Payment Details
                  </CardTitle>
                  <CardDescription>
                    Enter payment information for admission fees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="feeType">Fee Type</Label>
                      <Select value={formData.feeType} onValueChange={(value) => handleSelectChange('feeType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admission Fee">Admission Fee</SelectItem>
                          <SelectItem value="Registration Fee">Registration Fee</SelectItem>
                          <SelectItem value="Complete Fee">Complete Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentMode">Payment Mode</Label>
                      <Select value={formData.paymentMode} onValueChange={(value) => handleSelectChange('paymentMode', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="DD">Demand Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID / Receipt No</Label>
                      <Input
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter transaction ID or receipt number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentDate">Payment Date</Label>
                      <Input
                        id="paymentDate"
                        name="paymentDate"
                        type="date"
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Payment can be submitted later</h4>
                    <p className="text-sm text-green-700">
                      You can submit the registration form now and complete payment details later. 
                      However, your registration will be processed only after payment verification.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab('hostel')}>
                  Previous
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Registration
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </main>
    </div>
  );
};

export default StudentRegistration;
