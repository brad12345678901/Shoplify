import { useEffect, useRef, useState } from "react";
import { useProducts } from "../../store/hooks/useProductStore";
import FormInput from "../FormInput";
import FormSelector from "../FormSelector";
import Button from "../Button";
import FormFileInput from "../FormFileInput";
import FormPictureInput from "../FormPictureInput";

type DebugAddProductModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function DebugAddProductModal({
  show,
  onClose,
}: DebugAddProductModalProps) {
  const { productsForm, setProductsForm, resetProductsForm } = useProducts();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProductsForm(name, value);
  };

  useEffect(() => {
    console.log(productsForm);
  }, [productsForm]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        fileInput.current!.value = "";
        resetProductsForm();
      }, 200);
    }
  }, [show]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <div
        className={`fixed flex z-50 inset-0 bg-black/60 justify-center items-center transition ease-in-out duration-200 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      >
        <div
          className="min-w-250 min-h-[90vh] rounded-xl bg-white shadow-2xl justify-items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full border-b justify-items-center">
            <h1 className="py-5 font-semibold">Debug Add Product</h1>
          </div>
          <form className="py-8" onSubmit={handleSubmit}>
            <FormPictureInput
              name="file"
              id="product_file"
              placeholder="Enter Product File"
              label="Product File"
              inputRef={fileInput}
              parentmodalShow={show}
            />
            <FormInput
              name="name"
              type="text"
              value={productsForm.name}
              id="product_name"
              placeholder="Enter Product Name"
              label="Product Name"
              onChange={handleFormInput}
            />
            <FormInput
              name="type"
              type="text"
              value={productsForm.type}
              id="product_type"
              placeholder="Enter Product Type"
              label="Product Type"
              onChange={handleFormInput}
            />
            <FormSelector placeholder="Select Category" />
            <FormInput
              name="description"
              type="textarea"
              value={productsForm.description}
              id="product_description"
              placeholder="Enter Product Description"
              label="Product Description"
              onChange={handleFormInput}
            />
            <FormInput
              name="price"
              type="number"
              value={productsForm.price}
              id="product_price"
              placeholder="Enter Product Price"
              label="Product Type"
              onChange={handleFormInput}
            />
            <FormInput
              name="stock"
              type="number"
              value={productsForm.stock}
              id="product_stock"
              placeholder="Enter Product Stock"
              label="Product Stocks"
              onChange={handleFormInput}
            />
            <Button type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
