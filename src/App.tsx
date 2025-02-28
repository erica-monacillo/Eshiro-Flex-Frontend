import React from "react";
import { BrowserRouter } from "react-router-dom";
import AestheticShop from "./components/pages/AestheticShop";
import "./index.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AestheticShop />
    </BrowserRouter>
  );
};

export default App;
