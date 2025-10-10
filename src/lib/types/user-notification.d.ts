// --------------------------------------
//  Notification Types
// --------------------------------------

/** Single notification item */
type NotificationType = {
  _id: string;
  recipient: string;
  title: string;
  body: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  actionLink: string;
  relatedId: string;
  relatedModel: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  __v: number;
};

/** Unread notification count only */
type UnreadNotificationUserCount = {
  unreadCount: number;
};

// --------------------------------------
// Notification Metadata
// --------------------------------------

/** Notification list metadata (includes unread count) */
type NotificationMetadataType = Metadata & {
  unreadCount: number;
};

// --------------------------------------
// API Response Types
// --------------------------------------

/** Response: Get all user notifications */
type GetUserNotificationsResponse = ApiResponse<
  PaginatedResponse<
    { notifications: NotificationType[] },
    NotificationMetadataType
  >
>;

/** Response: Get unread count */
type GetUnreadNotificationUserCountResponse =
  ApiResponse<UnreadNotificationUserCount>;

/** Response: Delete single notification */
type DeleteSingleNotificationResponseType = ApiResponse<{ data: null }>;

/** Response: Delete single notification */
type DeleteAllNotificationResponseType = ApiResponse<{ deletedCount: number }>;

/** Response: Toggle notification read/unread */
type ToggleNotificationResponseType = ApiResponse<{
  notification: NotificationType;
  unreadCount: number;
}>;

/** Response: Make  notification readd */
type MakeNotificationReaddResponseType = ApiResponse<{
  modifiedCount: number;
  unreadCount: number;
}>;

// --------------------------------------
//  Exports
// --------------------------------------

export {
  GetUserNotificationsResponse,
  GetUnreadNotificationUserCountResponse,
  DeleteSingleNotificationResponseType,
  ToggleNotificationResponseType,
  MakeNotificationReaddResponseType,
  DeleteAllNotificationResponseType,
  NotificationType,
};
