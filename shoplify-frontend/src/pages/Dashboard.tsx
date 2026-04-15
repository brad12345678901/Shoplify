import NavigationHeader from "../components/Header";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProductStore";
import ProductBox from "../components/ProductBox";
import DebugAddProductModal from "../components/modals/DebugAddProduct";
import FormInput from "../components/FormInput";

export default function Dashboard() {
  const { products, fetchProducts } = useProducts();

  const [show, setShow] = useState(false);

  const [debugShowModal, setdebugShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    setShow(true);
  }, []);

  return (
    <>
      <DebugAddProductModal show={debugShowModal} />
      <button onClick={() => {setdebugShowModal(true)}}>CLICK ME</button>
      <NavigationHeader />
      <section id="Hero">
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
      <section id="Item Showcase">
        <div className="bg-white text-center py-20">
          <p className="text-black font-bold text-2xl">Items Showcase</p>
          <div className="grid grid-cols-5">
            {products && products.map((p) => <ProductBox key={p.id} {...p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
