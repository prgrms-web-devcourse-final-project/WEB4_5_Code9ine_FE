'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { NotificationTitle } from '@/api/notification';
import { markNotificationAsRead } from '@/api/notification';
import Modal from './Modal';

interface NotificationBoxProps {
  onClose: () => void;
  notifications: NotificationTitle[];
}

export default function NotificationBox({
  onClose,
  notifications,
}: NotificationBoxProps) {
  const [selected, setSelected] = useState<NotificationTitle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        selected &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSelected(null);
      }
    }
    if (selected) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected]);

  // 알림 읽음 처리 함수 (재사용 가능)
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
    } finally {
      setSelected(null);
    }
  };

  // 즉시 장착 처리 함수 (예시)
  const handleEquip = (notificationId: number) => {
    // TODO: 장착 로직 구현
    console.log('장착:', notificationId);
    setSelected(null);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="absolute top-[40px] right-[3px] z-50 w-[300px] cursor-default rounded-lg bg-white p-4 shadow-lg md:right-[-100px] dark:bg-[#1e1e1e]"
      >
        {/* 헤더 */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[var(--text-color)]">
            알림
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <IoMdClose className="text-[20px] text-[var(--gray-color-2)] hover:text-[var(--text-color)]" />
          </button>
        </div>

        {/* 알림 리스트 */}
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-[var(--gray-color-2)]">
              새로운 알림이 없습니다.
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.notificationId}
                onClick={() => {
                  if (item.type === 'TITLE') {
                    setSelected(item);
                  }
                }}
                className="mb-2 cursor-pointer rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <p className="text-[var(--text-color)]">{item.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TITLE 타입일 때만 모달 표시 */}
      {selected?.type === 'TITLE' && (
        <Modal
          title={<span className="text-[var(--text-color)]">칭호 획득</span>}
          description={selected.message}
          buttons={
            <div className="flex w-full gap-2">
              {/* 확인 버튼 */}
              <button
                onClick={() =>
                  selected && handleMarkAsRead(selected.notificationId)
                }
                className="flex-1 cursor-pointer rounded-[5px] bg-[var(--point-color-1)] px-4 py-1 text-[var(--text-color)] hover:bg-[var(--point-color-2)]"
              >
                확인
              </button>
              {/* 즉시 장착 버튼 */}
              <button
                onClick={() => selected && handleEquip(selected.notificationId)}
                className="flex-1 cursor-pointer rounded-[5px] bg-[var(--main-color-1)] px-4 py-1 text-[var(--text-color)] hover:bg-[var(--main-color-3)]"
              >
                즉시 장착
              </button>
            </div>
          }
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
