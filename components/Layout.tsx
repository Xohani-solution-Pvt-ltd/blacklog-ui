import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "./Header";
import { LayoutProps } from "../interfaces/index";
import { Container } from "react-bootstrap";
import DashboardSidebar from "./Sidebar";

const Layout = ({
  children,
  title = "This is the default title",
}: LayoutProps) => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Container>
        {/* <Header /> */}
        <Header onToggleSidebar={toggleSidebar} />
        <DashboardSidebar isOpen={isSidebarOpen} />
        {children}
      </Container>
    </>
  );
};

const StaticLayout = ({
  children,
  title = "This is the default title",
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Header /> */}
      {children}
    </>
  );
};
export { StaticLayout };
export default Layout;
