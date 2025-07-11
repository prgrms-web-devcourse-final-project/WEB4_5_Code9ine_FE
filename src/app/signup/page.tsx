import SignupBox from '@/components/signup/signup';
import loginbg from '@/assets/loginbg.png';

export default function Login() {
  return (
    <div
      className="flex h-[900px] w-[1366px] items-center justify-center rounded-[20px] bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg.src})` }}
    >
      <SignupBox />
    </div>
  );
}
