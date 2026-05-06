import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import { useEffect } from "react";
import { useProducts } from "../../store/hooks/useProductStore";

export default function ViewProduct() {
  const product = useProductStore((state) => state.product);
  const id = Number(useParams().id);
  const { fetchProduct } = useProducts();

  useEffect(() => {
    fetchProduct(id);
  }, [])
  return (
    <div className = "pt-20">
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-200 grid grid-cols-5 w-[80vw] max-w-300 h-screen py-10 px-5 justify-self-center overflow-hidden">
          <img className = "col-span-2 justify-self-center" src={product ? product.imageUrl[0] : "https://dummyimage.com/300x400/000/fff&text=Product"} />
          <div className="col-span-3">
            <p className = "text-2xl">{product?.name}</p>
            <div>

            </div>
            <div className = "bg-white drop-shadow-xs w-full p-3">
              <p className = "text-2xl text-gray-800 font-bold">{product?.price}</p>
            </div>
            <p>{product?.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
