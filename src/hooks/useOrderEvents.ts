import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { env } from '@/env';
import { tokenStorage } from '@/shared/auth/storage';
import type { OrderEvent } from '@/types/order';
import { toast } from 'sonner';

export function useOrderEvents() {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connectToEvents = () => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      console.warn('No access token available for order events');
      return;
    }

    const baseUrl = env.VITE_API_URL || 'http://localhost:3001';
    // Pass JWT token as query parameter since EventSource doesn't support custom headers
    const eventSource = new EventSource(`${baseUrl}/api/v1/events/orders?token=${encodeURIComponent(token)}`);

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('Connected to order events stream');
    };

    eventSource.onmessage = (event) => {
      try {
        const orderEvent: OrderEvent = JSON.parse(event.data);
        console.log('Received order event:', orderEvent);

        // Invalidate orders query to trigger refetch
        queryClient.invalidateQueries({ queryKey: ['orders'] });

        // Show toast notification
        switch (orderEvent.type) {
          case 'order_created':
            toast.success(`Новый заказ ${orderEvent.order_number}`, {
              description: `Сумма: ₽${orderEvent.total_amount.toFixed(2)}`,
            });
            break;
          case 'order_updated':
            toast.info(`Заказ ${orderEvent.order_number} обновлен`, {
              description: `Статус: ${getStatusLabel(orderEvent.status)}`,
            });
            break;
          case 'order_cancelled':
            toast.error(`Заказ ${orderEvent.order_number} отменен`);
            break;
        }
      } catch (error) {
        console.error('Failed to parse order event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Order events stream error:', error);
      
      // Check if it's an authentication error (401) - EventSource closes on 401
      if (eventSource.readyState === EventSource.CLOSED) {
        console.warn('Order events stream closed, possibly due to authentication');
        
        // Try to reconnect after a delay with a fresh token
        reconnectTimeoutRef.current = window.setTimeout(() => {
          console.log('Attempting to reconnect to order events...');
          connectToEvents();
        }, 5000); // Reconnect after 5 seconds
      } else {
        // EventSource will automatically reconnect for other errors
        console.log('Order events stream will attempt to reconnect');
      }
    };
  };

  useEffect(() => {
    connectToEvents();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [queryClient]);

  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  return { disconnect };
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Ожидает',
    CONFIRMED: 'Подтвержден',
    PREPARING: 'Готовится',
    READY: 'Готов',
    COMPLETED: 'Выполнен',
    CANCELLED: 'Отменен',
  };
  return labels[status] || status;
}