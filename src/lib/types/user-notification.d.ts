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
  priority: string;
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

// --------------------------------------
//  Exports
// --------------------------------------

export { GetUserNotificationsResponse, GetUnreadNotificationUserCountResponse };
