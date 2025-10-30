import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import LandingPage from '@/pages/LandingPage';
import StudentRegistration from '@/pages/StudentRegistration';
import StudentDashboard from '@/pages/dashboards/StudentDashboard';
import FacultyDashboard from '@/pages/dashboards/FacultyDashboard';
import HODDashboard from '@/pages/dashboards/HODDashboard';
import DeanDashboard from '@/pages/dashboards/DeanDashboard';
import AccountantDashboard from '@/pages/dashboards/AccountantDashboard';
import RegistrarDashboard from '@/pages/dashboards/RegistrarDashboard';
import DirectorDashboard from '@/pages/dashboards/DirectorDashboard';
import type { UserRole } from '@/types/index';

function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="college-erp-theme">
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route
              path="/"
              element={<LandingPage onRoleSelect={handleRoleSelect} />}
            />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/hod" element={<HODDashboard />} />
            <Route path="/dean" element={<DeanDashboard />} />
            <Route path="/accountant" element={<AccountantDashboard />} />
            <Route path="/registrar" element={<RegistrarDashboard />} />
            <Route path="/director" element={<DirectorDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
