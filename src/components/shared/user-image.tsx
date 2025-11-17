import { cn } from '@/lib/utils/utils';

type UserImageProps = {
  username: string;
  color: string; // 'bg-red-500'
};
export default function UserImage({ username, color }: UserImageProps) {
  return (
    <div
      className={cn(
        'flex justify-center items-center absolute -top-20 right-28 w-32 h-32 rounded-full border-white border-4 z-50',
        color
      )}
    >
      <p className=' text-2xl text-white'>
        {username.split(' ').map(word => word[0])}
      </p>
    </div>
  );
}
