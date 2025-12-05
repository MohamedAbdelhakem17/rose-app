'use server';

import { getToken } from '@/lib/utils/get-token';
import {
  DeleteAllNotificationResponseType,
  DeleteSingleNotificationResponseType,
  MakeNotificationReaddResponseType,
  ToggleNotificationResponseType,
} from '../types/user-notification';

async function getAuthHeaders() {
  const token = await getToken();
  if (!token) throw new Error('User not authenticated');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.token}`,
  };
}
/**
 * Handles marking notifications as read (single or all).
 * @param endpoint - API endpoint (e.g. "/mark-read" or "/mark-all-read")
 * @param body - Optional body containing an array of notification IDs
 */
const manageNotificationRead = async (
  endpoint: string,
  body: { notificationIds: string[] } | null
) => {
  const headers = await getAuthHeaders();

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications${endpoint}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const payload: MakeNotificationReaddResponseType = await response.json();

  return payload;
};

/**
 * Handles deleting notifications (single or multiple).
 * @param endpoint - API endpoint (e.g. "/{id}" or "/clear-all")
 */
const manageNotificationDelete = async <T>(endpoint: string): Promise<T> => {
  const headers = await getAuthHeaders();
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/${endpoint}`;

  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers,
  });

  const payload: T = await response.json();
  return payload;
};

// --------------------------------------
//  Mark single notification as read
// --------------------------------------

async function markNotificationReadAction(id: string) {
  const payload = await manageNotificationRead('/mark-read', {
    notificationIds: [id],
  });

  return payload;
}

// --------------------------------------
//  Mark all notifications as read
// --------------------------------------

async function markAllNotificationReadAction() {
  const payload = await manageNotificationRead('/mark-all-read', null);

  return payload;
}

// --------------------------------------
//  Clear all notifications
// --------------------------------------

async function clearAllNotificationsAction() {
  const payload =
    await manageNotificationDelete<DeleteAllNotificationResponseType>(
      'clear-all'
    );
  return payload;
}

// --------------------------------------
//  Delete single notification
// --------------------------------------

async function deleteNotificationAction(id: string) {
  const payload =
    await manageNotificationDelete<DeleteSingleNotificationResponseType>(id);

  return payload;
}

// --------------------------------------
//  Toggle notification status read/unread
// --------------------------------------

async function toggleNotificationAction(id: string) {
  const headers = await getAuthHeaders();
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/${id}/toggle`;

  const response = await fetch(API_URL, {
    method: 'PATCH',
    headers,
    body: null,
  });

  const payload: ToggleNotificationResponseType = await response.json();

  return payload;
}

// --------------------------------------
//  Exports
// --------------------------------------

export {
  clearAllNotificationsAction,
  deleteNotificationAction,
  markAllNotificationReadAction,
  markNotificationReadAction,
  toggleNotificationAction,
};
