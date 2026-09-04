import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AppShell from '@/components/AppShell';
import Dashboard from '@/pages/Dashboard';
import Companies from '@/pages/Companies';
import Branches from '@/pages/Branches';
import Departments from '@/pages/Departments';
import Teams from '@/pages/Teams';
import Designations from '@/pages/Designations';
import JobGrades from '@/pages/JobGrades';
import Employees from '@/pages/Employees';
import Users from '@/pages/Users';
import Roles from '@/pages/Roles';
import Settings from '@/pages/Settings';
import LoginLogs from '@/pages/LoginLogs';
import ActivityLogs from '@/pages/ActivityLogs';
import AuditLogs from '@/pages/AuditLogs';
import EmployeeDocuments from '@/pages/EmployeeDocuments';
import LifecycleHistory from '@/pages/LifecycleHistory';
import CheckInOut from '@/pages/CheckInOut';
import MyProfile from '@/pages/MyProfile';
import GlobalSearch from '@/pages/GlobalSearch';
import Reports from '@/pages/Reports';
import Notifications from '@/pages/Notifications';
import AttendancePage from '@/pages/AttendancePage';
import AttendanceCorrections from '@/pages/AttendanceCorrections';
import Shifts from '@/pages/Shifts';
import Holidays from '@/pages/Holidays';
import AttendancePolicies from '@/pages/AttendancePolicies';
import LeaveTypes from '@/pages/LeaveTypes';
import LeavePolicies from '@/pages/LeavePolicies';
import LeaveBalances from '@/pages/LeaveBalances';
import LeaveRequests from '@/pages/LeaveRequests';
import SalaryComponents from '@/pages/SalaryComponents';
import SalaryStructures from '@/pages/SalaryStructures';
import PayrollProfiles from '@/pages/PayrollProfiles';
import PayrollPeriods from '@/pages/PayrollPeriods';
import PayrollRuns from '@/pages/PayrollRuns';
import Payslips from '@/pages/Payslips';
import Loans from '@/pages/Loans';
import SalaryAdvances from '@/pages/SalaryAdvances';
import ExpenseCategories from '@/pages/ExpenseCategories';
import ExpenseClaims from '@/pages/ExpenseClaims';
import BenefitPlans from '@/pages/BenefitPlans';
import Dependents from '@/pages/Dependents';
import BenefitEnrollments from '@/pages/BenefitEnrollments';
import BenefitClaims from '@/pages/BenefitClaims';
import Timesheets from '@/pages/Timesheets';
import Clients from '@/pages/Clients';
import Projects from '@/pages/Projects';
import ProjectMembers from '@/pages/ProjectMembers';
import JobRequisitions from '@/pages/JobRequisitions';
import JobPosts from '@/pages/JobPosts';
import Candidates from '@/pages/Candidates';
import Applications from '@/pages/Applications';
import ReviewCycles from '@/pages/ReviewCycles';
import Goals from '@/pages/Goals';
import PerformanceReviews from '@/pages/PerformanceReviews';
import Feedback from '@/pages/Feedback';
import PIPs from '@/pages/PIPs';
import TrainingCategories from '@/pages/TrainingCategories';
import TrainingProviders from '@/pages/TrainingProviders';
import Courses from '@/pages/Courses';
import TrainingSessions from '@/pages/TrainingSessions';
import TrainingRequests from '@/pages/TrainingRequests';
import Enrollments from '@/pages/Enrollments';
import AssetCategories from '@/pages/AssetCategories';
import Vendors from '@/pages/Vendors';
import Assets from '@/pages/Assets';
import AssetRequests from '@/pages/AssetRequests';
import OnboardingTemplates from '@/pages/OnboardingTemplates';
import OnboardingTasks from '@/pages/OnboardingTasks';
import OffboardingRequests from '@/pages/OffboardingRequests';
import StatutoryConfigs from '@/pages/StatutoryConfigs';
import TaxDeclarations from '@/pages/TaxDeclarations';
import PayrollAdjustments from '@/pages/PayrollAdjustments';
import HRCalendar from '@/pages/HRCalendar';
import OrgChart from '@/pages/OrgChart';
import DocumentCenter from '@/pages/DocumentCenter';
import Announcements from '@/pages/Announcements';
import Kudos from '@/pages/Kudos';
import PulseSurveys from '@/pages/PulseSurveys';
import Suggestions from '@/pages/Suggestions';
import Polls from '@/pages/Polls';
import KnowledgeCategories from '@/pages/KnowledgeCategories';
import KnowledgeArticles from '@/pages/KnowledgeArticles';
import Meetings from '@/pages/Meetings';
import MeetingActionItems from '@/pages/MeetingActionItems';
import HelpdeskCategories from '@/pages/HelpdeskCategories';
import HelpdeskTickets from '@/pages/HelpdeskTickets';
import HelpdeskComments from '@/pages/HelpdeskComments';
import Policies from '@/pages/Policies';
import LetterTemplates from '@/pages/LetterTemplates';
import LetterGenerator from '@/pages/LetterGenerator';
import LetterRequests from '@/pages/LetterRequests';
import ReportsHub from '@/pages/ReportsHub';
import ExecutiveDashboards from '@/pages/ExecutiveDashboards';
import BranchAnalytics from '@/pages/BranchAnalytics';
import ImportEmployees from '@/pages/ImportEmployees';
import NotificationPreferences from '@/pages/NotificationPreferences';
import PayrollReports from '@/pages/PayrollReports';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/company" element={<Companies />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/designations" element={<Designations />} />
          <Route path="/job-grades" element={<JobGrades />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login-logs" element={<LoginLogs />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/documents" element={<EmployeeDocuments />} />
          <Route path="/lifecycle" element={<LifecycleHistory />} />
          <Route path="/check-in" element={<CheckInOut />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/search" element={<GlobalSearch />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/attendance-corrections" element={<AttendanceCorrections />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/attendance-policies" element={<AttendancePolicies />} />
          <Route path="/leave-types" element={<LeaveTypes />} />
          <Route path="/leave-policies" element={<LeavePolicies />} />
          <Route path="/leave-balances" element={<LeaveBalances />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/salary-components" element={<SalaryComponents />} />
          <Route path="/salary-structures" element={<SalaryStructures />} />
          <Route path="/payroll-profiles" element={<PayrollProfiles />} />
          <Route path="/payroll-periods" element={<PayrollPeriods />} />
          <Route path="/payroll-runs" element={<PayrollRuns />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/salary-advances" element={<SalaryAdvances />} />
          <Route path="/expense-categories" element={<ExpenseCategories />} />
          <Route path="/expense-claims" element={<ExpenseClaims />} />
          <Route path="/benefit-plans" element={<BenefitPlans />} />
          <Route path="/dependents" element={<Dependents />} />
          <Route path="/benefit-enrollments" element={<BenefitEnrollments />} />
          <Route path="/benefit-claims" element={<BenefitClaims />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-members" element={<ProjectMembers />} />
          <Route path="/job-requisitions" element={<JobRequisitions />} />
          <Route path="/job-posts" element={<JobPosts />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/review-cycles" element={<ReviewCycles />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/performance-reviews" element={<PerformanceReviews />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/pips" element={<PIPs />} />
          <Route path="/training-categories" element={<TrainingCategories />} />
          <Route path="/training-providers" element={<TrainingProviders />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/training-sessions" element={<TrainingSessions />} />
          <Route path="/training-requests" element={<TrainingRequests />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="/asset-categories" element={<AssetCategories />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/asset-requests" element={<AssetRequests />} />
          <Route path="/onboarding-templates" element={<OnboardingTemplates />} />
          <Route path="/onboarding" element={<OnboardingTasks />} />
          <Route path="/offboarding" element={<OffboardingRequests />} />
          <Route path="/org-chart" element={<OrgChart />} />
          <Route path="/statutory-config" element={<StatutoryConfigs />} />
          <Route path="/tax-declarations" element={<TaxDeclarations />} />
          <Route path="/payroll-adjustments" element={<PayrollAdjustments />} />
          <Route path="/hr-calendar" element={<HRCalendar />} />
          <Route path="/document-center" element={<DocumentCenter />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/kudos" element={<Kudos />} />
          <Route path="/pulse-surveys" element={<PulseSurveys />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/knowledge-categories" element={<KnowledgeCategories />} />
          <Route path="/knowledge-articles" element={<KnowledgeArticles />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/meeting-action-items" element={<MeetingActionItems />} />
          <Route path="/helpdesk-categories" element={<HelpdeskCategories />} />
          <Route path="/helpdesk-tickets" element={<HelpdeskTickets />} />
          <Route path="/helpdesk-comments" element={<HelpdeskComments />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/letter-templates" element={<LetterTemplates />} />
          <Route path="/letter-generator" element={<LetterGenerator />} />
          <Route path="/letter-requests" element={<LetterRequests />} />
          <Route path="/reports-hub" element={<ReportsHub />} />
          <Route path="/executive-dashboards" element={<ExecutiveDashboards />} />
          <Route path="/branch-analytics" element={<BranchAnalytics />} />
          <Route path="/import-employees" element={<ImportEmployees />} />
          <Route path="/notification-preferences" element={<NotificationPreferences />} />
          <Route path="/payroll-reports" element={<PayrollReports />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App