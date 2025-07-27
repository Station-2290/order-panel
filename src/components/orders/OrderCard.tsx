import {
  CheckCircle,
  Clock,
  Coffee,
  ShoppingBag,
  Timer,
  User,
  XCircle,
} from 'lucide-react'
import type { Order } from '@/types/order'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/types/order'
import { cn } from '@/lib/utils'

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: number, status: OrderStatus) => void
  onViewDetails: (order: Order) => void
}

const statusConfig = {
  [OrderStatus.PENDING]: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    label: 'Ожидает',
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
    label: 'Готов',
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
}

const actionLabels = {
  [OrderStatus.PENDING]: 'Ожидает',
  [OrderStatus.CONFIRMED]: 'Подтвердить',
  [OrderStatus.PREPARING]: 'В работу',
  [OrderStatus.READY]: 'Готов',
  [OrderStatus.COMPLETED]: 'Выдан',
  [OrderStatus.CANCELLED]: 'Отменить',
}

export function OrderCard({
  order,
  onStatusUpdate,
  onViewDetails,
}: OrderCardProps) {
  const config = statusConfig[order.status]
  const Icon = config.icon
  const createdAt = new Date(order.created_at)
  const timeAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60))

  const getTimeColor = (minutes: number) => {
    if (minutes < 5) return 'text-green-600'
    if (minutes < 15) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-lg border-l-4',
        order.status === OrderStatus.PENDING && 'border-l-yellow-500',
        order.status === OrderStatus.CONFIRMED && 'border-l-blue-500',
        order.status === OrderStatus.PREPARING && 'border-l-orange-500',
        order.status === OrderStatus.READY && 'border-l-green-500',
        order.status === OrderStatus.COMPLETED && 'border-l-gray-400',
        order.status === OrderStatus.CANCELLED && 'border-l-red-500',
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {order.order_number}
          </CardTitle>
          <Badge className={cn('px-3 py-1', config.color)}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            <span className={getTimeColor(timeAgo)}>
              {timeAgo < 1 ? 'только что' : `${timeAgo} мин назад`}
            </span>
          </div>
          {order.customer && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>
                {order.customer.first_name} {order.customer.last_name}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {order.items?.length || 0} позиций
            </span>
          </div>
          <div className="text-lg font-bold text-green-600">
            ₽{order.total_amount.toFixed(2)}
          </div>
        </div>

        {order.notes && (
          <div className="p-2 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Примечания:</strong> {order.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order)}
            className="flex-1"
          >
            Детали
          </Button>

          {config.actions.map((status) => (
            <Button
              key={status}
              size="sm"
              variant={
                status === OrderStatus.CANCELLED ? 'destructive' : 'default'
              }
              onClick={() => onStatusUpdate(order.id, status)}
              className={cn(
                'flex-1',
                status === OrderStatus.READY &&
                  'bg-green-600 hover:bg-green-700',
                status === OrderStatus.CONFIRMED &&
                  'bg-blue-600 hover:bg-blue-700',
                status === OrderStatus.PREPARING &&
                  'bg-orange-600 hover:bg-orange-700',
              )}
            >
              {actionLabels[status]}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
