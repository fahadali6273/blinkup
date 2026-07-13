import { redirect } from 'next/navigation'

export default function AdminIndexPage() {
  // redirect to dashboard by default
  redirect('/admin/dashboard')
}