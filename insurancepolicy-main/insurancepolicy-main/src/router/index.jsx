import SignUp from "../views/register/Main"
import AddPolicy from "../views/policy/AddPolicy"
import ViewRequests from "../views/policy/ViewRequests";
import AppliedPolicies from "../views/policy/user-side/Appliedpolicies"
import ApplyPolicy from "../views/policy/user-side/ApplyPolicy";
import Login from "../views/login/Main";
import ErrorPage from "../views/error-page/Main";
import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import DashboardOverview1 from "../views/dashboard-overview-1/Main";
function Router() {
  const routes = [
    {
      path:"/",
      element: <SignUp/>
    },
    {
      path:"/signin",
      element: <Login/>
    },
    {
      path: "/dashboard",
      element: <SideMenu />,
      children: [
        {
          path: "dashboard",
          element: <DashboardOverview1 />,
        },
        {
          path: "addpolicy",
          element: <AddPolicy/>
        },
        {
          path: "availablepolicies",
          element: <ApplyPolicy/>
        },
        {
          path: "appliedpolicies",
          element: <AppliedPolicies/>
        },
        {
          path: "policyrequests",
          element: <ViewRequests/>
        }
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];
  return useRoutes(routes);
}

export default Router;
