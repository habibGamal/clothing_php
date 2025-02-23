import React from "react";
import { FilterState, ProductCondition, ProductType } from "../../types/product";
import { Button } from "../UI/Button";

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export const FilterSidebar = ({
    filters,
    onFilterChange,
}: FilterSidebarProps) => {
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const brands = ["زارا", "اتش اند ام", "بول اند بير", "نايك", "اديداس"];
    const conditions = ["جديد", "ممتاز", "جيد", "مقبول"];

    const toggleSize = (size: string) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter((s) => s !== size)
            : [...filters.sizes, size];
        onFilterChange({ ...filters, sizes: newSizes });
    };

    const toggleBrand = (brand: string) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        onFilterChange({ ...filters, brands: newBrands });
    };

    return (
        <div className="w-full space-y-6 p-4" dir="rtl">
            <div>
                <h3 className="font-bold mb-3">نوع المنتج</h3>
                <div className="flex gap-2">
                    <Button
                        variant={
                            filters.type === ProductType.BID
                                ? "primary"
                                : "outline"
                        }
                        className="flex-1"
                        onClick={() =>
                            onFilterChange({
                                ...filters,
                                type: ProductType.BID,
                            })
                        }
                    >
                        مزاد
                    </Button>
                    <Button
                        variant={
                            filters.type === ProductType.GIVEAWAY ? "primary" : "outline"
                        }
                        className="flex-1"
                        onClick={() =>
                            onFilterChange({ ...filters, type: ProductType.GIVEAWAY })
                        }
                    >
                        هدايا
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-3">المقاس</h3>
                <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            variant={
                                filters.sizes.includes(size)
                                    ? "primary"
                                    : "outline"
                            }
                            className="text-sm"
                            onClick={() => toggleSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-3">الماركة</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.brands.includes(brand)}
                                onChange={() => toggleBrand(brand)}
                                className="w-4 h-4"
                            />
                            <span>{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-3">الحالة</h3>
                <div className="space-y-2">
                    {conditions.map((condition) => (
                        <label
                            key={condition}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                checked={filters.condition?.includes(condition as ProductCondition)}
                                onChange={() => {
                                    const newConditions =
                                        filters.condition?.includes(condition as ProductCondition)
                                            ? filters.condition.filter(
                                                  (c) => c !== condition
                                              )
                                            : [
                                                  ...(filters.condition || []),
                                                  condition,
                                              ];
                                    onFilterChange({
                                        ...filters,
                                        condition: (newConditions as ProductCondition[]),
                                    });
                                }}
                                className="w-4 h-4"
                            />
                            <span>{condition}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-3">السعر</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm">من</label>
                        <input
                            type="number"
                            value={filters.minPrice || ""}
                            onChange={(e) =>
                                onFilterChange({
                                    ...filters,
                                    minPrice: e.target.value
                                        ? Number(e.target.value)
                                        : undefined,
                                })
                            }
                            className="w-full border p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm">إلى</label>
                        <input
                            type="number"
                            value={filters.maxPrice || ""}
                            onChange={(e) =>
                                onFilterChange({
                                    ...filters,
                                    maxPrice: e.target.value
                                        ? Number(e.target.value)
                                        : undefined,
                                })
                            }
                            className="w-full border p-2 mt-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
