// User roles and types
export type UserRole = 'student' | 'faculty' | 'hod' | 'dean' | 'accountant' | 'registrar' | 'director';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

// Common status types
export type StatusType = 'paid' | 'pending' | 'overdue' | 'approved' | 'rejected' | 'verified' | 'draft';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Student Registration Types
export interface StudentRegistration {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedDate?: string;
  rollNumber?: string;
  
  // Personal Information
  personalInfo: {
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    bloodGroup?: string;
    category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
    religion?: string;
    nationality: string;
    aadhaarNumber: string;
    email: string;
    mobile: string;
    alternateMobile?: string;
  };
  
  // Family Details
  familyDetails: {
    fatherName: string;
    fatherOccupation: string;
    fatherMobile: string;
    motherName: string;
    motherOccupation?: string;
    guardianName?: string;
    annualIncome: string;
  };
  
  // Address Details
  addressDetails: {
    permanentAddress: string;
    currentAddress: string;
    state: string;
    district: string;
    pinCode: string;
  };
  
  // Academic Details
  academicDetails: {
    tenth: {
      schoolName: string;
      boardName: string;
      passingYear: string;
      rollNumber: string;
      percentage: string;
    };
    twelfth: {
      schoolName: string;
      boardName: string;
      passingYear: string;
      rollNumber: string;
      percentage: string;
    };
    entranceExam?: {
      examName: string;
      rollNumber: string;
      rank?: string;
      score: string;
    };
  };
  
  // Course & Admission Details
  courseDetails: {
    courseName: string;
    branch: string;
    admissionCategory: 'Merit' | 'Management' | 'Quota' | 'Reserved';
    academicYear: string;
    admissionDate: string;
  };
  
  // Documents
  documents: {
    photo?: string;
    signature?: string;
    tenthMarksheet?: string;
    twelfthMarksheet?: string;
    transferCertificate?: string;
    migrationCertificate?: string;
    characterCertificate?: string;
    casteCertificate?: string;
    incomeCertificate?: string;
    domicileCertificate?: string;
    entranceScoreCard?: string;
    aadhaarCard?: string;
  };
  
  // Hostel & Transport
  hostelTransport?: {
    requireHostel: boolean;
    requireTransport: boolean;
    localGuardianName?: string;
    localGuardianAddress?: string;
    medicalCondition?: string;
  };
  
  // Fee Payment
  feePayment?: {
    feeType: string;
    transactionId: string;
    paymentMode: 'Online' | 'Cash' | 'DD';
    paymentDate: string;
  };
}
