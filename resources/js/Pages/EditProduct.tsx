import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "../Components/UI/Button";
import { FormInput } from "../Components/Form/FormInput";
import { ImageUpload } from "../Components/Form/ImageUpload";
import { Product, ProductCondition, ProductType } from "../types/product";
import { PageProps } from "@inertiajs/core";

const PRODUCT_TYPES = {
    [ProductType.BID]: "مزاد",
    [ProductType.GIVEAWAY]: "هدية",
} as const;

interface Props {
    product: Product;
}

interface CustomPageProps extends PageProps {
    flash: {
        success?: string;
        error?: string;
    };
}

const EditProduct = ({ product }: Props) => {
    const { flash } = usePage<CustomPageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        title: product.title,
        description: product.description || "",
        price: product.price?.toString() || "",
        size: product.size,
        brand: product.brand,
        type: product.type,
        condition: product.condition,
        end_date: product.end_date ? new Date(product.end_date).toISOString().slice(0, 16) : "",
        image: null as File | null,
        _method: 'PUT'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/products/${product.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            {flash.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {flash.error}
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6 text-primary-900">
                    تعديل المنتج
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <ImageUpload
                            onChange={(file) => setData("image", file)}
                            error={errors.image}
                            defaultImage={product.image}
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
                            {processing ? "جاري التحديث..." : "تحديث المنتج"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
