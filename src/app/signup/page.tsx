import SignupBox from '@/components/signup/signup';

export default function Login() {
  const gradient = `
    radial-gradient(
      circle,
      var(--main-color-3) 0%,
      var(--main-color-2) 32%,
      var(--main-color-1) 70%,
      var(--main-color-1) 100%
    )
  `;
  return (
    <div
      className="mx-auto flex h-screen w-full items-center justify-center rounded-[20px] bg-cover bg-center md:h-[900px] md:w-[1366px]"
      style={{ background: gradient }}
    >
      <SignupBox />
    </div>
  );
}
