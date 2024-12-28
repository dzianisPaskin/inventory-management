"use client";

import { ChangeEventHandler, useState } from "react";
import { PlusCircle, SearchIcon } from "lucide-react";
import { useGetProductsQuery, useCreateProductMutation } from "@/store";
import { Header } from "../(components)/Header";
import { Rating } from "../(components)/Rating";
import { CreateProductModal, ProductFormDataType } from "./CreateProductModal";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onCreateProduct = async (data: ProductFormDataType) => {
    await createProduct(data);
    onCloseModal();
  };

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError || !products)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );

  return (
    <div className="mx-auto pb-5 w-full">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="text-gray-500 m-2" size={20} />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={onOpenModal}
        >
          <PlusCircle className="mr-2 text-gray-200" size={20} /> Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <span className="text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onCreate={onCreateProduct}
      />
    </div>
  );
}
