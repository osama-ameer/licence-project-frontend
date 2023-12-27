import React from "react";
import Setting from "../views/Setting";

const Dashboard = React.lazy(() => import("../views/Dashboard"));
const License = React.lazy(() => import("../views/License"));
const LicenseDetail = React.lazy(() =>
  import("../views/License/LicenseDetail")
);
const CreateLicense = React.lazy(() =>
  import("../views/License/CreateLicense")
);

const Account = React.lazy(() => import("../views/Account"));
const AccountDetail = React.lazy(() =>
  import("../views/Account/AccountDetail")
);
const CreateAccount = React.lazy(() =>
  import("../views/Account/CreateAccount")
);

const Users = React.lazy(() => import("../views/Users"));
const UserDetail = React.lazy(() => import("../views/Users/UserDetail"));
const CreateUser = React.lazy(() => import("../views/Users/CreateUser"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  // License Routes
  { path: "/license", name: "License", element: License },
  { path: "/license/:id", name: "Create License", element: CreateLicense },
  {
    path: "/view-license/:id",
    name: "LicenseDetail",
    element: LicenseDetail,
  },

  // Account Routes
  { path: "/account", name: "Account", element: Account },
  { path: "/account/:id", name: "Create Account", element: CreateAccount },
  {
    path: "/view-account/:id",
    name: "AccountDetail",
    element: AccountDetail,
  },

  // User Routes
  { path: "/users", name: "Users", element: Users },
  { path: "/user/:id", name: "Create User", element: CreateUser },
  {
    path: "/view-user/:id",
    name: "UserDetail",
    element: UserDetail,
  },

  { path: "/settings", name: "Settings", element: Setting },
];

export default routes;
