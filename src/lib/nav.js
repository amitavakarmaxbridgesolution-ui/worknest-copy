export const navItems = [
  {
    section: null,
    items: [
      { label: "Dashboard", path: "/", icon: "LayoutDashboard", roles: ["admin", "user"] },
      { label: "Reports Hub", path: "/reports-hub", icon: "BarChart3", roles: ["admin", "user"] },
      { label: "Executive Dashboards", path: "/executive-dashboards", icon: "BarChart3", roles: ["admin"] },
      { label: "Branch Analytics", path: "/branch-analytics", icon: "BarChart3", roles: ["admin"] },
      { label: "Global Search", path: "/search", icon: "Search", roles: ["admin", "user"] },
      { label: "HR Calendar", path: "/hr-calendar", icon: "CalendarDays", roles: ["admin", "user"] },
      { label: "Check In / Out", path: "/check-in", icon: "Clock", roles: ["admin", "user"] },
      { label: "Notifications", path: "/notifications", icon: "Bell", roles: ["admin", "user"] },
    ],
  },
  {
    section: "People",
    items: [
      { label: "Employees", path: "/employees", icon: "UserSquare", roles: ["admin", "user"] },
      { label: "Org Chart", path: "/org-chart", icon: "Network", roles: ["admin", "user"] },
      { label: "Documents", path: "/documents", icon: "FileText", roles: ["admin", "user"] },
      { label: "Lifecycle History", path: "/lifecycle", icon: "History", roles: ["admin"] },
      { label: "Onboarding", path: "/onboarding", icon: "UserPlus", roles: ["admin", "user"] },
      { label: "Offboarding", path: "/offboarding", icon: "LogOut", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Attendance",
    items: [
      { label: "Attendance", path: "/attendance", icon: "CalendarCheck", roles: ["admin", "user"] },
      { label: "Corrections", path: "/attendance-corrections", icon: "Clock3", roles: ["admin", "user"] },
      { label: "Shifts", path: "/shifts", icon: "Clock", roles: ["admin"] },
      { label: "Holidays", path: "/holidays", icon: "CalendarDays", roles: ["admin", "user"] },
      { label: "Policies", path: "/attendance-policies", icon: "ClipboardCheck", roles: ["admin"] },
    ],
  },
  {
    section: "Leave",
    items: [
      { label: "Leave Requests", path: "/leave-requests", icon: "Plane", roles: ["admin", "user"] },
      { label: "Leave Balances", path: "/leave-balances", icon: "CalendarDays", roles: ["admin", "user"] },
      { label: "Leave Types", path: "/leave-types", icon: "BadgeCheck", roles: ["admin"] },
      { label: "Leave Policies", path: "/leave-policies", icon: "ClipboardCheck", roles: ["admin"] },
    ],
  },
  {
    section: "Payroll",
    items: [
      { label: "Salary Components", path: "/salary-components", icon: "Wallet", roles: ["admin"] },
      { label: "Salary Structures", path: "/salary-structures", icon: "Wallet", roles: ["admin"] },
      { label: "Payroll Profiles", path: "/payroll-profiles", icon: "UserSquare", roles: ["admin"] },
      { label: "Payroll Periods", path: "/payroll-periods", icon: "CalendarDays", roles: ["admin"] },
      { label: "Payroll Runs", path: "/payroll-runs", icon: "Wallet", roles: ["admin"] },
      { label: "Payroll Adjustments", path: "/payroll-adjustments", icon: "Wallet", roles: ["admin"] },
      { label: "Statutory Config", path: "/statutory-config", icon: "ScrollText", roles: ["admin"] },
      { label: "Tax Declarations", path: "/tax-declarations", icon: "Receipt", roles: ["admin", "user"] },
      { label: "Payslips", path: "/payslips", icon: "Receipt", roles: ["admin", "user"] },
      { label: "Payroll Reports", path: "/payroll-reports", icon: "BarChart3", roles: ["admin"] },
      { label: "Loans", path: "/loans", icon: "Wallet", roles: ["admin", "user"] },
      { label: "Salary Advances", path: "/salary-advances", icon: "Wallet", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Expenses",
    items: [
      { label: "Expense Claims", path: "/expense-claims", icon: "Receipt", roles: ["admin", "user"] },
      { label: "Categories", path: "/expense-categories", icon: "BadgeCheck", roles: ["admin"] },
    ],
  },
  {
    section: "Benefits",
    items: [
      { label: "Benefit Plans", path: "/benefit-plans", icon: "Heart", roles: ["admin"] },
      { label: "Enrollments", path: "/benefit-enrollments", icon: "Heart", roles: ["admin", "user"] },
      { label: "Benefit Claims", path: "/benefit-claims", icon: "Receipt", roles: ["admin", "user"] },
      { label: "Dependents", path: "/dependents", icon: "Users", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Time & Projects",
    items: [
      { label: "Timesheets", path: "/timesheets", icon: "Clock", roles: ["admin", "user"] },
      { label: "Clients", path: "/clients", icon: "Briefcase", roles: ["admin"] },
      { label: "Projects", path: "/projects", icon: "Briefcase", roles: ["admin", "user"] },
      { label: "Project Members", path: "/project-members", icon: "Users", roles: ["admin"] },
    ],
  },
  {
    section: "Recruitment",
    items: [
      { label: "Requisitions", path: "/job-requisitions", icon: "Briefcase", roles: ["admin"] },
      { label: "Job Posts", path: "/job-posts", icon: "Megaphone", roles: ["admin"] },
      { label: "Candidates", path: "/candidates", icon: "UserPlus", roles: ["admin"] },
      { label: "Applications", path: "/applications", icon: "FileText", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Performance",
    items: [
      { label: "Review Cycles", path: "/review-cycles", icon: "CalendarDays", roles: ["admin"] },
      { label: "Goals", path: "/goals", icon: "Target", roles: ["admin", "user"] },
      { label: "Reviews", path: "/performance-reviews", icon: "Star", roles: ["admin", "user"] },
      { label: "Feedback", path: "/feedback", icon: "MessageSquare", roles: ["admin", "user"] },
      { label: "PIPs", path: "/pips", icon: "ClipboardCheck", roles: ["admin"] },
    ],
  },
  {
    section: "Training",
    items: [
      { label: "Categories", path: "/training-categories", icon: "BadgeCheck", roles: ["admin"] },
      { label: "Providers", path: "/training-providers", icon: "Briefcase", roles: ["admin"] },
      { label: "Courses", path: "/courses", icon: "GraduationCap", roles: ["admin", "user"] },
      { label: "Sessions", path: "/training-sessions", icon: "CalendarDays", roles: ["admin"] },
      { label: "Training Requests", path: "/training-requests", icon: "FileText", roles: ["admin", "user"] },
      { label: "Enrollments", path: "/enrollments", icon: "GraduationCap", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Assets",
    items: [
      { label: "Categories", path: "/asset-categories", icon: "BadgeCheck", roles: ["admin"] },
      { label: "Vendors", path: "/vendors", icon: "Briefcase", roles: ["admin"] },
      { label: "Assets", path: "/assets", icon: "Package", roles: ["admin"] },
      { label: "Asset Requests", path: "/asset-requests", icon: "Package", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Engagement",
    items: [
      { label: "Announcements", path: "/announcements", icon: "Megaphone", roles: ["admin", "user"] },
      { label: "Kudos", path: "/kudos", icon: "Star", roles: ["admin", "user"] },
      { label: "Pulse Surveys", path: "/pulse-surveys", icon: "ClipboardCheck", roles: ["admin"] },
      { label: "Suggestions", path: "/suggestions", icon: "MessageSquare", roles: ["admin", "user"] },
      { label: "Polls", path: "/polls", icon: "ClipboardCheck", roles: ["admin"] },
      { label: "Knowledge Base", path: "/knowledge-articles", icon: "BookOpen", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Meetings",
    items: [
      { label: "Meetings", path: "/meetings", icon: "Users", roles: ["admin", "user"] },
      { label: "Action Items", path: "/meeting-action-items", icon: "ClipboardCheck", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Helpdesk",
    items: [
      { label: "Tickets", path: "/helpdesk-tickets", icon: "LifeBuoy", roles: ["admin", "user"] },
      { label: "Categories", path: "/helpdesk-categories", icon: "BadgeCheck", roles: ["admin"] },
      { label: "Comments", path: "/helpdesk-comments", icon: "MessageSquare", roles: ["admin"] },
    ],
  },
  {
    section: "Documents",
    items: [
      { label: "Document Center", path: "/document-center", icon: "FileText", roles: ["admin", "user"] },
      { label: "Policies & SOPs", path: "/policies", icon: "ScrollText", roles: ["admin", "user"] },
      { label: "Letter Templates", path: "/letter-templates", icon: "FileText", roles: ["admin"] },
      { label: "Letter Generator", path: "/letter-generator", icon: "Wand2", roles: ["admin", "user"] },
      { label: "Letter Requests", path: "/letter-requests", icon: "FileCheck", roles: ["admin", "user"] },
    ],
  },
  {
    section: "Administration",
    roles: ["admin"],
    items: [
      { label: "Users", path: "/users", icon: "ShieldCheck" },
      { label: "Roles & Permissions", path: "/roles", icon: "KeyRound" },
      { label: "Settings", path: "/settings", icon: "Settings" },
      { label: "Import Employees", path: "/import-employees", icon: "Upload" },
      { label: "Notification Preferences", path: "/notification-preferences", icon: "Bell" },
    ],
  },
  {
    section: "Security",
    roles: ["admin"],
    items: [
      { label: "Login Logs", path: "/login-logs", icon: "LogIn" },
      { label: "Activity Logs", path: "/activity-logs", icon: "Activity" },
      { label: "Audit Logs", path: "/audit-logs", icon: "ScrollText" },
    ],
  },
];