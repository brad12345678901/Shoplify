import NavigationHeader from "../components/Header";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProductStore";

export default function Dashboard() {

  const {products, fetchProducts} = useProducts()

  useEffect(() => {
    fetchProducts()
  }, [])


  console.log(products);
  return (
    <>
    <NavigationHeader/>
    <section>
        <div className = "custom_section_1 py-40 px-20">
            <div className = "text-white">
                Shop with us! Lift yourself with Products you deserve!
            </div>
        </div>
    </section>
    </>
  );
}
