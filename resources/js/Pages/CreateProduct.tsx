import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "../Components/UI/Button";
import { FormInput } from "../Components/Form/FormInput";
import { ImageUpload } from "../Components/Form/ImageUpload";
import { ProductCondition, ProductType } from "../types/product";

const PRODUCT_TYPES = {
    [ProductType.BID]: "مزاد",
    [ProductType.GIVEAWAY]: "هدية",
} as const;

const CreateProduct = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        price: "",
        size: "",
        brand: "",
        type: ProductType.BID,
        condition: ProductCondition.EXCELLENT,
        end_date: "",
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/products", {
            onSuccess: () => {
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6 text-primary-900">
                    إضافة منتج جديد
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <ImageUpload
                            onChange={(file) => setData("image", file)}
                            error={errors.image}
                        />

                        <FormInput
                            label="عنوان المنتج"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            error={errors.title}
                            required
                        />

                        <FormInput
                            as="textarea"
                            label="وصف المنتج"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            error={errors.description}
                            rows={4}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                as="select"
                                label="نوع العرض"
                                value={data.type}
                                onChange={(e) =>
                                    setData(
                                        "type",
                                        e.target.value as ProductType
                                    )
                                }
                                error={errors.type}
                                required
                            >
                                {Object.entries(PRODUCT_TYPES).map(
                                    ([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    )
                                )}
                            </FormInput>

                            <FormInput
                                as="select"
                                label="حالة المنتج"
                                value={data.condition}
                                onChange={(e) =>
                                    setData(
                                        "condition",
                                        e.target.value as ProductCondition
                                    )
                                }
                                error={errors.condition}
                                required
                            >
                                {Object.values(ProductCondition).map(
                                    (condition) => (
                                        <option
                                            key={condition}
                                            value={condition}
                                        >
                                            {condition}
                                        </option>
                                    )
                                )}
                            </FormInput>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                type="text"
                                label="المقاس"
                                value={data.size}
                                onChange={(e) =>
                                    setData("size", e.target.value)
                                }
                                error={errors.size}
                                required
                            />

                            <FormInput
                                type="text"
                                label="الماركة"
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                                error={errors.brand}
                                required
                            />
                        </div>

                        {data.type === ProductType.BID && (
                            <FormInput
                                type="number"
                                label="السعر المبدئي"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                error={errors.price}
                                min="0"
                                step="0.01"
                                required
                            />
                        )}

                        <FormInput
                            type="datetime-local"
                            label="تاريخ الانتهاء"
                            value={data.end_date}
                            onChange={(e) =>
                                setData("end_date", e.target.value)
                            }
                            error={errors.end_date}
                            required
                        />
                    </div>

                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                            variant="primary"
                        >
                            {processing ? "جاري الإضافة..." : "إضافة المنتج"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
