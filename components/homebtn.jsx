'use client'
 
import { usePathname, useRouter } from 'next/navigation'

export default function HomeBtn(){
  const pathName = usePathname();
  const router = useRouter();
  return (
    <img className="w-28 h-28 max-lg:w-24 max-lg:h-24 block z-30 cursor-pointer max-sm:w-14
      max-sm:h-14 max-ssm:w-10 max-ssm:h-10 max-md:h-18 max-md:w-18 opacity-60 hover:opacity-100" 
			src={`./images/cdape_logo.svg`}
        onClick={() => {
          if (pathName === '/'){
		  location.replace(location.href.split('/').filter((_, i) => [0, 2].includes(i)).join('//'));
          }         
          else {
            router.push('/');
            router.refresh();
          }
      }} />
  );
}
