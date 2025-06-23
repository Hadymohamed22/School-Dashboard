import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Finance from "../pages/Finance";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="finance" element={<Finance />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
