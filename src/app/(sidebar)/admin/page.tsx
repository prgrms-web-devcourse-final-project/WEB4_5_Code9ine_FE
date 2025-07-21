import ManagePlaces from "@/components/admin/ManagePlaces";
import ManageUsers from "@/components/admin/ManageUsers";
import TodayStats from "@/components/admin/TodayStats";

export default function Page() {
  return (
    <>
      <TodayStats />
      <ManageUsers />
      <ManagePlaces />
    </>
  )
}