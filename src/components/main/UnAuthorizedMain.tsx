import Image from 'next/image';
import rank1 from '@/assets/mainpage/rank1.png';
import rank2 from '@/assets/mainpage/rank2.png';
import rank3 from '@/assets/mainpage/rank3.png';
import mascot from '@/assets/mainpage/mascot.png';
import waffle from '@/assets/mainpage/waffle.png';
import gimbap from '@/assets/mainpage/gimbap.png';
import selectaccount from '@/assets/mainpage/selectaccount.png';
import chatbot from '@/assets/mainpage/chatbot.png';
import bubble from '@/assets/mainpage/bubble.svg';
import robot from '@/assets/mainpage/robot.svg';
import godplace from '@/assets/mainpage/godplace.png';
import girl from '@/assets/mainpage/girl.png';
import boy from '@/assets/mainpage/boy.png';
import board from '@/assets/mainpage/board.png';
import { CiSearch } from 'react-icons/ci';
import { BsPersonUp } from 'react-icons/bs';
import SpendingGraph from './SpendingGraph';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function UnAuthorizedMain() {
  return (
    <>
      <div className="mx-auto mt-[15px] flex min-w-[350px] flex-col items-center gap-[150px] rounded-[10px] bg-[var(--white-color)] pt-[70px] md:mt-[0px] md:h-[870px] md:w-[1200px] md:overflow-y-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="md:text-[32px]">
            지금까지 티태 유저가 절약한 금액
            <span className="text-[var(--main-color-3)]">
              {' '}
              <CountUp
                start={0}
                end={123456789}
                duration={2}
                separator=","
                suffix="원"
              />
            </span>
          </p>
        </motion.div>
        {/* 지출그래프 */}
        <motion.div
          className="flex w-full flex-col items-center py-[30px] md:h-[430px] md:w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SpendingGraph userAmount={1200000} titaeAmount={700000} />
        </motion.div>

        {/* 이번주 티태왕 TOP3 */}
        <motion.div
          className="mt-8 flex flex-col items-center md:w-[910px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-15 md:text-[32px]">
            이번주 티태왕
            <span className="text-[var(--main-color-3)]">TOP3</span>
          </p>

          <div className="flex w-full items-end justify-evenly gap-[30px] overflow-x-auto px-2 md:justify-between md:px-0">
            {[2, 1, 3].map((rank) => {
              const lift = rank === 1 ? 'mb-8 md:mb-16' : '';
              return (
                <div
                  key={rank}
                  className={`flex flex-col items-center ${lift}`}
                >
                  <div
                    className={`relative h-[80px] w-[80px] rounded-full bg-gray-200 md:h-[180px] md:w-[180px]`}
                  >
                    <div
                      className={`absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--main-color-3)] text-[12px] font-bold text-white md:h-10 md:w-10 md:text-[24px]`}
                    >
                      {rank}
                    </div>
                  </div>
                  <p className="mt-1 text-[14px] text-[var(--text-color)] md:text-[18px]">
                    사용자 {rank}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
        {/* 유저챌린지 */}
        <motion.div
          className="flex flex-col items-center gap-8 md:gap-13"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[16px] md:text-[32px]">
            유저들이 가장 많이 달성한
            <span> 챌린지</span>
            <span className="text-[var(--main-color-3)]"> TOP3</span>
          </p>

          {/* 1위 */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative h-[50px] w-[50px] md:h-[90px] md:w-[90px]">
              <Image
                src={rank1}
                alt="가장많이한챌린지1"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[14px] md:text-[20px]">
              1만원으로 하루 살아보기!
            </p>
          </div>

          {/* 2위 */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative h-[50px] w-[50px] md:h-[90px] md:w-[90px]">
              <Image
                src={rank2}
                alt="가장많이한챌린지2"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[14px] md:text-[20px]">
              하루 식비카테고리 0원 달성
            </p>
          </div>

          {/* 3위 */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative h-[50px] w-[50px] md:h-[90px] md:w-[90px]">
              <Image
                src={rank3}
                alt="가장많이한챌린지3"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[14px] md:text-[20px]">
              오늘 사용한 영수증 인증하기
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 px-4 text-center md:px-0"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-[122px] w-[100px] md:h-[172px] md:w-[140px]">
            <Image
              src={mascot}
              alt="마스코트"
              fill
              className="object-contain"
            />
          </div>

          <p className="mt-[20px] text-[16px] md:mt-[30px] md:text-[24px]">
            이제껏 경험 못했던{' '}
            <span className="text-[var(--main-color-3)]">
              챌린지와 함께하는 가계부
            </span>
          </p>

          <p className="text-[16px] md:text-[24px]">
            티태와 즐겁게 가계부를 작성해보시는건 어떨까요?
          </p>
        </motion.div>

        {/* 챌린지 소개란 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mt-[30px] md:text-[32px]">
            내 돈 관리,
            <span className="text-[var(--main-color-3)]"> 챌린지</span>와 함께
            즐겁게!
          </p>
        </motion.div>

        {/* 가계부 소개란 */}
        <motion.div
          className="flex flex-col items-center justify-between gap-[130px] md:flex-row md:items-start"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 왼쪽 블록 */}
          <div className="flex flex-col gap-[10px]">
            <p className="md:text-[24px]">
              <span className="text-[var(--main-color-3)]">가계부</span> 내역은
              <br />
              쉽고, 명료하게
            </p>

            <p className="flex gap-2 text-[var(--main-color-3)] md:text-[20px]">
              <Image
                src={selectaccount}
                alt="가계부"
                width={22}
                height={22}
                className="md:h-[32px] md:w-[32px]"
              />
              가계부 서비스
            </p>
            <p className="md:text-[24px]">
              쉽고 간편하게 작성 가능한
              <br />
              원터치 가계부
            </p>
            <p className="text-[var(--main-color-3)] md:text-[20px]">
              티태의 쓰기 쉬운 가계부를 만나보세요
            </p>
          </div>

          {/* 오른쪽 블록 */}
          <div className="flex flex-col items-center">
            <p className="md:text-[20px]">
              0월 0일까지의 총 수입 금액은{' '}
              <span className="text-[var(--main-color-3)]">XXX</span>원이에요
            </p>
            <p className="mb-[55px] md:text-[20px]">
              0월 0일까지의 총 지출 금액은{' '}
              <span className="text-[var(--point-color-1)]">XXX</span>원이에요
            </p>
            <Image src={waffle} alt="가계부예시" width={316} height={96} />
            <Image src={gimbap} alt="가계부예시" width={316} height={96} />
          </div>
        </motion.div>

        {/* 챗봇 */}
        <motion.div
          className="flex flex-col-reverse items-center gap-6 md:flex-row md:items-center md:gap-[130px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mt-6 flex flex-col gap-[10px] md:mt-0">
            <div className="flex items-center gap-2">
              <Image
                src={robot}
                alt="로봇이미지"
                width={32}
                height={32}
                className="md:h-[42px] md:w-[42px]"
              />
              <p className="text-[var(--main-color-3)] md:text-[20px]">
                자산 관리 AI 비서
              </p>
            </div>
            <p className="md:text-[24px]">AI를 활용한 똑똑한 자산 관리</p>
            <p className="text-[var(--main-color-3)] md:text-[20px]">
              티태에게 무엇이든 물어보세요.
              <br />
              명쾌한 해답을 알려줄거에요.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <Image src={chatbot} alt="챗봇" width={150} height={258} />
            <div className="relative h-[95px] w-[210px]">
              <Image
                src={bubble}
                alt="말풍선"
                fill
                className="object-contain"
              />
              <p className="absolute inset-0 flex flex-col items-center justify-center text-center leading-snug md:text-[20px]">
                티태에게 자산관리에 대해
                <br />
                무엇이든 물어보세요!
              </p>
            </div>
          </div>
        </motion.div>

        {/* 갓플레이스 */}
        <motion.div
          className="flex flex-col items-center gap-[20px] md:flex-row md:gap-[100px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col gap-[10px]">
            <p className="text-[16px] md:text-[24px]">
              티태는 <span className="text-[var(--main-color-3)]">가성비</span>{' '}
              있는 장소들도
              <br />
              살펴볼 수 있는 공간도 있어요.
            </p>
            <div className="flex items-center">
              <CiSearch className="h-[24px] w-[32px] text-[var(--main-color-3)] md:h-[32px] md:w-[42px]" />
              <p className="text-[14px] text-[var(--main-color-3)] md:text-[20px]">
                검색 서비스
              </p>
            </div>
            <p className="text-[14px] text-[var(--main-color-3)] md:text-[24px]">
              동 단위로 지역을 검색해서
              <br />
              가성비있는 장소를 탐색
            </p>
            <p className="text-[14px] text-[var(--main-color-3)] md:text-[24px]">
              이제부터 티태와 함께
              <br />
              착한 가게를 찾고 돈을 절약해요.
            </p>
          </div>

          <div className="flex w-full justify-center md:w-auto">
            <Image
              src={godplace}
              alt="갓플레이스"
              className="h-auto w-[200px] md:h-[442px] md:w-[390px]"
            />
          </div>
        </motion.div>

        {/* 게시판 */}
        <motion.div
          className="flex flex-col items-center gap-[30px] md:flex-row"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex max-w-[400px] flex-col gap-[10px]">
            <p className="md:text-[24px]">
              <span className="text-[var(--main-color-3)]">게시판</span>에서
              나만의 장소를
              <br />
              서로 공유해보세요.
            </p>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[2px]">
                <BsPersonUp className="h-[22px] w-[32px] text-[var(--main-color-3)] md:h-[32px] md:w-[42px]" />
                <p className="text-[var(--main-color-3)] md:text-[20px]">
                  커뮤니티 서비스
                </p>
              </div>
              <p className="md:text-[24px]">다양한 유저들과 즐거운 커뮤니티</p>
              <p className="text-[var(--main-color-3)] md:text-[24px]">
                내가 찾은 갓플을 공유해요.
                <br />
                다른 유저들이 쓴 갓플 게시물도 저장할 수 있어요.
              </p>
            </div>
            <div className="flex gap-1">
              <Image
                src={girl}
                alt="여자"
                width={86}
                height={46}
                className="h-[96px] w-[66px]"
              />
              <Image
                src={boy}
                alt="남자"
                width={86}
                height={46}
                className="h-[96px] w-[66px]"
              />
              <Image
                src={girl}
                alt="여자"
                width={86}
                height={46}
                className="h-[96px] w-[66px]"
              />
              <Image
                src={boy}
                alt="남자"
                width={86}
                height={46}
                className="h-[96px] w-[66px]"
              />
            </div>
          </div>

          <div>
            <Image src={board} alt="게시판" width={360} height={300} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
