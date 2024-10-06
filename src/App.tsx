import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes";
import { ProductListContextProvider } from "./context/ProductListContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductListContextProvider>
          <Router />
        </ProductListContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
