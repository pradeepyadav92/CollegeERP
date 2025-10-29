// Mock data for College ERP System

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  cgpa: number;
  attendancePercentage: number;
  phone: string;
  address: string;
  dateOfBirth: string;
  bloodGroup: string;
  profileImage?: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  subjects: string[];
  phone: string;
  experience: number;
  qualification: string;
  profileImage?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  type: 'tuition' | 'hostel' | 'library' | 'exam' | 'lab';
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  paymentMethod?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  period?: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  category: 'academic' | 'administrative' | 'event' | 'general';
  createdDate: string;
  expiryDate?: string;
  targetAudience: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  facultyId: string;
  department: string;
}

export interface ClassSchedule {
  id: string;
  subjectId: string;
  facultyId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  room: string;
  batch?: string;
}

export interface LeaveApplication {
  id: string;
  applicantId: string;
  applicantType: 'student' | 'faculty';
  leaveType: 'sick' | 'casual' | 'emergency' | 'maternity' | 'study';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  subjectId: string;
  examType: 'midterm' | 'final' | 'practical' | 'assignment';
  marks: number;
  maxMarks: number;
  grade: string;
  percentage: number;
  date: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hodId: string;
  totalStudents: number;
  totalFaculty: number;
  establishedYear: number;
  description: string;
}

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@student.university.edu',
    rollNumber: 'CS2023001',
    department: 'Computer Science',
    semester: 6,
    cgpa: 8.7,
    attendancePercentage: 94,
    phone: '+91-9876543210',
    address: '123 Student Hostel, University Campus',
    dateOfBirth: '2001-05-15',
    bloodGroup: 'O+'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@student.university.edu',
    rollNumber: 'CS2023002',
    department: 'Computer Science',
    semester: 6,
    cgpa: 9.2,
    attendancePercentage: 98,
    phone: '+91-9876543211',
    address: '124 Student Hostel, University Campus',
    dateOfBirth: '2001-03-22',
    bloodGroup: 'A+'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@student.university.edu',
    rollNumber: 'ME2023001',
    department: 'Mechanical Engineering',
    semester: 4,
    cgpa: 7.8,
    attendancePercentage: 87,
    phone: '+91-9876543212',
    address: '125 Student Hostel, University Campus',
    dateOfBirth: '2002-01-10',
    bloodGroup: 'B+'
  }
];

// Mock Faculty Data
export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    employeeId: 'FAC001',
    department: 'Computer Science',
    designation: 'Professor',
    subjects: ['Data Structures', 'Algorithms', 'Machine Learning'],
    phone: '+91-9876543001',
    experience: 12,
    qualification: 'PhD Computer Science'
  },
  {
    id: '2',
    name: 'Prof. Robert Brown',
    email: 'robert.brown@university.edu',
    employeeId: 'FAC002',
    department: 'Computer Science',
    designation: 'Associate Professor',
    subjects: ['Database Systems', 'Software Engineering', 'Web Development'],
    phone: '+91-9876543002',
    experience: 8,
    qualification: 'MTech Computer Science'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@university.edu',
    employeeId: 'FAC003',
    department: 'Mechanical Engineering',
    designation: 'Assistant Professor',
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'CAD/CAM'],
    phone: '+91-9876543003',
    experience: 6,
    qualification: 'PhD Mechanical Engineering'
  }
];

// Mock Fee Records
export const mockFeeRecords: FeeRecord[] = [
  {
    id: '1',
    studentId: '1',
    type: 'tuition',
    amount: 45000,
    dueDate: '2025-01-31',
    status: 'paid',
    paidDate: '2025-01-15',
    paymentMethod: 'Online'
  },
  {
    id: '2',
    studentId: '1',
    type: 'hostel',
    amount: 12500,
    dueDate: '2025-02-15',
    status: 'pending'
  },
  {
    id: '3',
    studentId: '1',
    type: 'library',
    amount: 500,
    dueDate: '2025-01-20',
    status: 'overdue'
  },
  {
    id: '4',
    studentId: '2',
    type: 'tuition',
    amount: 45000,
    dueDate: '2025-01-31',
    status: 'paid',
    paidDate: '2025-01-10',
    paymentMethod: 'Bank Transfer'
  }
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Data Structures',
    date: '2025-01-15',
    status: 'present',
    period: 1
  },
  {
    id: '2',
    studentId: '1',
    subject: 'Algorithms',
    date: '2025-01-15',
    status: 'present',
    period: 2
  },
  {
    id: '3',
    studentId: '1',
    subject: 'Machine Learning',
    date: '2025-01-15',
    status: 'absent',
    period: 3
  },
  {
    id: '4',
    studentId: '2',
    subject: 'Data Structures',
    date: '2025-01-15',
    status: 'present',
    period: 1
  }
];

