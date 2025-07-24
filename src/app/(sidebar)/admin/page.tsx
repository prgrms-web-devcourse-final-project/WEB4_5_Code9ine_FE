import ManageStores from '@/components/admin/ManageStores';
import ManageUsers from '@/components/admin/ManageUsers';
import TodayStats from '@/components/admin/TodayStats';

export default function Page() {
  return (
    <>
      <TodayStats />
      <ManageUsers />
      <ManageStores />
    </>
  );
}
