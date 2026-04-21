import { redirect } from 'next/navigation';

export default function AdminRoot() {
  // In a real app, check session here. For now, redirect to dashboard.
  redirect('/admin/dashboard');
}
