import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Order, OrderStatus  } from '@/types/order';
import { fetchClient } from '@/shared/api';

interface OrdersQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

interface OrdersResponse {
  data: Array<Order>;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ApiOrdersResponse {
  data: Array<Order>;
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}

interface UpdateOrderData {
  status?: OrderStatus;
  notes?: string;
}

export function useOrders(params: OrdersQueryParams = {}) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: async (): Promise<OrdersResponse> => {
      const response = await fetchClient.GET('/api/v1/orders', {
        params: {
          query: {
            page: params.page || 1,
            limit: params.limit || 50,
            ...(params.status && { status: params.status }),
          },
        },
      });

      if (response.error) {
        throw new Error('Failed to fetch orders');
      }

      const apiResponse = response.data as ApiOrdersResponse;
      return {
        data: apiResponse.data,
        meta: {
          page: apiResponse.meta.page,
          limit: apiResponse.meta.limit,
          total: apiResponse.meta.total,
          totalPages: apiResponse.meta.total_pages,
        },
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async (): Promise<Order> => {
      const response = await fetchClient.GET('/api/v1/orders/{id}', {
        params: { path: { id } },
      });

      if (response.error) {
        throw new Error('Failed to fetch order');
      }

      return response.data as Order;
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateOrderData }): Promise<Order> => {
      const response = await fetchClient.PATCH('/api/v1/orders/{id}', {
        params: { path: { id } },
        body: data as any,
      });

      if (response.error) {
        throw new Error('Failed to update order');
      }

      return response.data as Order;
    },
    onSuccess: (updatedOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(['orders', updatedOrder.id], updatedOrder);
      
      // Invalidate orders list to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<Order> => {
      const response = await fetchClient.POST('/api/v1/orders/{id}/cancel', {
        params: { path: { id } },
      });

      if (response.error) {
        throw new Error('Failed to cancel order');
      }

      return response.data as Order;
    },
    onSuccess: (cancelledOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(['orders', cancelledOrder.id], cancelledOrder);
      
      // Invalidate orders list to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}