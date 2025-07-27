import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Toaster } from '../components/ui/sonner'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
      <Toaster />
    </ProtectedRoute>
  ),
})
