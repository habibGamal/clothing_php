import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '../../types/product';
import { Button } from '../../Components/UI/Button';
import { ProductCard } from '../../Components/Products/ProductCard';

interface Props {
    products: Product[];
    title?: string;
    subtitle?: string;
    emptyMessage?: string;
}

const statusLabels = {
    active: 'نشط',
    ended: 'منتهي',
    sold: 'تم البيع',
};

const ProductList = ({ products, title = 'منتجاتي', subtitle, emptyMessage = 'لم تقم بإضافة أي منتجات بعد' }: Props) => {
    const groupedProducts = products.reduce((acc, product) => {
        const hasEnded = product.end_date ? new Date(product.end_date) < new Date() : false;
        const status = product.winner_user_id ? 'sold' : (hasEnded ? 'ended' : 'active');

        return {
            ...acc,
            [status]: [...(acc[status] || []), product]
        };
    }, {} as Record<string, Product[]>);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>
                <Link href="/products/create">
                    <Button>إضافة منتج جديد</Button>
                </Link>
            </div>

            {Object.entries(groupedProducts).map(([status, statusProducts]) => (
                <div key={status} className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">
                        {statusLabels[status as keyof typeof statusLabels]}
                        <span className="text-gray-500 text-sm mr-2">({statusProducts.length})</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {statusProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showBidStatus={product.type === 'bid'}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">{emptyMessage}</p>
                    <Link href="/products/create">
                        <Button>إضافة منتج جديد</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductList;
