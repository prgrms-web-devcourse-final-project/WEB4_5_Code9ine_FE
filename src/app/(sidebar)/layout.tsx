import LayoutClient from '@/components/layout/LayoutClient';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <LayoutClient>{children}</LayoutClient>
    </>
  );
}
