import categories from '../../../data/categories.json';
import CategoryItem from './CategoryItem';

export default function CategoryBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch:
      'gap-x-[7px] gap-y-[8px] md:gap-[15px] h-[59px] w-[253px] md:h-[37px] md:w-[727px] grid-cols-[auto_auto_auto_auto_auto]',
    afterSearch:
      'gap-x-[7px] gap-y-[5px] md:gap-[10px] h-[59px] md:h-[37px] w-[291px] md:w-[687px] grid-cols-[auto_auto_auto_auto_auto]',
  };

  return (
    <div
      className={`grid place-content-center md:flex ${divSizeVariants[classType]}`}
    >
      {categories.category.map((data) => (
        <CategoryItem key={data.id} type={data.type} classType={classType} />
      ))}
    </div>
  );
}
