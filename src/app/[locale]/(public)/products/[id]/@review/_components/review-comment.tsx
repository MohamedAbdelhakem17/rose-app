import RatingIcon from '@/components/shared/rating-icon';
import { User } from '@/lib/types/auth';
import { Product } from '@/lib/types/review';
import { formatDateShort } from '@/lib/utils/date-format';
import Image from 'next/image';

type ReviewCommentProps = {
  _id: string;
  product: Product;
  user: User;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
};
export default function ReviewComment({
  review,
}: {
  review: ReviewCommentProps;
}) {
  return (
    <div className=' flex flex-col justify-start items-start px-2 border-b border-b-zinc-200 dark:border-b-zinc-700'>
      <div className=' flex justify-start items-center gap-2'>
        {review.user.photo ? (
          <div className=' relative flex justify-center items-center w-12 h-12 rounded-full bg-zinc-800'>
            <Image
              src={review?.user?.photo}
              alt={`photo's ${review?.user?.firstName}`}
              className=' absolute bg-cover '
              width={48}
              height={48}
            />
          </div>
        ) : (
          <div className='flex justify-center items-center w-12 h-12 rounded-full bg-zinc-800'>
            <p className=' text-2xl text-white '>
              {review?.user.firstName.split(' ').map(word => word[0])}
            </p>
          </div>
        )}
        <div className=' flex flex-col gap-0'>
          <h3 className=' font-semibold'> {review?.user?.firstName}</h3>
          <p className='text-zinc-400 text-sm'>
            {formatDateShort(review.createdAt)}
          </p>
        </div>
      </div>

      <div className=' flex justify-start items-center mt-2'>
        <RatingIcon rate={review?.rating} />
        <p className=' font-semibold'>({review?.rating})</p>
      </div>

      <h2 className=' text-zinc-900 dark:text-zinc-50 font-bold capitalize'>
        {review?.title}
      </h2>
      <p className=' text-zinc-600 dark:text-zinc-300 mb-2'>{review?.comment}</p>
    </div>
  );
}
