import React from "react";

import { Header, Menu, Footer, AppContent } from "../components/index";

const DefaultLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <AppContent />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
