import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getOrders } from '@/lib/apis/orders/orders.api';
import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function OrdersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Translation
  const t = await getTranslations();

  const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-US';

  // Query
  const payload: MappedOrderResponse =
    (await getOrders()) as MappedOrderResponse;
  return (
    <main className='py-8 container flex-1'>
      <h1 className='text-5xl font-bold m b-6'>{t('orders')}</h1>
      <Accordion type='single' collapsible>
        {payload?.orders?.map((order: MappedOrderType) => {
          const StatusIcon = order.deliveryStatus?.Icon || Info;

          return (
            <AccordionItem value={order._id} key={order._id} className='my-4'>
              {/*  Header */}
              <AccordionTrigger
                arrow={false}
                className='flex items-center justify-between bg-[#A6252A] text-white p-4 rounded-t-md no-underline hover:no-underline'
              >
                {/* Order ID */}
                <h3 className='font-semibold text-2xl w-fit'>
                  Order #{order._id.slice(0, 5)}
                </h3>

                {/* Date */}
                <p className='w-fit text-base space-x-1 flex items-center'>
                  <span className='font-normal'>Created in:</span>
                  <span className='font-semibold'>
                    {new Date(order.createdAt).toLocaleString(dateLocale, {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </p>
              </AccordionTrigger>

              {/* Content */}
              <AccordionContent className='bg-zinc-200 p-4'>
                {/* Top */}
                <div className='flex items-center justify-between'>
                  <p></p>
                  <p>Status: {order.state}</p>
                </div>
                {/* Middle */}

                {/* Bottom */}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import { getOrders } from '@/lib/apis/orders/orders.api';
// import { Info } from 'lucide-react';
// import { getTranslations } from 'next-intl/server';
// import Image from 'next/image';

// export default async function OrdersPage() {
//   const t = await getTranslations();
//   const payload = await getOrders();

//   return (
//     <main className='py-8 container'>
//       <h1 className='text-5xl font-bold mb-6'>{t('orders')}</h1>

//       <Accordion type='single' collapsible className='space-y-6'>
//         {payload?.orders?.map(order => {
//           const StatusIcon = order.deliveryStatus?.Icon || Info;

//           return (
//             <AccordionItem
//               key={order._id}
//               value={order._id}
//               className='rounded-xl border overflow-hidden shadow-md'
//             >
//               {/* ---------------- HEADER ---------------- */}
//               <div
//                 className='px-5 py-4 text-white flex items-center justify-between'
//                 style={{ backgroundColor: '#A6252A' }}
//               >
//                 <div>
//                   <h2 className='text-xl font-semibold'>
//                     Order #{order.orderNumber}
//                   </h2>
//                   <p className='text-sm opacity-90'>
//                     Created at: {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className='flex items-center gap-2'>
//                   <StatusIcon className='w-5 h-5 text-white' />
//                   <span className='font-medium'>
//                     {order.deliveryStatus.name}
//                   </span>
//                 </div>
//               </div>

//               {/* ---------------- TRIGGER ---------------- */}
//               <AccordionTrigger className='px-5 py-3 bg-gray-50 hover:no-underline'>
//                 <div className='flex justify-between w-full text-left'>
//                   <span className='font-semibold'>
//                     Total: {order.totalPrice} EGP
//                   </span>

//                   <span className='text-sm text-gray-500'>
//                     Payment: {order.paymentType}
//                   </span>
//                 </div>
//               </AccordionTrigger>

//               {/* ---------------- CONTENT ---------------- */}
//               <AccordionContent className='p-5 space-y-4 bg-white'>
//                 {/* === أول كاردين فقط === */}
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                   {order.items.slice(0, 2).map(item => (
//                     <ProductCard key={item.product._id} item={item} />
//                   ))}
//                 </div>

//                 {/* === Show All === */}
//                 {order.items.length > 2 && (
//                   <Accordion type='single' collapsible>
//                     <AccordionItem value='showAll'>
//                       <AccordionTrigger className='mt-3 text-center text-primary'>
//                         Show All
//                       </AccordionTrigger>

//                       <AccordionContent className='mt-4'>
//                         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                           {order.items.map(item => (
//                             <ProductCard key={item.product._id} item={item} />
//                           ))}
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 )}
//               </AccordionContent>
//             </AccordionItem>
//           );
//         })}
//       </Accordion>
//     </main>
//   );
// }

// /* ======================================================
//    ✅ PRODUCT CARD — نفس التصميم الموجود في الصورة 100%
// ====================================================== */
// function ProductCard({ item }) {
//   return (
//     <div className='flex gap-4 p-4 border rounded-xl shadow-sm bg-white'>
//       <Image
//         src={item.product.imgCover}
//         alt={item.product.title}
//         className='w-32 h-full object-cover rounded-lg'
//         width={200}
//         height={150}
//       />

//       <div className='flex flex-col justify-between py-1'>
//         <div>
//           <h3 className='font-semibold text-lg leading-snug'>
//             {item.product.title}
//           </h3>

//           <p className='text-sm text-gray-500 mt-1'>
//             Rating: {item.product.rateAvg}/5 ({item.product.rateCount} ratings)
//           </p>
//         </div>

//         <p className='text-lg font-bold text-primary'>
//           ({item.quantity}×) {item.price} EGP
//         </p>
//       </div>
//     </div>
//   );
// }
