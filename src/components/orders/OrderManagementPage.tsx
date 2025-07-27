import { OrderManagement } from './OrderManagement';
import { ResponsiveLayout } from '../layout/ResponsiveLayout';
import { useOrders } from '@/hooks/useOrders';
import { useState } from 'react';
import { OrderStatus } from '@/types/order';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function OrderManagementPage() {
  const [selectedStatus] = useState<OrderStatus | 'ALL'>('ALL');
  
  useDocumentTitle({
    title: 'Заказы',
    description: 'Управление заказами кофейни - просмотр, принятие и обновление статусов заказов в реальном времени',
    keywords: 'заказы, управление заказами, статус заказов, кофейня, бариста'
  });
  
  const { data: ordersData, isLoading, refetch } = useOrders({
    status: selectedStatus === 'ALL' ? undefined : selectedStatus,
  });

  const orders = ordersData?.data || [];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <ResponsiveLayout
      mobileTitle="Заказы"
      mobileSubtitle={`${orders.length} ${orders.length === 1 ? 'заказ' : 'заказов'}`}
      onMobileRefresh={handleRefresh}
      isMobileRefreshing={isLoading}
    >
      <OrderManagement />
    </ResponsiveLayout>
  );
}