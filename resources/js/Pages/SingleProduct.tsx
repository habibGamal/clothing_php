import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { Product } from "../types/product";
import { Button } from "../Components/UI/Button";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface PageProps extends InertiaPageProps {
    flash: {
        error?: string;
        success?: string;
    };
}

interface SingleProductProps {
    product: Product & {
        is_owner?: boolean;
        user_bid?: number;
    };
    showBidStatus?: boolean;
}

const SingleProduct = ({
    product,
    showBidStatus = false,
}: SingleProductProps) => {
    const { flash } = usePage<PageProps>().props;
    const [bidAmount, setBidAmount] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const minBidAmount = product.current_bid ? product.current_bid + 10 : product.price;

    const timeLeft = product.end_date
        ? new Date(product.end_date).getTime() - new Date().getTime()
        : 0;
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const fallbackImage = "/assets/hero.jpeg";

    const handleBidSubmit = () => {
        if (!bidAmount || parseFloat(bidAmount) < minBidAmount) {
            alert(`يجب أن تكون المزايدة أكبر من ${minBidAmount} ج.م`);
            return;
        }

        setIsSubmitting(true);
        router.post(`/products/${product.id}/bid`,
            { amount: parseFloat(bidAmount) },
            {
                onSuccess: () => {
                    setBidAmount("");
                },
                onError: () => {
                    // Error will be shown through flash message
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            }
        );
    };

    const handleParticipate = () => {
        setIsSubmitting(true);
        const route = `/products/${product.id}/participate`;
        const options = {
            onSuccess: () => {
                // Flash message will show automatically
            },
            onError: () => {
                // Error will be shown through flash message
            },
            onFinish: () => setIsSubmitting(false),
        };

        if (showBidStatus) {
            router.delete(route, options);
        } else {
            router.post(route, {}, options);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {flash.error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        {flash.error}
                    </div>
                )}
                {flash.success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                        {flash.success}
                    </div>
                )}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-6">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <div className="aspect-square relative rounded-lg overflow-hidden">
                                <img
                                    src={product.image || fallbackImage}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                                {product.type === "giveaway" && (
                                    <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full">
                                        هدية
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {product.title}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    {product.brand}
                                </p>
                            </div>

                            {product.is_owner && (
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(`/products/${product.id}/edit`)}
                                        className="flex-1"
                                    >
                                        تعديل المنتج
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                                                router.delete(`/products/${product.id}`, {
                                                    onSuccess: () => {
                                                        router.visit('/my-products');
                                                    }
                                                });
                                            }
                                        }}
                                        className="flex-1"
                                    >
                                        حذف المنتج
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600">
                                        الحالة:
                                    </span>
                                    <span className="font-medium">
                                        {product.condition}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600">
                                        المقاس:
                                    </span>
                                    <span className="font-medium">
                                        {product.size}
                                    </span>
                                </div>
                            </div>

                            {product.description && (
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">الوصف</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {!product.is_owner && (
                                <>
                                    {product.type === "bid" ? (
                                        <div className="space-y-4 border-t pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-gray-600 block">
                                                        السعر الأولي
                                                    </span>
                                                    <span className="font-bold text-xl">
                                                        {product.price} ج.م
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600 block">
                                                        أعلى مزايدة
                                                    </span>
                                                    <span className="font-bold text-xl text-green-600">
                                                        {product.current_bid} ج.م
                                                    </span>
                                                </div>
                                            </div>

                                            {product.user_bid && (
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">
                                                            مزايدتك الحالية:
                                                        </span>
                                                        <span className="font-bold">
                                                            {product.user_bid} ج.م
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {daysLeft > 0 && (
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <span className="text-gray-600">
                                                        الوقت المتبقي:
                                                    </span>
                                                    <span className="font-bold mr-2">
                                                        {daysLeft} يوم
                                                    </span>
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="number"
                                                        value={bidAmount}
                                                        onChange={(e) => setBidAmount(e.target.value)}
                                                        placeholder={`الحد الأدنى ${minBidAmount} ج.م`}
                                                        className="flex-1 border p-3 rounded-full"
                                                        min={minBidAmount}
                                                        disabled={isSubmitting}
                                                    />
                                                    <span className="text-gray-600">
                                                        ج.م
                                                    </span>
                                                </div>
                                                <Button
                                                    variant="primary"
                                                    className="w-full text-lg"
                                                    onClick={handleBidSubmit}
                                                    disabled={isSubmitting || !bidAmount || parseFloat(bidAmount) < minBidAmount}
                                                >
                                                    {isSubmitting
                                                        ? "جاري المزايدة..."
                                                        : showBidStatus
                                                            ? "زيادة المزايدة"
                                                            : "قدم مزايدة"
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 border-t pt-4">
                                            <div>
                                                <span className="text-gray-600 block">
                                                    عدد المشاركين
                                                </span>
                                                <span className="font-bold text-xl">
                                                    {product.favorite_count} مشارك
                                                </span>
                                            </div>
                                            {daysLeft > 0 && (
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <span className="text-gray-600">
                                                        الوقت المتبقي للسحب:
                                                    </span>
                                                    <span className="font-bold mr-2">
                                                        {daysLeft} يوم
                                                    </span>
                                                </div>
                                            )}
                                            <Button
                                                variant={showBidStatus ? "outline" : "primary"}
                                                className="w-full text-lg"
                                                onClick={handleParticipate}
                                                disabled={isSubmitting || daysLeft <= 0}
                                            >
                                                {isSubmitting
                                                    ? (showBidStatus ? "جاري إلغاء المشاركة..." : "جاري المشاركة...")
                                                    : (showBidStatus ? "إلغاء المشاركة" : "شارك في السحب")}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
