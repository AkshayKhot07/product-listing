import { Outlet } from "react-router-dom";

import Layout from "../../Layout";

export function PrivateOutlet() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
