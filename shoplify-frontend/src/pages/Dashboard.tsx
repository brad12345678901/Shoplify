import NavigationHeader from "../components/Header";
import { useEffect, useState } from "react";
import { useProducts } from "../store/hooks/useProductStore";
import ProductBox from "../components/ProductBox";
import DebugAddProductModal from "../components/modals/DebugAddProduct";
import { useToast } from "../ToastProvider";
import { useProductStore } from "../store/useProductStore";
import Button from "../components/Button";

export default function Dashboard() {
  const products = useProductStore((state) => state.products);
  const { fetchProducts } = useProducts();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [debugShowModal, setdebugShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    setShow(true);
  }, []);

  return (
    <>
      <DebugAddProductModal
        show={debugShowModal}
        onClose={() => {
          setdebugShowModal(false);
        }}
      />
      <Button
        onClick={() => {
          setdebugShowModal(true);
        }}
      >
        Click Me
      </Button>
      <section id="hero">
        <div className="custom_section_1 pt-100 pb-40 px-20 h-300">
          <div className="text-white max-w-250">
            <p
              className={`font-medium text-7xl transition ease-in-out duration-700 ${show ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-10`}`}
            >
              Shop with us! Lift yourself with Products you deserve!
            </p>
            <p
              className={`mt-8 font-light text-xl transition ease-in delay-150 duration-700 ${show ? `opacity-100` : `opacity-0`}`}
            >
              With just one click of a button, All you desired items will be on
              your possession!
            </p>
          </div>
        </div>
      </section>
      <section id="itemshowcase">
        <div className="bg-white text-center py-20">
          <p className="text-black font-bold text-2xl">Items Showcase</p>
          <div className="grid grid-cols-5">
            {products && products.map((p) => <ProductBox key={p.id} {...p} />)}
          </div>
        </div>
      </section>
      <section id="aboutus">
        <div className="bg-gray-200/50 text-center py-20"></div>
      </section>
      <section id="contactus">
        <div className="bg-black text-white pt-20">
          <div className="flex flex-row justify-center gap-x-10 py-10">
            <div className="max-w-2xs">
              <p>ICON</p>
            </div>
            <div className="max-w-2xs">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
            <div className="max-w-2xs">
              <p>ICON</p>
            </div>
          </div>
          <div className="flex flex-row py-5 mx-100 border-t-2">
            <p>@ 2026 Shoplify, All Copyrights reserved</p>
          </div>
        </div>
      </section>
    </>
  );
}
