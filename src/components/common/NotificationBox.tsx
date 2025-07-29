'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { NotificationTitle } from '@/api/notification';
import {
  equipTitle,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/api/notification';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

interface NotificationBoxProps {
  onClose: () => void;
  notifications: NotificationTitle[];
  onRefresh: () => void;
}

export default function NotificationBox({
  onClose,
  notifications,
  onRefresh,
}: NotificationBoxProps) {
  const [selected, setSelected] = useState<NotificationTitle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selected]);

  // 알림 읽음 처리 함수
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);
      onRefresh();
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
    } finally {
      setSelected(null);
    }
  };

  const handleEquip = async (aTId: number) => {
    try {
      console.log(aTId);
      const result = await equipTitle(aTId);
      console.log('장착 완료:', result.equippedTitle);
      router.push('/profile');
    } catch (err) {
      console.error('즉시 장착 실패:', err);
    } finally {
      setSelected(null);
    }
  };

  // 전체읽음

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      onRefresh();
    } catch (err) {
      console.error('전체 알림 읽음 실패:', err);
    }
  };

  return (
    <>
      {/* 알림 드롭다운 컨테이너 */}
      <div
        ref={containerRef}
        className="absolute top-[40px] right-[3px] z-50 w-[300px] cursor-default rounded-lg bg-[var(--white-color)] p-4 shadow-lg md:top-[-10px] md:right-[-100px]"
      >
        {/* 헤더 */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[var(--text-color)]">
            알림
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllAsRead}
              className="cursor-pointer text-xs text-[var(--text-color)] hover:text-[var(--text-color)]"
            >
              전체읽음
            </button>
            <button onClick={onClose} className="cursor-pointer">
              <IoMdClose className="text-[20px] text-[var(--gray-color-2)] hover:text-[var(--text-color)]" />
            </button>
          </div>
        </div>

        {/* 알림 리스트 */}
        <div className="hide-scrollbar max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-[var(--gray-color-2)]">
              새로운 알림이 없습니다.
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.notificationId}
                onClick={() => setSelected(item)}
                className="mb-2 cursor-pointer rounded-md bg-[var(--main-color-2)] px-3 py-2 text-sm transition-colors hover:bg-[var(--main-color-3)]"
              >
                <p className="text-[var(--text-color)]">{item.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TITLE 타입일 때 모달 표시 */}
      {selected && (
        <Modal
          title={<span className="text-[var(--text-color)]">알림</span>}
          description={selected.message}
          buttons={
            <div className="flex w-full gap-2">
              {/* 확인 버튼 (모든 타입에 대해 표시) */}
              <button
                onClick={() => handleMarkAsRead(selected.notificationId)}
                className="flex-1 cursor-pointer rounded-[5px] bg-[var(--point-color-1)] px-4 py-1 text-[var(--text-color)] hover:bg-[var(--point-color-2)]"
              >
                확인
              </button>

              {/* 즉시 장착 버튼은 TITLE일 때만 표시 */}
              {selected.type === 'TITLE' && (
                <button
                  onClick={() => handleEquip(selected.atid)}
                  className="flex-1 cursor-pointer rounded-[5px] bg-[var(--main-color-1)] px-4 py-1 text-[var(--text-color)] hover:bg-[var(--main-color-3)]"
                >
                  즉시 장착
                </button>
              )}
            </div>
          }
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
