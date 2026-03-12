import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { BalanceBar } from './BalanceBar'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <BalanceBar />
        <main className="flex-1 overflow-hidden flex flex-col pb-14 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  )
}
