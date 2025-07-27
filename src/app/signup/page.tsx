import SignupBox from '@/components/signup/signup';

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
      className="mx-auto flex h-auto w-full items-center justify-center rounded-[20px] bg-cover bg-center md:h-[1200px] md:w-[1366px]"
      style={{ background: gradient }}
    >
      <SignupBox />
    </div>
  );
}
