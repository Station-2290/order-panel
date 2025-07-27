import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coffee, ShoppingBag, Clock } from 'lucide-react'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useIsMobile } from '@/hooks/use-mobile'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const isMobile = useIsMobile();
  
  useDocumentTitle({
    title: 'Главная',
    description: 'Панель управления заказами кофейни - система для баристы для управления заказами в реальном времени',
    keywords: 'панель заказов, главная, кофейня, управление заказами, бариста'
  });

  const content = (
    <div className={`container mx-auto p-6 space-y-8 ${isMobile ? 'max-w-none' : ''}`}>
      <div className="text-center space-y-4">
        <h1 className={`font-bold ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
          Панель заказов
        </h1>
        <p className={`text-muted-foreground ${isMobile ? 'text-base' : 'text-xl'}`}>
          Система управления заказами для баристы
        </p>
      </div>

      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Управление заказами
            </CardTitle>
            <CardDescription>
              Просматривайте, принимайте и обновляйте статусы заказов в реальном времени
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/orders">
                Перейти к заказам
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Быстрая работа
            </CardTitle>
            <CardDescription>
              Интерфейс оптимизирован для планшетов и быстрого обновления статусов
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Режим реального времени
            </CardTitle>
            <CardDescription>
              Новые заказы появляются автоматически без необходимости обновления страницы
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="px-8">
          <Link to="/orders">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Начать работу с заказами
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout mobileTitle="Главная">
      {content}
    </ResponsiveLayout>
  );
}
