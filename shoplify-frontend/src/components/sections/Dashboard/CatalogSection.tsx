import { useEffect, useState, type SetStateAction } from "react";
import { useProducts } from "../../../store/hooks/useProductStore";
import { useProductStore } from "../../../store/useProductStore";
import ProductBox from "../../ProductBox";
import { useInView } from "react-intersection-observer";

type props = {
  onVisible: React.Dispatch<SetStateAction<string>>;
};

export default function CatalogSection({ onVisible }: props) {
  const products = useProductStore((state) => state.products);
  const { fetchProducts } = useProducts();

  const { ref, inView } = useInView({ threshold: 0.8 });
  const [visited, setVisited] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      if (!visited) setVisited(true);
      onVisible("catalog");
    }
  }, [inView, onVisible]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section id="catalog" ref={ref}>
      <div className="bg-gray-200 text-center py-20">
        <p className="text-black font-bold text-2xl">Items Showcase</p>
        <p>Check out the items distributed by our community</p>
        <div className="grid grid-cols-5">
          {products && products.map((p) => <ProductBox key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  );
}
