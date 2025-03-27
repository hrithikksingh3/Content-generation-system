// import React from 'react'
// import { TEMPLATE } from './TemplateListSection'
// import Image from 'next/image'
// import Link from 'next/link'

// function TemplateCard(item:TEMPLATE) {
//   return (
//     <Link href={'/dashboard/content/'+item?.slug}>
//       <div className='p-5 shadow-md rounded-md border bg-white 
//       flex flex-col gap-3  cursor-pointer h-full hover:scale-105 transition-all'>
//           <Image src={item.icon} alt='icon' 
//           width={50} height={50} />
//           <h2 className='font-medium text-lg'>{item.name}</h2>
//           <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
//       </div>
//     </Link>
//   )
// }

// export default TemplateCard

//____________________________________________________________________

// import React from 'react';
// import { TEMPLATE } from './TemplateListSection';
// import Image from 'next/image';
// import Link from 'next/link';

// function TemplateCard(item: TEMPLATE) {
//   // Encode the template data to a query-safe string
//   const encodedData = encodeURIComponent(JSON.stringify(item));

//   return (
//     <Link href={`/dashboard/content/${item?.slug}?data=${encodedData}`}>
//       <div className='p-5 shadow-md rounded-md border bg-white 
//       flex flex-col gap-3 cursor-pointer h-full hover:scale-105 transition-all'>
//           <Image src={item.icon} alt='icon' width={50} height={50} />
//           <h2 className='font-medium text-lg'>{item.name}</h2>
//           <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
//       </div>
//     </Link>
//   );
// }

// export default TemplateCard;


//_________________________________________________________________

// import React from 'react';
// import { TEMPLATE } from './TemplateListSection';
// import Image from 'next/image';
// import Link from 'next/link';

// function TemplateCard(item: TEMPLATE) {
//   // Encode the template data to a query-safe string
//   const encodedData = encodeURIComponent(JSON.stringify(item));

//   // If slug === "image-generator", go to "/image-generator"
//   // Otherwise, go to the old route
//   const linkHref =
//     item.slug === "image-generator"
//       ? "/image-generator"
//       : `/dashboard/content/${item.slug}?data=${encodedData}`;

//   return (
//     <Link href={linkHref}>
//       <div
//         className="p-5 shadow-md rounded-md border bg-white
//                    flex flex-col gap-3 cursor-pointer h-full
//                    hover:scale-105 transition-all"
//       >
//         <Image src={item.icon} alt="icon" width={50} height={50} />
//         <h2 className="font-medium text-lg">{item.name}</h2>
//         <p className="text-gray-500 line-clamp-3">{item.desc}</p>
//       </div>
//     </Link>
//   );
// }

// export default TemplateCard;



//____________________________________________________________________________________________



import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image';
import Link from 'next/link';

function TemplateCard(item: TEMPLATE) {
  // Encode the template data to a query-safe string
  const encodedData = encodeURIComponent(JSON.stringify(item));

  // Determine the link based on the slug:
  // - For "image-generator", route to the dedicated page.
  // - For "excel-bar-chart", route to its dedicated page.
  // - Otherwise, use the default dashboard content route.
  let linkHref = `/dashboard/content/${item.slug}?data=${encodedData}`;
  if (item.slug === "image-generator") {
    linkHref = "/image-generator";
  } else if (item.slug === "excel-bar-chart") {
    linkHref = "/excel-bar-chart";
  }

  return (
    <Link href={linkHref}>
      <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer h-full hover:scale-105 transition-all">
        <Image src={item.icon} alt={item.name} width={50} height={50} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
