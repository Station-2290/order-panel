import { useState, useMemo } from 'react';
import { OrderCard } from './OrderCard';
import { MobileOrderCard } from './MobileOrderCard';
import { OrderFilters } from './OrderFilters';
import { OrderDetails } from './OrderDetails';
import type { Order } from '@/types/order';
import { OrderStatus } from '@/types/order';
import { useOrders, useUpdateOrder, useCancelOrder } from '@/hooks/useOrders';
import { useOrderEvents } from '@/hooks/useOrderEvents';
import { Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function OrderManagement() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL'>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const isMobile = useIsMobile();
  
  // API hooks
  const { data: ordersData, isLoading, isError, refetch } = useOrders({
    status: selectedStatus === 'ALL' ? undefined : selectedStatus,
  });
  const updateOrderMutation = useUpdateOrder();
  const cancelOrderMutation = useCancelOrder();
  
  // Real-time events
  useOrderEvents();

  const orders = ordersData?.data || [];

  // Calculate order counts for filters
  const orderCounts = useMemo(() => {
    const counts: Record<OrderStatus | 'ALL', number> = {
      ALL: orders.length,
      [OrderStatus.PENDING]: 0,
      [OrderStatus.CONFIRMED]: 0,
      [OrderStatus.PREPARING]: 0,
      [OrderStatus.READY]: 0,
      [OrderStatus.COMPLETED]: 0,
      [OrderStatus.CANCELLED]: 0,
    };

    orders.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });

    return counts;
  }, [orders]);

  const handleStatusUpdate = async (orderId: number, status: OrderStatus) => {
    try {
      if (status === OrderStatus.CANCELLED) {
        await cancelOrderMutation.mutateAsync(orderId);
        toast.success('Заказ отменен');
      } else {
        await updateOrderMutation.mutateAsync({
          id: orderId,
          data: { status },
        });
        toast.success('Статус заказа обновлен');
      }
    } catch (error) {
      toast.error('Ошибка при обновлении заказа');
      console.error('Error updating order:', error);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleRefresh = () => {
    refetch();
    toast.info('Обновление списка заказов...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Загрузка заказов...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <WifiOff className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <h3 className="text-lg font-medium">Ошибка загрузки</h3>
          <p className="text-muted-foreground">
            Не удалось загрузить список заказов
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Desktop Header - only show on desktop */}
      {!isMobile && (
        <div className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                Управление заказами
              </h1>
              <p className="text-muted-foreground text-sm">
                {orders.length} {orders.length === 1 ? 'заказ' : 'заказов'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4 text-green-500" />
                <span>Онлайн</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
                <span className="ml-1">Обновить</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <OrderFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        orderCounts={orderCounts}
      />

      {/* Orders List */}
      <div className="flex-1 overflow-auto">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-center">
              <h3 className="text-lg font-medium">Нет заказов</h3>
              <p className="text-muted-foreground">
                {selectedStatus === 'ALL' 
                  ? 'В данный момент нет активных заказов'
                  : `Нет заказов со статусом "${selectedStatus}"`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className={cn(
              'grid gap-3',
              isMobile 
                ? 'grid-cols-1' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
              'tablet-portrait-grid tablet-landscape-grid'
            )}>
              {orders.map((order) => 
                isMobile ? (
                  <MobileOrderCard
                    key={order.id}
                    order={order}
                    onStatusUpdate={handleStatusUpdate}
                    onViewDetails={handleViewDetails}
                  />
                ) : (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusUpdate={handleStatusUpdate}
                    onViewDetails={handleViewDetails}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetails
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}