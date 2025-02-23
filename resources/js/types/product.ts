export enum ProductCondition {
    EXCELLENT = 'ممتاز',
    VERY_GOOD = 'جيد جداً',
    GOOD = 'جيد',
    FAIR = 'مقبول'
}

export enum ProductType {
    BID = 'bid',
    GIVEAWAY = 'giveaway'
}

export interface Product {
    id: number;
    user_id: number;
    title: string;
    image: string;
    price: number;
    size: string;
    brand: string;
    type: ProductType;
    condition: ProductCondition;
    current_bid?: number;
    end_date: string;
    description: string;
    winner_user_id?: number;
    final_price?: number;
    favorite_count?: number;
    created_at: string;
    updated_at: string;
}

export interface FilterState {
    type?: ProductType;
    brands: string[];
    sizes: string[];
    condition?: ProductCondition[];
    minPrice?: number;
    maxPrice?: number;
}