// Mock Notices
export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    content: 'The mid-term examination schedule for the current semester has been released. Students are advised to check the examination portal for detailed timetables.',
    priority: 'high',
    category: 'academic',
    createdDate: '2025-01-15',
    expiryDate: '2025-02-15',
    targetAudience: ['students']
  },
  {
    id: '2',
    title: 'Fee Payment Reminder',
    content: 'This is a reminder that the last date for fee payment for the current semester is approaching. Please ensure all dues are cleared before the deadline.',
    priority: 'medium',
    category: 'administrative',
    createdDate: '2025-01-14',
    targetAudience: ['students']
  },
  {
    id: '3',
    title: 'Campus Placement Drive',
    content: 'Leading tech companies will be conducting placement drives next month. Eligible students are encouraged to register on the placement portal.',
    priority: 'low',
    category: 'event',
    createdDate: '2025-01-13',
    targetAudience: ['students']
  },
  {
    id: '4',
    title: 'Faculty Meeting Schedule',
    content: 'Monthly faculty meeting has been scheduled for next Friday. All faculty members are required to attend.',
    priority: 'medium',
    category: 'administrative',
    createdDate: '2025-01-12',
    targetAudience: ['faculty', 'hod']
  }
];

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures',
    credits: 4,
    semester: 3,
    facultyId: '1',
    department: 'Computer Science'
  },
  {
    id: '2',
    code: 'CS302',
    name: 'Algorithms',
    credits: 4,
    semester: 3,
    facultyId: '1',
    department: 'Computer Science'
  },
  {
    id: '3',
    code: 'CS401',
    name: 'Machine Learning',
    credits: 3,
    semester: 4,
    facultyId: '1',
    department: 'Computer Science'
  },
  {
    id: '4',
    code: 'CS303',
    name: 'Database Systems',
    credits: 3,
    semester: 3,
    facultyId: '2',
    department: 'Computer Science'
  }
];

// Mock Class Schedule
export const mockClassSchedule: ClassSchedule[] = [
  {
    id: '1',
    subjectId: '1',
    facultyId: '1',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '10:30',
    room: 'CS101'
  },
  {
    id: '2',
    subjectId: '2',
    facultyId: '1',
    dayOfWeek: 1, // Monday
    startTime: '11:00',
    endTime: '12:30',
    room: 'CS102'
  },
  {
    id: '3',
    subjectId: '3',
    facultyId: '1',
    dayOfWeek: 2, // Tuesday
    startTime: '14:00',
    endTime: '15:30',
    room: 'CS201'
  }
];

// Mock Leave Applications
export const mockLeaveApplications: LeaveApplication[] = [
  {
    id: '1',
    applicantId: '1',
    applicantType: 'student',
    leaveType: 'sick',
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    reason: 'High fever and medical treatment required',
    status: 'approved',
    appliedDate: '2025-01-19',
    approvedBy: '2',
    approvedDate: '2025-01-19',
    comments: 'Approved with medical certificate'
  },
  {
    id: '2',
    applicantId: '1',
    applicantType: 'faculty',
    leaveType: 'casual',
    startDate: '2025-02-01',
    endDate: '2025-02-03',
    reason: 'Family function',
    status: 'pending',
    appliedDate: '2025-01-16'
  }
];

