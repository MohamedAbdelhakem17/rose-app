import { RegisterFormData } from '@/lib/schemas/auth/register-schema';
import { RegisterResponse } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';
import { registerAction } from '../_actions/register-action';

export function useRegister() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: async (data: RegisterFormData): Promise<RegisterResponse> => {
      console.log(data);
      const payload = await registerAction(data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
  });
  return { isPending, error, signUp: mutateAsync };
}
