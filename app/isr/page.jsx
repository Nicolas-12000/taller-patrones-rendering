import QuakePage from '@/components/QuakePage'

export const revalidate = 60

export default function IsrPage() {
  return <QuakePage slug="isr" where="Servidor (se regenera cada 60 s)" fetchOptions={{ next: { revalidate: 60 } }} />
}
