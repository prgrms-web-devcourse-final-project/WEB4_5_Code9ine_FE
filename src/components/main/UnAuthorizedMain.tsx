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

export default function UnAuthorizedMain() {
  return (
    <>
      <div className="mx-auto mt-[15px] flex min-w-[350px] flex-col items-center gap-[150px] overflow-y-auto rounded-[10px] bg-[var(--white-color)] pt-[70px] md:mt-[0px] md:h-[870px] md:w-[1200px]">
        <p className="md:text-[32px]">
          지금까지 티태 유저가 절약한 금액
          <span className="text-[var(--main-color-3)]"> 123,456,789원</span>
        </p>
        {/* 지출그래프 */}
        <div className="flex flex-col items-center py-[30px] md:h-[430px] md:w-full">
          <p className="mb-4 md:text-[24px]">지출그래프 통계</p>

          {/* 일반사용자 vs 티태사용자 막대 */}
          <div className="flex h-[200px] items-end justify-center gap-[50px] md:w-full md:gap-[350px]">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-[var(--point-color-1)] md:text-[20px]">
                123,456원
              </p>
              <div className="h-[100px] w-[50px] bg-[var(--point-color-1)] md:w-[105px]" />
            </div>

            <div className="flex flex-col items-center">
              <p className="mb-2 text-[var(--main-color-3)] md:text-[20px]">
                78,900원
              </p>
              <div className="h-[100px] w-[50px] bg-[var(--main-color-3)] md:w-[105px]" />
            </div>
          </div>

          {/* 구분선 */}
          <div className="mb-[30px] h-[2px] w-[300px] bg-[var(--text-color)] md:w-[910px]" />

          {/* 범례 */}
          <div className="flex items-center gap-[30px] md:gap-[300px]">
            {/* 일반 사용자 */}
            <div className="flex items-center gap-2">
              <div className="h-[10px] w-[30px] bg-[var(--point-color-1)] md:w-[70px]" />
              <span className="text-[var(--text-color)] md:text-[20px]">
                일반 소비자
              </span>
            </div>
            {/* 티태 사용자 */}
            <div className="flex items-center gap-2">
              <div className="h-[10px] w-[30px] bg-[var(--main-color-3)] md:w-[70px]" />
              <span className="text-[var(--text-color)] md:text-[20px]">
                티태 사용자
              </span>
            </div>
          </div>
        </div>

        {/* 이번주 티태왕 TOP3 */}
        <div className="mt-8 flex flex-col items-center md:w-[910px]">
          {/* 제목을 맨 위, 왼쪽 정렬 */}
          <p className="mb-15 md:text-[32px]">
            이번주 티태왕
            <span className="text-[var(--main-color-3)]">TOP3</span>
          </p>
          {/* 1등이 가운데 오도록 순서 2,1,3 */}
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
        </div>
        {/* 유저챌린지 */}
        <div className="flex flex-col gap-8 md:gap-13">
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
        </div>

        <div className="flex flex-col items-center gap-4 px-4 text-center md:px-0">
          {/* 반응형 이미지 */}
          <div className="relative h-[122px] w-[100px] md:h-[172px] md:w-[140px]">
            <Image
              src={mascot}
              alt="마스코트"
              fill
              className="object-contain"
            />
          </div>

          {/* 반응형 텍스트1 */}
          <p className="mt-[20px] text-[16px] md:mt-[30px] md:text-[24px]">
            이제껏 경험 못했던{' '}
            <span className="text-[var(--main-color-3)]">
              챌린지와 함께하는 가계부
            </span>
          </p>

          {/* 반응형 텍스트2 */}
          <p className="text-[16px] md:text-[24px]">
            티태와 즐겁게 가계부를 작성해보시는건 어떨까요?
          </p>
        </div>

        {/* 챌린지 소개란 */}
        <div>
          <p className="mt-[30px] md:text-[32px]">
            내 돈 관리,
            <span className="text-[var(--main-color-3)]"> 챌린지</span>와 함께
            즐겁게!
          </p>
        </div>

        {/* 가계부 소개란 */}
        <div className="flex flex-col items-start justify-between gap-[100px] md:flex-row">
          {/* 왼쪽 블록 */}
          <div className="space-y-4">
            <p className="mb-[30px] md:text-[24px]">
              <span className="text-[var(--main-color-3)]">가계부</span> 내역은
              <br />
              쉽고, 명료하게
            </p>
            <div>
              <p className="mb-[30px] flex text-[var(--main-color-3)] md:text-[20px]">
                <Image
                  src={selectaccount}
                  alt="가계부"
                  width={32}
                  height={32}
                />
                가계부 서비스
              </p>
              <p className="mb-[30px] md:text-[24px]">
                쉽고 간편하게 작성 가능한
                <br />
                원터치 가계부
              </p>
              <p className="text-[var(--main-color-3)] md:text-[20px]">
                티태의 쓰기 쉬운 가계부를 만나보세요
              </p>
            </div>
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
        </div>

        {/* 챗봇 */}
        <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:items-center md:gap-[130px]">
          {/* 모바일에서 위로 올라오는 텍스트 블록 */}
          <div className="mt-6 flex flex-col gap-[10px] md:mt-0">
            <div className="flex items-center gap-2">
              <Image src={robot} alt="로봇이미지" width={42} height={42} />
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

          {/* 챗봇 이미지 + 말풍선 (항상 가로로, 말풍선은 이미지 오른쪽) */}
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
        </div>

        {/* 갓플레이스 */}
        <div className="flex flex-col items-center gap-[20px] md:flex-row md:gap-[100px]">
          {/* 텍스트 블록 */}
          <div className="flex flex-col gap-[20px]">
            <p className="text-[16px] md:text-[24px]">
              티태는 <span className="text-[var(--main-color-3)]">가성비</span>{' '}
              있는 장소들도
              <br />
              살펴볼 수 있는 공간도 있어요.
            </p>
            <div className="flex items-center gap-2">
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

          {/* 이미지 블록 */}
          <div className="flex w-full justify-center md:w-auto">
            <Image
              src={godplace}
              alt="갓플레이스"
              className="h-auto w-[200px] md:h-[442px] md:w-[390px]"
            />
          </div>
        </div>

        {/* 게시판 */}
        <div className="flex flex-row items-start gap-[60px]">
          {/* 왼쪽 텍스트+아이콘 영역 */}
          <div className="flex max-w-[400px] flex-col gap-[30px]">
            <p className="text-[24px]">
              <span className="text-[var(--main-color-3)]">게시판</span>에서
              나만의 장소를
              <br />
              서로 공유해보세요.
            </p>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-center">
                <BsPersonUp className="h-[32px] w-[42px] text-[var(--main-color-3)]" />
                <p className="text-[20px] text-[var(--main-color-3)]">
                  커뮤니티 서비스
                </p>
              </div>
              <p className="text-[24px]">다양한 유저들과 즐거운 커뮤니티</p>
              <p className="text-[24px] text-[var(--main-color-3)]">
                내가 찾은 갓플을 공유해요.
                <br />
                다른 유저들이 쓴 갓플 게시물도 저장할 수 있어요.
              </p>
            </div>
            <div className="flex gap-1">
              <Image src={girl} alt="여자" width={86} height={46} />
              <Image src={boy} alt="남자" width={86} height={46} />
              <Image src={girl} alt="여자" width={86} height={46} />
              <Image src={boy} alt="남자" width={86} height={46} />
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div>
            <Image src={board} alt="게시판" width={360} height={300} />
          </div>
        </div>
      </div>
    </>
  );
}
