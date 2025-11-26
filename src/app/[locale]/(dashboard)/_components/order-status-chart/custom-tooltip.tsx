import { ChartDataItem } from '../../../../../lib/types/order-status';

export const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartDataItem }[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      // this tooltip is to achieve the needed figma design on hover
      <div className='bg-white p-3 border border-gray-200 rounded-full shadow-lg'>
        <p className='text-sm font-medium text-gray-900'>{data.percentage}%</p>
      </div>
    );
  }
  return null;
};
