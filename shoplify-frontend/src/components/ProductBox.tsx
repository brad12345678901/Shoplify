import type { Products } from "../types/products";

export default function ProductBox(product: Products) {
  return (
    <div className="group flex flex-col bg-white m-10 content-center justify-items-center shadow-xl overflow-hidden">
      <div className = "relative">
        <img
          className="max-w-50 max-h-75"
          src={product.imageUrl.length !== 0 ? `product.imageUrl[0]` : "https://dummyimage.com/200x300/000/fff&text=Product"}
        />
        <div className="absolute transition-all ease-in-out duration-100 w-full z-10 bg-black/50 text-white p-2 -bottom-full group-hover:bottom-0 group-hover:left-0">
          <p>{product.name}</p>
        </div>
      </div>
    </div>
  );
}
