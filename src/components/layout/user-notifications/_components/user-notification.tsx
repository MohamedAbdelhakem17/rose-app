'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Bell,
  BellOff,
  BrushCleaning,
  CheckCheck,
  Check,
  EllipsisVertical,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import {
  NotificationContextType,
  NotificationType,
} from '@/lib/types/user-notification';
import useGetNotificationCount from '../_hooks/use-get-notification-count';
import useDeleteNotification from '../_hooks/use-delete-notification';
import useMarkNotificationRead from '../_hooks/use-read-notification';

// --------------------------------------
//  Context Setup
// --------------------------------------

const NotificationContext = createContext<NotificationContextType | null>(null);

const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error('useNotifications must be used within UserNotifications');
  return context;
};

// --------------------------------------
//  Provider
// --------------------------------------

export function UserNotifications({ children }: { children: React.ReactNode }) {
  // State
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

  // Query
  const { unreadNotificationCount } = useGetNotificationCount();

  // Mutation
  const { deleteNotificationRead } = useDeleteNotification();
  const { markNotificationRead } = useMarkNotificationRead();

  // Function
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const toggleOptions = (id: string) =>
    setActiveOptionId(prev => (prev === id ? null : id));

  return (
    <NotificationContext.Provider
      value={{
        unreadCount: unreadNotificationCount || 0,
        isMenuOpen,
        activeOptionId,
        toggleMenu,
        toggleOptions,
        deleteNotificationRead,
        markNotificationRead,
      }}
    >
      <div className='relative'>{children}</div>
    </NotificationContext.Provider>
  );
}

// --------------------------------------
//  Trigger (Bell Button)
// --------------------------------------

UserNotifications.Trigger = function Trigger() {
  // Hooks
  const { toggleMenu, unreadCount } = useNotifications();

  return (
    <button
      onClick={toggleMenu}
      className='relative text-zinc-700 hover:text-pink-500 transition-colors flex items-center justify-center'
    >
      {/* Notification icon */}
      <Bell className='size-5' />

      {/* Notifications Count */}
      {unreadCount > 0 && (
        <span className='absolute size-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center -top-1.5 -end-1 font-medium'>
          {unreadCount}
        </span>
      )}
    </button>
  );
};

// --------------------------------------
//  Menu
// --------------------------------------

UserNotifications.Menu = function Menu({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const { isMenuOpen } = useNotifications();

  if (!isMenuOpen) return null;

  return (
    <div className='w-80 overflow-hidden rounded-2xl shadow-lg absolute top-6 end-1 bg-white'>
      {children}
    </div>
  );
};

// --------------------------------------
//  Header
// --------------------------------------

UserNotifications.Header = function Header() {
  // Hooks
  const { unreadCount, deleteNotificationRead, markNotificationRead } =
    useNotifications();

  // Variables
  const disabled = unreadCount === 0;

  return (
    <>
      {/* Title */}
      <h3 className='bg-maroon-600 p-4 text-xl font-bold text-white'>
        Notifications {unreadCount > 0 && `(${unreadCount})`}
      </h3>

      {/* Action */}
      <div className='p-3 flex items-center justify-between border-b border-b-zinc-300 font-medium'>
        {/* Clear action */}
        <UserNotifications.Button
          onClick={() => deleteNotificationRead({ type: 'all' })}
          disabled={disabled}
        >
          <BrushCleaning size={16} /> Clear all
        </UserNotifications.Button>

        {/* Mark all read */}
        <UserNotifications.Button
          onClick={() => markNotificationRead({ type: 'all' })}
          disabled={disabled}
        >
          <CheckCheck size={16} /> Mark all as read
        </UserNotifications.Button>
      </div>
    </>
  );
};

// --------------------------------------
//  List
// --------------------------------------

UserNotifications.List = function List({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  // Empty state
  if (notifications.length === 0)
    return (
      <div className='flex flex-col items-center justify-center h-40 text-zinc-500 text-sm gap-2.5'>
        <BellOff size={40} strokeWidth={1} />
        <p>No notifications to display</p>
      </div>
    );

  // Display data
  return (
    <ul className='max-h-72 overflow-y-auto'>
      {notifications.map(n => (
        <UserNotifications.Item key={n._id} notification={n} />
      ))}
    </ul>
  );
};

// --------------------------------------
//  Item
// --------------------------------------

UserNotifications.Item = function Item({
  notification,
}: {
  notification: NotificationType;
}) {
  // Hook
  const {
    markNotificationRead,
    deleteNotificationRead,
    activeOptionId,
    toggleOptions,
  } = useNotifications();

  // variables
  const { isRead, title, body, _id } = notification;
  const isOptionsOpen = activeOptionId === _id;

  return (
    <li
      className={cn(
        'p-4 border-b border-zinc-300 hover:bg-zinc-50 transition relative',
        isRead ? 'bg-zinc-100' : 'bg-white'
      )}
    >
      {/* Header */}
      <div className='flex justify-between items-center'>
        {/* Title */}
        <h4 className='font-semibold text-base text-zinc-800'>{title}</h4>

        {/* Option menu toggle */}
        <button onClick={() => toggleOptions(_id)}>
          <EllipsisVertical size={18} />
        </button>
      </div>

      {/* Options Menu */}
      {isOptionsOpen && (
        <div className='absolute right-3 top-10 bg-white border rounded-md shadow-md p-2 text-xs flex flex-col gap-1 z-10 w-52 '>
          {/* Delete action */}
          <UserNotifications.Button
            className='font-medium text-sm py-1.5'
            onClick={() => deleteNotificationRead({ type: 'single', id: _id })}
          >
            <Trash2 size={14} className='text-red-500' /> Delete
          </UserNotifications.Button>

          {/* Make  read action*/}
          <UserNotifications.Button
            className='font-medium text-sm py-1.5'
            onClick={() => markNotificationRead({ type: 'single', id: _id })}
            disabled={isRead}
          >
            <Check size={14} /> Mark as read
          </UserNotifications.Button>
        </div>
      )}

      {/* Body */}
      <p className='text-sm text-zinc-500 mt-1 line-clamp-2'>{body}</p>
    </li>
  );
};

// --------------------------------------
//  Shared Button
// --------------------------------------

UserNotifications.Button = function Button({
  children,
  onClick,
  disabled = false,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-2.5 transition-colors disabled:text-zinc-400 disabled:cursor-not-allowed hover:text-red-500',
        className
      )}
    >
      {children}
    </button>
  );
};
