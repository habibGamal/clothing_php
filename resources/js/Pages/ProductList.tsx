import React, { useState } from "react";
import { FilterSidebar } from "../Components/Products/FilterSidebar";
import { ProductGrid } from "../Components/Products/ProductGrid";
import { FilterState, Product } from "../types/product";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";

interface Props extends PageProps {
    products: Product[];
    filters: {
        search?: string;
    };
}

const ProductList = () => {
    const { products, filters: initialFilters } = usePage<Props>().props;
    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        sizes: [],
        condition: [],
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const filteredProducts = products.filter((product) => {
        if (filters.type && product.type !== filters.type) return false;
        if (filters.brands.length && !filters.brands.includes(product.brand)) return false;
        if (filters.sizes.length && !filters.sizes.includes(product.size)) return false;
        if (filters.condition?.length && !filters.condition.includes(product.condition)) return false;
        if (filters.minPrice && product.price && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price && product.price > filters.maxPrice) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <h1 className="text-2xl font-bold">المنتجات المتاحة</h1>
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="bg-white p-2 rounded-lg shadow-sm text-gray-600 hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
                        <div className="bg-white shadow-sm rounded-lg sticky top-4">
                            <FilterSidebar filters={filters} onFilterChange={setFilters} />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="hidden md:flex justify-between items-center">
                            <h1 className="text-2xl font-bold">المنتجات المتاحة</h1>
                            <span className="text-gray-600">{filteredProducts.length} منتج</span>
                        </div>
                        <div className="md:hidden text-gray-600 text-center">
                            {filteredProducts.length} منتج
                        </div>
                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
