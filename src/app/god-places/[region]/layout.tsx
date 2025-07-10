import Box from '@/components/layout/box';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-[870px] w-[756px]">{children}</div>
      <Box />
    </>
  );
}
