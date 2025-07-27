import Loginbox from '@/components/login/loginbox';

export default function Login() {
  const gradient = `
  radial-gradient(
    circle,
    var(--login-gradient-color-1) 0%,
    var(--login-gradient-color-2) 32%,
    var(--login-gradient-color-3) 70%,
    var(--login-gradient-color-3) 100%
  )
`;
  return (
    <div
      className="mx-auto flex h-screen w-full items-center justify-center rounded-[20px] md:h-[900px] md:w-[1366px]"
      style={{ background: gradient }}
    >
      <Loginbox />
    </div>
  );
}
