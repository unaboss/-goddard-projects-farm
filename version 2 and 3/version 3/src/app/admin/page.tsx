import { redirect } from 'next/navigation';
import { getAdminFromCookies } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const isAuthenticated = await getAdminFromCookies();
  if (!isAuthenticated) redirect('/admin/login');
  return <AdminDashboard />;
}
