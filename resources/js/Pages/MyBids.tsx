import { Product } from "../types/product";
import { UserActivityList } from "../Components/User/UserActivityList";

interface Props {
    products: Product[];
}

const MyBids = ({ products }: Props) => {
    return (
        <UserActivityList
            title="مزايداتي"
            subtitle="المنتجات التي قمت بالمزايدة عليها"
            products={products}
            emptyMessage="لم تقم بأي مزايدة بعد"
        />
    );
};

export default MyBids;
