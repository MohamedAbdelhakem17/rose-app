import React from 'react';

// You can neglect this layout it's not my task but I wanted to have a better view of how the ui looks

export default function CheckoutLayout({
  children, // default checkout page
  summary, // summary parallel route
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <div className='flex gap-8'>
      {/* Main checkout content */}
      <div className='flex-1'>{children}</div>

      {/* Summary slot */}
      <div className='flex-1 border-l mt-section-md me-section-md border-gray-300 pl-4'>
        {summary}
      </div>
    </div>
  );
}
