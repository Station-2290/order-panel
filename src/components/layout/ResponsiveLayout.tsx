import Header from '../Header';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import type { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: ReactNode;
  mobileTitle?: string;
  mobileSubtitle?: string;
  onMobileRefresh?: () => void;
  isMobileRefreshing?: boolean;
}

export function ResponsiveLayout({ 
  children, 
  mobileTitle = 'Панель заказов',
  mobileSubtitle,
  onMobileRefresh,
  isMobileRefreshing 
}: ResponsiveLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <MobileHeader
          title={mobileTitle}
          subtitle={mobileSubtitle}
          onRefresh={onMobileRefresh}
          isRefreshing={isMobileRefreshing}
        />
        <main className={cn(
          'flex-1 overflow-auto',
          'pb-16', // Space for bottom navigation
        )}>
          {children}
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}