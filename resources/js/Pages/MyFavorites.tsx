import React from 'react';
import { Product } from '../types/product';
import { UserActivityList } from '../Components/User/UserActivityList';
import { Page } from '@inertiajs/core';

interface Props {
  products: Product[];
}

const MyFavorites = ({ products }: Props) => {
  return (
    <UserActivityList
      title="قائمة المفضلة"
      subtitle="المنتجات التي شاركت في سحبها"
      products={products}
      emptyMessage="لم تشارك في أي سحب بعد"
    />
  );
};

export default MyFavorites;
