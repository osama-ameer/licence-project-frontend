import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const breadcrumbNameMap = {
  "/dashboard": "Home",
  "/license": "Licenses",
  "/users": "Users",
  "/settings": "Settings",
};
const AppBreadCumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  // const breadcrumbItems = [
  //   {
  //     title: <Link to="/">Home</Link>,
  //     key: "/dashboard",
  //   },
  // ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb
      style={{
        margin: "10px 0",
      }}
      items={extraBreadcrumbItems}
    />
  );
};

export default AppBreadCumbs;
