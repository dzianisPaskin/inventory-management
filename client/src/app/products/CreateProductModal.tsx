import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { Header } from "../(components)/Header";
import { v4 } from "uuid";

export type ProductFormDataType = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalType = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formDate: ProductFormDataType) => void;
};

export const CreateProductModal: FC<CreateProductModalType> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState<
    ProductFormDataType & { productId: string }
  >({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create Product" />
        <form className="mt-5" onSubmit={onSubmitForm}>
          <label className={labelCssStyles} htmlFor="productNameInput">
            Product Name
          </label>
          <input
            className={inputCssStyles}
            id="productNameInput"
            type="text"
            name="name"
            placeholder="Name"
            onChange={onInputChange}
            value={formData.name}
            required
          />
          <label className={labelCssStyles} htmlFor="productPriceInput">
            Price
          </label>
          <input
            className={inputCssStyles}
            id="productPriceInput"
            type="number"
            name="price"
            placeholder="Price"
            onChange={onInputChange}
            value={formData.price}
            required
          />
          <label className={labelCssStyles} htmlFor="stockQuantityInput">
            Stock Quantity
          </label>
          <input
            className={inputCssStyles}
            id="stockQuantityInput"
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={onInputChange}
            value={formData.stockQuantity}
            required
          />
          <label className={labelCssStyles} htmlFor="ratingInput">
            Rating
          </label>
          <input
            className={inputCssStyles}
            id="ratingInput"
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={onInputChange}
            value={formData.rating}
            required
          />

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            type="submit"
          >
            Create
          </button>
          <button
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
