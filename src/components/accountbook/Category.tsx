import CategoryButton from './CategoryButton';

export default function Category() {
  const paidCategoryTag = [
    '식비',
    '교통',
    '여가',
    '경조사',
    '쇼핑',
    '교육',
    '생활',
    '건강',
    '주거/통신',
    '기타',
  ];

  const incomeCategoryTag = ['급여', '용돈', '기타'];
  return (
    <>
      <div className="mt-[40px] grid size-[300px] grid-cols-3 gap-x-[10px] gap-y-[20px] rounded-[10px] px-[20px] py-[40px] shadow-md">
        {paidCategoryTag.map((v, i) => (
          <CategoryButton category={v} key={i} />
        ))}
      </div>
    </>
  );
}
