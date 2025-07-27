import { Link, useLocation } from '@tanstack/react-router';
import { Home, ShoppingBag, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string | number;
}

interface MobileBottomNavProps {
  className?: string;
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      icon: Home,
      label: 'Главная',
      href: '/',
    },
    {
      icon: ShoppingBag,
      label: 'Заказы',
      href: '/orders',
    },
    {
      icon: BarChart3,
      label: 'Статистика',
      href: '/stats',
    },
    {
      icon: Settings,
      label: 'Настройки',
      href: '/settings',
    },
  ];

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'mobile-bottom-nav safe-area-pb',
      className
    )}>
      <div className="flex items-center justify-around px-2 py-1 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors',
                'min-h-[56px] min-w-[64px]', // Ensure proper touch targets
                'relative',
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  'h-5 w-5 transition-colors',
                  isActive ? 'text-blue-600' : 'text-gray-600'
                )} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-xs font-medium mt-1 transition-colors',
                isActive ? 'text-blue-600' : 'text-gray-600'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}