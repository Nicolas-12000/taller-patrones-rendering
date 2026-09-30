import { MonitorSmartphone, Server, Package, RefreshCw, Waves } from 'lucide-react'

const icons = {
  csr: MonitorSmartphone,
  ssr: Server,
  ssg: Package,
  isr: RefreshCw,
  streaming: Waves,
}

export default function PatternIcon({ slug, size = 22 }) {
  const Icon = icons[slug]
  return <Icon size={size} aria-hidden="true" />
}
