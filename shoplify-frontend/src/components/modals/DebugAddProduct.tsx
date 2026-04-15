import { useEffect } from "react";
import { useProducts } from "../../hooks/useProductStore";
import FormInput from "../FormInput";
import FormSelector from "../FormSelector";

type DebugAddProductModalProps = {
  show: boolean;
};

export default function DebugAddProductModal({
  show,
}: DebugAddProductModalProps) {
  const { productsForm, setProductsForm } = useProducts();

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProductsForm(name, value);
  };

  // useEffect(() => {console.log(productsForm)})

  if (show)
    return (
      <>
        <div className="fixed flex z-50 inset-0 bg-black/60 justify-center items-center">
          <div className="min-w-250 min-h-[90vh] rounded-xl bg-white shadow-2xl justify-items-center">
            <div className="w-full border-b justify-items-center">
              <h1 className="py-5 font-semibold">Debug Add Product</h1>
            </div>
            <form className="py-8">
              <FormInput
                name="name"
                type="text"
                id="product_name"
                placeholder="Enter Product Name"
                label="Product Name"
                onChange={handleFormInput}
              />
              <FormInput
                name="type"
                type="text"
                id="product_type"
                placeholder="Enter Product Type"
                label="Product Type"
                onChange={handleFormInput}
              />
              <FormSelector placeholder="Select Category" />
              <FormInput
                name="description"
                type="textarea"
                id="product_description"
                placeholder="Enter Product Description"
                label="Product Description"
                onChange={handleFormInput}
              />
              <FormInput
                name="price"
                type="number"
                id="product_price"
                placeholder="Enter Product Price"
                label="Product Type"
                onChange={handleFormInput}
              />
              <FormInput
                name="stock"
                type="number"
                id="product_stock"
                placeholder="Enter Product Stock"
                label="Product Stocks"
                onChange={handleFormInput}
              />
              <FormInput
                name="profile_picture"
                type="file"
                id="profile_file"
                placeholder="Enter Product File"
                label="Product File"
                onChange={() => {}}
              />
            </form>
          </div>
        </div>
      </>
    );
  return null;
}
