import { Link } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@/shared/auth'

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between border-b">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Главная</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/orders">Заказы</Link>
        </div>
      </nav>
      
      <div className="flex items-center gap-2">
        {user && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span>{user.username}</span>
            <span className="text-muted-foreground">({user.role})</span>
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </div>
    </header>
  )
}
