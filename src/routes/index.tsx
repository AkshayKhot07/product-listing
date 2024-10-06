import { Route, Routes } from "react-router-dom";
import { PrivateOutlet } from "../components/PrivateOutlet";
import Home from "../pages/home";
import NotFound from "../components/NotFound";
import Summary from "../pages/summary";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateOutlet />}>
        <Route index element={<Home />} />
        <Route path="product-summary" element={<Summary />} />
        {/* <Route path="thankyou" element={<BlogPostForm />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
