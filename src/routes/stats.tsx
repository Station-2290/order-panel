import { createFileRoute } from '@tanstack/react-router'
import { BarChart3, Clock, DollarSign, TrendingUp } from 'lucide-react'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const Route = createFileRoute('/stats')({
  component: StatsComponent,
})

function StatsComponent() {
  useDocumentTitle({
    title: 'Статистика',
    description:
      'Статистика и аналитика работы кофейни - количество заказов, выручка, среднее время обслуживания',
    keywords: 'статистика, аналитика, заказы, выручка, кофейня',
  })
  return (
    <ResponsiveLayout mobileTitle="Статистика">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Статистика заказов</h1>
          <p className="text-muted-foreground">Аналитика работы за сегодня</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Всего заказов
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+12% от вчера</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выручка</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₽3,240</div>
              <p className="text-xs text-muted-foreground">+8% от вчера</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ср. время</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 мин</div>
              <p className="text-xs text-muted-foreground">-2 мин от вчера</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Рост</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">К прошлой неделе</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Функция в разработке</CardTitle>
            <CardDescription>
              Подробная статистика и графики будут доступны в следующих версиях
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </ResponsiveLayout>
  )
}
