import { ShoppingBag } from "lucide-react";
import { Rating } from "../(components)/Rating";
import { useGetDashboardMetricsQuery } from "@/store";

export const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="xl:row-span-6 bg-white rounded-2xl shadow-md pb-16 row-span-3">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((it) => {
              return (
                <div
                  key={it.productId}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    {/* <Image></Image> */}
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">{it.name}</div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold  text-blue-500 text-xs">
                          ${it.price}
                        </span>
                        <span className="mx-2">|</span>
                        <Rating rating={it.rating || 0} />
                      </div>
                    </div>
                  </div>

                  <div className="text-sm flex items-center">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                      <ShoppingBag size={16} />
                    </button>
                    {Math.round(it.stockQuantity / 1000)}k Sold
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
