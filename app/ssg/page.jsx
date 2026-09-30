import QuakePage from '@/components/QuakePage'

export const dynamic = 'force-static'

export default function SsgPage() {
  return <QuakePage slug="ssg" where="Build (una sola vez)" fetchOptions={{ cache: 'force-cache' }} />
}
