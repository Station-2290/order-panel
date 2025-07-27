import { LogOut, RefreshCw, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/shared/auth'
import { cn } from '@/lib/utils'

interface MobileHeaderProps {
  title: string
  subtitle?: string
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function MobileHeader({
  title,
  subtitle,
  onRefresh,
  isRefreshing,
}: MobileHeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Title and subtitle */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-4">
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw
                className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
              />
            </Button>
          )}

          {/* User menu */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
                <User className="h-3 w-3 text-gray-600" />
                <span className="text-xs text-gray-600 max-w-20 truncate">
                  {user.username}
                </span>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 w-8 p-0 text-gray-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
