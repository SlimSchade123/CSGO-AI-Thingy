import { useUIStore } from '@/store/useUIStore'
import { RootLayout } from '@/components/layout/RootLayout'
import { OpenCaseModal } from '@/components/cases/OpenCaseModal'
import { CasesPage } from '@/components/cases/CasesPage'
import { InventoryPage } from '@/components/inventory/InventoryPage'
import { StatsPage } from '@/components/stats/StatsPage'
import { HistoryPage } from '@/components/history/HistoryPage'

function PageContent() {
  const activePage = useUIStore((s) => s.activePage)

  switch (activePage) {
    case 'cases':
      return <CasesPage />
    case 'inventory':
      return <InventoryPage />
    case 'stats':
      return <StatsPage />
    case 'history':
      return <HistoryPage />
    default:
      return <CasesPage />
  }
}

export default function App() {
  const activeCaseId = useUIStore((s) => s.activeCaseId)

  return (
    <RootLayout>
      <PageContent />
      {activeCaseId && <OpenCaseModal />}
    </RootLayout>
  )
}
