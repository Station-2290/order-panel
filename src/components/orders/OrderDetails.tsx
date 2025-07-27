import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Order } from '@/types/order';
import { OrderStatus } from '@/types/order';
import { Clock, User, ShoppingBag, CheckCircle, XCircle, Coffee, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderDetailsProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (orderId: number, status: OrderStatus) => void;
}

const statusConfig = {
  [OrderStatus.PENDING]: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    label: 'Ожидает подтверждения',
    actions: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  },
  [OrderStatus.CONFIRMED]: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: CheckCircle,
    label: 'Подтвержден',
    actions: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  },
  [OrderStatus.PREPARING]: {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Coffee,
    label: 'Готовится',
    actions: [OrderStatus.READY],
  },
  [OrderStatus.READY]: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    label: 'Готов к выдаче',
    actions: [OrderStatus.COMPLETED],
  },
  [OrderStatus.COMPLETED]: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: CheckCircle,
    label: 'Выполнен',
    actions: [],
  },
  [OrderStatus.CANCELLED]: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    label: 'Отменен',
    actions: [],
  },
};

const actionLabels = {
  [OrderStatus.PENDING]: 'Принять заказ',
  [OrderStatus.CONFIRMED]: 'Подтвердить заказ',
  [OrderStatus.PREPARING]: 'Начать приготовление',
  [OrderStatus.READY]: 'Заказ готов',
  [OrderStatus.COMPLETED]: 'Выдать заказ',
  [OrderStatus.CANCELLED]: 'Отменить заказ',
};

export function OrderDetails({ order, isOpen, onClose, onStatusUpdate }: OrderDetailsProps) {
  if (!order) return null;

  const config = statusConfig[order.status];
  const Icon = config.icon;
  const createdAt = new Date(order.created_at);
  const updatedAt = new Date(order.updated_at);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl">Заказ {order.order_number}</span>
            <Badge className={cn('px-3 py-1', config.color)}>
              <Icon className="w-4 h-4 mr-2" />
              {config.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Время создания
                </h3>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {createdAt.toLocaleString('ru-RU')}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Последнее обновление
                </h3>
                <p className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  {updatedAt.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            {order.customer && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Клиент
                </h3>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <User className="w-5 h-5" />
                  <div>
                    <p className="font-medium">
                      {order.customer.first_name} {order.customer.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer.email}
                    </p>
                    {order.customer.phone && (
                      <p className="text-sm text-muted-foreground">
                        {order.customer.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Состав заказа ({order.items?.length || 0} позиций)
              </h3>
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name}</p>
                      {item.product?.description && (
                        <p className="text-sm text-muted-foreground">
                          {item.product.description}
                        </p>
                      )}
                      {item.product?.volume_ml && (
                        <p className="text-xs text-muted-foreground">
                          {item.product.volume_ml} мл
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.quantity} × ₽{item.unit_price.toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        ₽{item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Примечания к заказу
                </h3>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm">{order.notes}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Итого:</span>
              <span className="text-green-600">₽{order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        {config.actions.length > 0 && (
          <div className="flex gap-3 pt-4 border-t">
            {config.actions.map((status) => (
              <Button
                key={status}
                size="lg"
                variant={status === OrderStatus.CANCELLED ? 'destructive' : 'default'}
                onClick={() => {
                  onStatusUpdate(order.id, status);
                  onClose();
                }}
                className={cn(
                  'flex-1',
                  status === OrderStatus.READY && 'bg-green-600 hover:bg-green-700',
                  status === OrderStatus.CONFIRMED && 'bg-blue-600 hover:bg-blue-700',
                  status === OrderStatus.PREPARING && 'bg-orange-600 hover:bg-orange-700'
                )}
              >
                {actionLabels[status]}
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}