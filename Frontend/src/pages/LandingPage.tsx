import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Users,
  UserCheck,
  Crown,
  Calculator,
  FileText,
  Shield,
  Moon,
  Sun
} from 'lucide-react';
import type { UserRole } from '@/types/index';
import { useTheme } from '@/components/theme-provider';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  role: UserRole;
  onSelect: (role: UserRole) => void;
  color: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, role, onSelect, color }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
      <CardHeader className="text-center pb-4">
        <div className={`mx-auto mb-4 p-4 rounded-full ${color} w-fit group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={() => onSelect(role)}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
          variant="outline"
        >
          View Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

const LandingPage: React.FC<{ onRoleSelect: (role: UserRole) => void }> = ({ onRoleSelect }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleRoleSelect = (role: UserRole) => {
    onRoleSelect(role);
    const routeMap = {
      student: '/student',
      faculty: '/faculty',
      hod: '/hod',
      dean: '/dean',
      accountant: '/accountant',
      registrar: '/registrar',
      director: '/director',
    };
    navigate(routeMap[role]);
  };

  const roles = [
    {
      title: 'Student',
      description: 'View academic records, fees, attendance, and results',
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      role: 'student' as UserRole,
      color: 'bg-blue-500',
    },
    {
      title: 'Faculty',
      description: 'Manage classes, attendance, and student performance',
      icon: <Users className="h-8 w-8 text-white" />,
      role: 'faculty' as UserRole,
      color: 'bg-green-500',
    },
    {
      title: 'HOD',
      description: 'Department overview, approvals, and faculty management',
      icon: <UserCheck className="h-8 w-8 text-white" />,
      role: 'hod' as UserRole,
      color: 'bg-purple-500',
    },
    {
      title: 'Dean',
      description: 'College-wide analytics and strategic oversight',
      icon: <Crown className="h-8 w-8 text-white" />,
      role: 'dean' as UserRole,
      color: 'bg-orange-500',
    },
    {
      title: 'Accountant',
      description: 'Fee collection, payments, and financial reports',
      icon: <Calculator className="h-8 w-8 text-white" />,
      role: 'accountant' as UserRole,
      color: 'bg-emerald-500',
    },
    {
      title: 'Registrar',
      description: 'Admissions, exams, and academic records',
      icon: <FileText className="h-8 w-8 text-white" />,
      role: 'registrar' as UserRole,
      color: 'bg-indigo-500',
    },
    {
      title: 'Director',
      description: 'Institutional analytics and strategic leadership',
      icon: <Shield className="h-8 w-8 text-white" />,
      role: 'director' as UserRole,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">
              College ERP
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="hidden sm:inline-flex">
              Enterprise Resource Planning
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your role to access the appropriate dashboard with role-specific features and information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roles.map((role) => (
            <RoleCard
              key={role.role}
              title={role.title}
              description={role.description}
              icon={role.icon}
              role={role.role}
              onSelect={handleRoleSelect}
              color={role.color}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            System Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">
                Role-Based Access
              </h4>
              <p className="text-gray-600">
                Each user role has access to specific features and information relevant to their responsibilities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">
                Real-Time Data
              </h4>
              <p className="text-gray-600">
                Live updates and real-time information across all dashboards for better decision making.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">
                Professional Design
              </h4>
              <p className="text-gray-600">
                Clean, modern interface designed for enterprise use with dark/light theme support.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            © 2025 College ERP System. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
