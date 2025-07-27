import { CheckCircle, Clock, Coffee, Timer, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/types/order'
import { cn } from '@/lib/utils'

interface OrderFiltersProps {
  selectedStatus: OrderStatus | 'ALL'
  onStatusChange: (status: OrderStatus | 'ALL') => void
  orderCounts: Record<OrderStatus | 'ALL', number>
}

const filterConfig = {
  ALL: {
    label: 'Все',
    icon: null,
    color: 'bg-gray-100 text-gray-800',
  },
  [OrderStatus.PENDING]: {
    label: 'Ожидают',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800',
  },
  [OrderStatus.CONFIRMED]: {
    label: 'Подтверждены',
    icon: CheckCircle,
    color: 'bg-blue-100 text-blue-800',
  },
  [OrderStatus.PREPARING]: {
    label: 'Готовятся',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-800',
  },
  [OrderStatus.READY]: {
    label: 'Готовы',
    icon: Timer,
    color: 'bg-green-100 text-green-800',
  },
  [OrderStatus.COMPLETED]: {
    label: 'Выполнены',
    icon: CheckCircle,
    color: 'bg-gray-100 text-gray-800',
  },
  [OrderStatus.CANCELLED]: {
    label: 'Отменены',
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
  },
}

export function OrderFilters({
  selectedStatus,
  onStatusChange,
  orderCounts,
}: OrderFiltersProps) {
  return (
    <div className="p-4 bg-background border-b">
      <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-none">
        {Object.entries(filterConfig).map(([status, config]) => {
          const isSelected = selectedStatus === status
          const count = orderCounts[status as OrderStatus | 'ALL'] || 0
          const Icon = config.icon

          return (
            <Button
              key={status}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(status as OrderStatus | 'ALL')}
              className={cn(
                'flex items-center gap-2 relative flex-shrink-0',
                'mobile-filter-pill',
                !isSelected && 'hover:bg-muted',
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span className="whitespace-nowrap">{config.label}</span>
              {count > 0 && (
                <Badge
                  variant="secondary"
                  className={cn(
                    'ml-1 px-2 py-0 text-xs',
                    isSelected ? 'bg-white/20 text-white' : config.color,
                  )}
                >
                  {count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
