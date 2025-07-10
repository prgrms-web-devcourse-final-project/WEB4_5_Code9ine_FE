import categories from '../../data/categories.json';
import CategoryItem from './CategoryItem';

export default function CategoryBox({
  classType,
}: {
  classType: 'beforeSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'gap-[15px] md:h-[37px] md:w-[727px]',
  };

  return (
    <div
      className={`flex place-content-center place-items-center ${divSizeVariants[classType]}`}
    >
      {categories.category.map((data) => (
        <CategoryItem key={data.id} type={data.type} classType={classType} />
      ))}
    </div>
  );
}
