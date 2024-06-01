import { OrderItemData } from '@/dto';
import { formatCurrency } from '@/utils';
import { Image } from '@nextui-org/react';

type Props = {
  orderItem: OrderItemData;
};

const OrderItemCard = ({ orderItem }: Props) => {
  const product = orderItem.productData;

  return (
    <div className="flex gap-4">
      <div className="grid w-24 place-items-center rounded-lg bg-slate-100 p-2 dark:bg-slate-700">
        <Image
          src={product.productImage || '/product-placeholder.png'}
          alt={product.productName}
          width={100}
          height={100}
          className="w-full object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex h-full flex-wrap gap-2">
          <div className="flex flex-1 flex-col flex-wrap justify-between space-y-1">
            <h3 className="font-medium line-clamp-2">{product.productName}</h3>
            <p className="text-lg font-medium text-primary">
              {formatCurrency(orderItem.pricePerUnit * orderItem.quantity)}
            </p>
            <p>Quantity: {orderItem.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