// Mock Exam Results
export const mockExamResults: ExamResult[] = [
  {
    id: '1',
    studentId: '1',
    subjectId: '1',
    examType: 'midterm',
    marks: 78,
    maxMarks: 100,
    grade: 'A',
    percentage: 78,
    date: '2025-01-10'
  },
  {
    id: '2',
    studentId: '1',
    subjectId: '2',
    examType: 'midterm',
    marks: 85,
    maxMarks: 100,
    grade: 'A+',
    percentage: 85,
    date: '2025-01-12'
  },
  {
    id: '3',
    studentId: '2',
    subjectId: '1',
    examType: 'midterm',
    marks: 92,
    maxMarks: 100,
    grade: 'A+',
    percentage: 92,
    date: '2025-01-10'
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    hodId: '1',
    totalStudents: 180,
    totalFaculty: 15,
    establishedYear: 2010,
    description: 'Department of Computer Science and Engineering'
  },
  {
    id: '2',
    name: 'Mechanical Engineering',
    code: 'ME',
    hodId: '3',
    totalStudents: 120,
    totalFaculty: 12,
    establishedYear: 2008,
    description: 'Department of Mechanical Engineering'
  }
];

// Helper functions for data filtering
export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find(student => student.id === id);
};

export const getFacultyById = (id: string): Faculty | undefined => {
  return mockFaculty.find(faculty => faculty.id === id);
};

export const getStudentFeeRecords = (studentId: string): FeeRecord[] => {
  return mockFeeRecords.filter(record => record.studentId === studentId);
};

export const getStudentAttendanceRecords = (studentId: string): AttendanceRecord[] => {
  return mockAttendanceRecords.filter(record => record.studentId === studentId);
};

export const getNoticesByAudience = (audience: string): Notice[] => {
  return mockNotices.filter(notice =>
    notice.targetAudience.includes(audience) &&
    (!notice.expiryDate || new Date(notice.expiryDate) > new Date())
  );
};

export const getFacultySchedule = (facultyId: string): ClassSchedule[] => {
  return mockClassSchedule.filter(schedule => schedule.facultyId === facultyId);
};

export const getPendingLeaveApplications = (): LeaveApplication[] => {
  return mockLeaveApplications.filter(app => app.status === 'pending');
};

export const getDepartmentStudents = (departmentId: string): Student[] => {
  return mockStudents.filter(student => {
    const dept = mockDepartments.find(d => d.id === departmentId);
    return dept && student.department === dept.name;
  });
};

export const getDepartmentFaculty = (departmentId: string): Faculty[] => {
  return mockFaculty.filter(faculty => {
    const dept = mockDepartments.find(d => d.id === departmentId);
    return dept && faculty.department === dept.name;
  });
};

// Financial summary data
export const getFinancialSummary = () => {
  const totalFees = mockFeeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidFees = mockFeeRecords
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);
  const pendingFees = mockFeeRecords
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);
  const overdueFees = mockFeeRecords
    .filter(record => record.status === 'overdue')
    .reduce((sum, record) => sum + record.amount, 0);

  return {
    totalFees,
    paidFees,
    pendingFees,
    overdueFees,
    collectionRate: (paidFees / totalFees) * 100
  };
};

// Attendance summary data
export const getAttendanceSummary = () => {
  const totalRecords = mockAttendanceRecords.length;
  const presentRecords = mockAttendanceRecords.filter(record => record.status === 'present').length;
  const absentRecords = mockAttendanceRecords.filter(record => record.status === 'absent').length;

  return {
    totalRecords,
    presentRecords,
    absentRecords,
    attendanceRate: (presentRecords / totalRecords) * 100
  };
};

// Academic performance data
export const getAcademicPerformance = () => {
  const totalResults = mockExamResults.length;
  const avgMarks = mockExamResults.reduce((sum, result) => sum + result.percentage, 0) / totalResults;
  const gradeDistribution = mockExamResults.reduce((acc, result) => {
    acc[result.grade] = (acc[result.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalResults,
    avgMarks,
    gradeDistribution,
    passRate: (mockExamResults.filter(result => result.grade !== 'F').length / totalResults) * 100
  };
};
