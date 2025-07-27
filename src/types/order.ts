export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  unit_price: number
  subtotal: number
  created_at: string
  updated_at: string
  product?: {
    id: number
    name: string
    description?: string
    price: number
    sku: string
    volume_ml?: number
  }
}

export interface Order {
  id: number
  order_number: string
  status: OrderStatus
  total_amount: number
  notes?: string | null
  customer_id?: number | null
  created_at: string
  updated_at: string
  items?: Array<OrderItem>
  customer?: {
    id: number
    first_name: string
    last_name: string
    email: string
    phone?: string
  }
}

export interface OrderEvent {
  type: 'order_created' | 'order_updated' | 'order_cancelled'
  order_id: number
  order_number: string
  status: OrderStatus
  total_amount: number
  customer_name?: string
  created_at: string
  updated_at: string
}
