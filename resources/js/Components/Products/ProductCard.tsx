import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Product, ProductType } from "../../types/product";
import { Button } from "../UI/Button";

interface ProductCardProps {
    product: Product & {
        is_owner?: boolean;
        user_bid?: number;
    };
    showBidStatus?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    showBidStatus = false,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const fallbackImage = "/assets/hero.jpeg";

    const handleClick = () => {
        router.visit(`/products/${product.id}`);
    };

    const handleParticipation = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSubmitting(true);

        if (showBidStatus) {
            router.delete(`/products/${product.id}/participate`, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(
                `/products/${product.id}/participate`,
                {},
                {
                    onFinish: () => setIsSubmitting(false),
                }
            );
        }
    };

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative aspect-square bg-gray-100">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                )}
                <img
                    src={product.image || fallbackImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                />
                {product.type === ProductType.GIVEAWAY && (
                    <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full">
                        هدية
                    </div>
                )}
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <h3 className="font-semibold text-lg truncate">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.brand}</p>
                </div>

                {product.is_owner ? (
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.visit(`/products/${product.id}/edit`);
                            }}
                        >
                            تعديل المنتج
                        </Button>
                    </div>
                ) : (
                    <>
                        {product.type === ProductType.BID ? (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">السعر الحالي</span>
                                    <span className="font-semibold">
                                        {product.current_bid || product.price} ج.م
                                    </span>
                                </div>
                                {product.user_bid && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">مزايدتك</span>
                                        <span className="text-green-600">
                                            {product.user_bid} ج.م
                                        </span>
                                    </div>
                                )}
                                {!product.is_owner && (
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.visit(`/products/${product.id}`);
                                        }}
                                    >
                                        المزايدة
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">المشاركين</span>
                                    <span>{product.favorite_count ?? 0}</span>
                                </div>
                                {!product.is_owner && (
                                    <Button
                                        variant={showBidStatus ? "outline" : "primary"}
                                        className="w-full"
                                        onClick={handleParticipation}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? showBidStatus
                                                ? "جاري إلغاء المشاركة..."
                                                : "جاري المشاركة..."
                                            : showBidStatus
                                            ? "إلغاء المشاركة"
                                            : "شارك في السحب"}
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
