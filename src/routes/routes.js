import React from "react";

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
];

export default routes;
