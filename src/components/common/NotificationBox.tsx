'use client';

import React from 'react';
import { IoMdClose } from 'react-icons/io';
import type { NotificationTitle } from '@/api/notification';

interface NotificationBoxProps {
  onClose: () => void;
  notifications: NotificationTitle[];
}

export default function NotificationBox({
  onClose,
  notifications,
}: NotificationBoxProps) {
  return (
    <div className="absolute top-[40px] right-[3px] z-50 w-[300px] cursor-default rounded-lg bg-white p-4 shadow-lg md:right-[-100px] dark:bg-[#1e1e1e]">
      {/* 상단 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-[var(--text-color)]">
          알림
        </h2>
        <button onClick={onClose} className="cursor-pointer">
          <IoMdClose className="text-[20px] text-[var(--gray-color-2)] hover:text-[var(--text-color)]" />
        </button>
      </div>

      {/* 알림 목록 */}
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-[var(--gray-color-2)]">
            새로운 알림이 없습니다.
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.notificationId}
              className="mb-2 rounded-md bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800"
            >
              <p className="text-[var(--text-color)]">{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
