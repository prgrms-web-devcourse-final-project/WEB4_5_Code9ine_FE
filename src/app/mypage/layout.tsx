import Layout from '@/components/layout/splitBox';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-[870px] w-[756px] rounded-[10px] bg-white shadow-md">
        {children}
      </div>
      <Layout />
    </>
  );
}
