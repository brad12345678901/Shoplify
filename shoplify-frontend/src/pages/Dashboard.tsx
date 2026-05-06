import { useEffect, useState } from "react";
import { useToast } from "../ToastProvider";
import HomeSection from "../components/sections/Dashboard/HomeSection";
import CatalogSection from "../components/sections/Dashboard/CatalogSection";
import AboutUsSection from "../components/sections/Dashboard/AboutUsSection";
import ContactUsSection from "../components/sections/Dashboard/ContactUsSection";
import NavigationHeader from "../components/NavigationHeader";
import DebugAddProductModal from "../components/modals/Debug/DebugAddProduct";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string>("home");

  const [showDebugAddProduct, setShowDebugAddProduct] =
    useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    (window as any).showDebugAddProduct = setShowDebugAddProduct;

    return () => {
      delete (window as any).showDebugModal;
    };
  }, []);

  useEffect(() => {
    console.log(activeSection);
  }, [activeSection]);

  return (
    <>
      <NavigationHeader activeSection={activeSection} />
      <DebugAddProductModal
        show={showDebugAddProduct}
        onClose={() => setShowDebugAddProduct(false)}
      />
      <HomeSection onVisible={setActiveSection} />
      <CatalogSection onVisible={setActiveSection} />
      <AboutUsSection onVisible={setActiveSection} />
      <ContactUsSection onVisible={setActiveSection} />
    </>
  );
}
