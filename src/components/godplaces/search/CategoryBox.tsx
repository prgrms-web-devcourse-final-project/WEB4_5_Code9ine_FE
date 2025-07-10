import categories from '../../../data/categories.json';
import CategoryItem from './CategoryItem';

export default function CategoryBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const divSizeVariants = {
    beforeSearch: 'gap-[15px] md:h-[37px] md:w-[727px]',
    afterSearch: 'gap-[10px] md:h-[37px] md:w-[687px]',
  };

  return (
    <div className={`flex place-content-center ${divSizeVariants[classType]}`}>
      {categories.category.map((data) => (
        <CategoryItem key={data.id} type={data.type} classType={classType} />
      ))}
    </div>
  );
}
