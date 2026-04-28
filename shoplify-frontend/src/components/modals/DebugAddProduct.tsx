import { useEffect, useRef } from "react";
import { useProducts } from "../../store/hooks/useProductStore";
import FormInput from "../FormInput";
import FormSelector from "../FormSelector";
import Button from "../Button";
import FormPictureInput from "../FormPictureInput";
import { useShallow } from "zustand/shallow";
import { useProductStore } from "../../store/useProductStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useCategory } from "../../store/hooks/useCategoryStore";

type DebugAddProductModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function DebugAddProductModal({
  show,
  onClose,
}: DebugAddProductModalProps) {
  //PRODUCTS
  const productsForm = useProductStore((state) => state.productsForm);
  const { setProductsForm, resetProductsForm, addProducts } = useProducts();

  //CATEGORIES
  const { categories, category_loading } = useCategoryStore(
    useShallow((state) => ({
      categories: state.categories,
      category_loading: state.loading,
    })),
  );
  const { fetchCategories } = useCategory();

  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormInput = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | {
          target: { type: string; name: string; value: any };
        },
  ) => {
    const { name, value } = e.target;
    setProductsForm(name, value);
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        fileInput.current!.value = "";
        resetProductsForm();
      }, 200);
    }
  }, [show]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(productsForm);
    const formData = new FormData();

    Object.entries(productsForm).forEach(([key, value]) => {
      if (value !== undefined) {
        if (
          (key === "file" && value instanceof File) ||
          value instanceof Blob
        ) {
          formData.append(
            key,
            value,
            `${productsForm.name ? productsForm.name : "sample_product"}.png`,
          );
        } else if (typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    await addProducts(formData);
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
              onChange={handleFormInput}
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
            <FormSelector
              name="category"
              value={productsForm.category}
              placeholder="Select Category"
              onChange={handleFormInput}
              options={categories.map((c) => ({
                name: c.category_name,
                value: c.id,
              }))}
              optionsLoading={category_loading}
              parentmodalShow={show}
            />
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
