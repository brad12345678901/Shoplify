import { lazy, useState } from "react";
import { useToast } from "./ToastProvider";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationHeader from "./components/Header";
import UserHeader from "./components/ShoplifyHeader";
import UserFooter from "./components/ShoplifyFooter";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const HandleNoLinks = lazy(() => import("./pages/HandleNoLinks"));
const ViewProduct = lazy(() => import("./pages/Products/ProductView"));

function App() {
  const {pathname:url_location} = useLocation();
  return (
    <>
    {url_location !== "/" ? <UserHeader /> : <NavigationHeader/>}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/:id" element={<ViewProduct/>}/>
        <Route path="*" element={<HandleNoLinks />}/>
      </Routes>
    {url_location !== "/" ? <UserFooter/> : ""}
    </>
  );
}

export default App;
