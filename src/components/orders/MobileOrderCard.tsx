import {
  CheckCircle,
  ChevronRight,
  Clock,
  Coffee,
  ShoppingBag,
  Timer,
  User,
  XCircle,
} from 'lucide-react'
import type { Order } from '@/types/order'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/types/order'
import { cn } from '@/lib/utils'

interface MobileOrderCardProps {
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
    bgColor: 'bg-yellow-50',
    borderColor: 'border-l-yellow-500',
  },
  [OrderStatus.CONFIRMED]: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: CheckCircle,
    label: 'Подтвержден',
    actions: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-500',
  },
  [OrderStatus.PREPARING]: {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Coffee,
    label: 'Готовится',
    actions: [OrderStatus.READY],
    bgColor: 'bg-orange-50',
    borderColor: 'border-l-orange-500',
  },
  [OrderStatus.READY]: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    label: 'Готов',
    actions: [OrderStatus.COMPLETED],
    bgColor: 'bg-green-50',
    borderColor: 'border-l-green-500',
  },
  [OrderStatus.COMPLETED]: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: CheckCircle,
    label: 'Выполнен',
    actions: [],
    bgColor: 'bg-gray-50',
    borderColor: 'border-l-gray-400',
  },
  [OrderStatus.CANCELLED]: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    label: 'Отменен',
    actions: [],
    bgColor: 'bg-red-50',
    borderColor: 'border-l-red-500',
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

export function MobileOrderCard({
  order,
  onStatusUpdate,
  onViewDetails,
}: MobileOrderCardProps) {
  const config = statusConfig[order.status]
  const Icon = config.icon
  const createdAt = new Date(order.created_at)
  const timeAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60))

  const getTimeColor = (minutes: number) => {
    if (minutes < 5) return 'text-green-600'
    if (minutes < 15) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getQuickAction = () => {
    if (config.actions.length === 0) return null

    // Get the primary action (non-cancel)
    const primaryAction = config.actions.find(
      (action) => action !== OrderStatus.CANCELLED,
    )
    if (!primaryAction) return config.actions[0]

    return primaryAction
  }

  const quickAction = getQuickAction()

  return (
    <Card
      className={cn(
        'transition-all duration-200 border-l-4 active:scale-95 touch-manipulation',
        'mobile-card',
        config.borderColor,
        config.bgColor,
      )}
      onClick={() => onViewDetails(order)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">{order.order_number}</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <Badge className={cn('text-xs px-2 py-1', config.color)}>
              <Icon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600 mb-1">
              ₽{order.total_amount.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Timer className="w-3 h-3" />
              <span className={getTimeColor(timeAgo)}>
                {timeAgo < 1 ? 'сейчас' : `${timeAgo}м`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" />
              <span>{order.items?.length || 0}</span>
            </div>
            {order.customer && (
              <div className="flex items-center gap-1 truncate">
                <User className="w-4 h-4" />
                <span className="truncate max-w-24">
                  {order.customer.first_name} {order.customer.last_name}
                </span>
              </div>
            )}
          </div>
        </div>

        {order.notes && (
          <div className="mb-3 p-2 bg-white/50 rounded text-xs">
            <span className="font-medium">Примечания:</span> {order.notes}
          </div>
        )}

        {quickAction && (
          <div className="pt-2 border-t">
            <Button
              size="sm"
              variant={
                quickAction === OrderStatus.CANCELLED
                  ? 'destructive'
                  : 'default'
              }
              onClick={(e) => {
                e.stopPropagation()
                onStatusUpdate(order.id, quickAction)
              }}
              className={cn(
                'w-full',
                quickAction === OrderStatus.READY &&
                  'bg-green-600 hover:bg-green-700',
                quickAction === OrderStatus.CONFIRMED &&
                  'bg-blue-600 hover:bg-blue-700',
                quickAction === OrderStatus.PREPARING &&
                  'bg-orange-600 hover:bg-orange-700',
              )}
            >
              {actionLabels[quickAction]}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
