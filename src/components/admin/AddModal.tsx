'use client';
import { postNewStore } from '@/api/admin';
import { ChangeEvent, FormEvent, startTransition, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';

export default function AddModal({
  setIsShowAddModal,
}: {
  setIsShowAddModal: (state: boolean) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    category: '',
    menus: [
      { name: '', price: 0 },
      { name: '', price: 0 },
      { name: '', price: 0 },
    ],
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const menuMatch = name.match(/^menu(\d)_(name|price)$/);
    if (menuMatch) {
      const index = parseInt(menuMatch[1], 10) - 1;
      const key = menuMatch[2];

      setForm((prev) => {
        const updatedMenus = [...prev.menus];
        updatedMenus[index] = {
          ...updatedMenus[index],
          [key]: key === 'price' ? Number(value) : value,
        };
        return { ...prev, menus: updatedMenus };
      });
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, address, category, menus } = form;

    if (!name.trim()) return toast.error('가게 이름을 입력해야 합니다.');
    if (!address.trim()) return toast.error('가게 주소를 입력해야 합니다.');
    if (!category.trim()) return toast.error('카테고리를 선택해야 합니다.');

    const menu1 = menus[0];

    if (!menu1.name.trim() || menu1.price < 0) {
      toast.error('1개의 메뉴 이름과 가격은 입력해야 합니다.');
      return;
    }

    const validMenus = menus.filter((m) => m.name.trim() && m.price >= 0);

    const submissionData = {
      name,
      address,
      category,
      menus: validMenus,
    };

    // console.log('제출할 데이터:', submissionData);

    try {
      startTransition(async () => {
        const response = await postNewStore(submissionData);
        if (response.code === '0000') {
          toast.success('갓플 등록 완료');
          setIsShowAddModal(false);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
        <div className="flex w-[500px] flex-col gap-[15px] rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-[var(--shadow-md)]">
          <div className="flex">
            <h1 className="flex-[95%] pl-[20px] text-center text-[20px] font-semibold">
              착한가게 추가하기
            </h1>
            <button
              type="button"
              onClick={() => setIsShowAddModal(false)}
              className="flex-[5%] cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>
          <form
            className="flex flex-col gap-[10px]"
            onSubmit={submitHandler}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <div className="">
              <label>
                가게 이름 :{' '}
                <input
                  name="name"
                  type="text"
                  className="w-[80%]"
                  onChange={changeHandler}
                  value={form.name}
                />
              </label>
            </div>

            <div>
              <label>
                가게 주소 :{' '}
                <input
                  name="address"
                  type="text"
                  className="w-[80%]"
                  onChange={changeHandler}
                  value={form.address}
                />
              </label>
            </div>

            <div>
              <label>
                카테고리 :{' '}
                <select
                  name="category"
                  value={form.category}
                  onChange={changeHandler}
                >
                  <option value={''}>선택</option>
                  <option value={'한식'}>한식</option>
                  <option value={'중식'}>중식</option>
                  <option value={'일식'}>일식</option>
                  <option value={'양식'}>양식</option>
                  <option value={'미용업'}>미용</option>
                  <option value={'세탁업'}>세탁</option>
                  <option value={'숙박업'}>숙박</option>
                </select>
              </label>
            </div>

            {form.menus.map((menu, idx) => (
              <div className="flex gap-2" key={idx}>
                <label>
                  메뉴{idx + 1} 이름:{' '}
                  <input
                    type="text"
                    className="w-[60%]"
                    name={`menu${idx + 1}_name`}
                    value={menu.name}
                    onChange={changeHandler}
                  />
                </label>
                <label>
                  메뉴{idx + 1} 가격:{' '}
                  <input
                    type="number"
                    className="w-[60%]"
                    name={`menu${idx + 1}_price`}
                    value={menu.price.toString()}
                    onChange={changeHandler}
                  />
                </label>
              </div>
            ))}

            <button
              type="submit"
              className={`mt-[10px] cursor-pointer rounded-[20px] bg-[var(--main-color-2)] px-[10px] text-[#2b2e34]`}
            >
              등록
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
