import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';

type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEEP)[keyof typeof FORGOT_PASSWORD_STEEP];

export { ForgotPasswordStep };
