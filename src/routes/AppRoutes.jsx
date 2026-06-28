import Reports from "../pages/Reports/Reports";
import HolidayManagement from "../pages/HolidayManagement/HolidayManagement";
import AttendanceCorrections from "../pages/AttendanceCorrections/AttendanceCorrections";
import AttendanceOverview from "../pages/AttendanceOverview/AttendanceOverview";
import LeaveRequests from "../pages/LeaveRequests/LeaveRequests";
import LeaveTypes from "../pages/LeaveTypes/LeaveTypes";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import SupervisorManagement from "../pages/SupervisorManagement/SupervisorManagement";

function AppRoutes() {
  return (
    <DashboardLayout>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/supervisors"
            />
          }
        />

        <Route
          path="/supervisors"
          element={
            <SupervisorManagement />
          }
        />
        <Route
  path="/leave-requests"
  element={<LeaveRequests />}
/>

        <Route
          path="/leave-types"
          element={
            <LeaveTypes />
          }
        />
        <Route
  path="/attendance"
  element={
    <AttendanceOverview />
  }
/>
<Route
  path="/corrections"
  element={
    <AttendanceCorrections />
  }
/>
<Route
  path="/holidays"
  element={<HolidayManagement />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>

      </Routes>

    </DashboardLayout>
  );
}

export default AppRoutes;