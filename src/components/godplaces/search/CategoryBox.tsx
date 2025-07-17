import categories from '../../../data/categories.json';
import CategoryItem from './CategoryItem';

export default function CategoryBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch:
      'gap-x-[7px] gap-y-[8px] md:gap-[15px] h-[59px] min-w-[253px] md:h-[37px] md:w-[727px] grid-cols-[repeat(auto-fit,minmax(52.58px,1fr))] md:grid-cols-[auto_auto_auto_auto_auto_auto] place-content-center px-[59px] md:px-[0px]',
    afterSearch:
      'gap-x-[7px] gap-y-[8px] mb-[3px] md:mb-0 md:gap-[10px] h-[59px] md:h-[37px] min-w-[253px] md:w-[687px] md:grid-cols-[auto_auto_auto_auto_auto_auto] grid-cols-[repeat(auto-fit,minmax(52.58px,1fr))]  md:px-[0px] px-[15px]',
  };

  return (
    <div className={`grid md:flex ${divSizeVariants[classType]} h-auto w-full`}>
      {categories.category.map((data) => (
        <CategoryItem
          key={data.id}
          type={data.type}
          classType={classType}
        />
      ))}
    </div>
  );
}
