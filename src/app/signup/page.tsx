import SignupBox from '@/components/signup/signup';
import loginbg from '@/assets/loginbg.png';

export default function Login() {
  return (
    <div
      className="mx-auto flex h-screen w-full items-center justify-center rounded-[20px] bg-cover bg-center md:h-[900px] md:w-[1366px]"
      style={{ backgroundImage: `url(${loginbg.src})` }}
    >
      <SignupBox />
    </div>
  );
}
