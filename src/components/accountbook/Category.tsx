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
      {paidCategoryTag.map((v, i) => (
        <CategoryButton category={v} key={i} />
      ))}
    </>
  );
}
