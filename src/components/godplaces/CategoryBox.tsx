import categories from '../../data/categories.json';
import CategoryItem from './CategoryItem';

export default function CategoryBox() {
  return (
    <div className="flex place-content-center place-items-center gap-[15px] md:h-[37px] md:w-[727px]">
      {categories.category.map((data) => (
        <CategoryItem key={data.id} type={data.type} />
      ))}
    </div>
  );
}
