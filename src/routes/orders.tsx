import { createFileRoute } from '@tanstack/react-router'
import { OrderManagementPage } from '../components/orders/OrderManagementPage'

export const Route = createFileRoute('/orders')({
  component: OrderManagementPage,
})
