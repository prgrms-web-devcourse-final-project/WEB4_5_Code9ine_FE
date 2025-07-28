'use client';
import { getTodayStats } from '@/api/admin';
import ManageStores from '@/components/admin/ManageStores';
import ManageUsers from '@/components/admin/ManageUsers';
import TodayStats from '@/components/admin/TodayStats';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await getTodayStats();
        console.log(response.code === '4010');
        if (response.code === '4010') {
          router.replace('/not-found');
        } else {
          setChecked(true);
        }
      } catch (e) {
        console.error(e);
        router.replace('/not-found');
      }
    };

    checkAccess();
  }, []);

  if (!checked) return null;

  return (
    <>
      <TodayStats />
      <ManageUsers />
      <ManageStores />
    </>
  );
}
