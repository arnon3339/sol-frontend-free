'use client';

import {useRouter} from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import {useState, useEffect} from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MonkeyCarousel({monkeys}) {
	const [winWidth, setWinWidth] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const winWidthHandler = () => {
			if (window) {
				setWinWidth(window.innerWidth);
			}
		}

		if (window) {
			setWinWidth(window.innerWidth);
			window.addEventListener('resize', winWidthHandler);
		}
		return () => window.removeEventListener('resize', winWidthHandler);
	}, []);

  return (
    <>
    {winWidth && winWidth >= 640 &&
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        orientation="vertical"
        className="w-full max-w-xs max-sm:w-[100%] max-ssm:w-[200px]"
      >
        <CarouselContent className="-mt-1 h-[525px] max-lg:h-[300px] max-md:h-[250px] max-sm:h-auto">
          {monkeys.map((elem, index) => (
            <CarouselItem key={index} className="pt-1 basis-1/3 max-sm:basis-1/4 max-lg:pt-2">
              <div className="">
                <Card key={`carouse-card-${index}`} className="bg-transparent border-none shadow-none">
                  <CardContent key={`carouse-content-${index}`} className="flex items-center justify-center p-6 max-lg:p-0">
            {/*<span key={`carouse-span-${index}`} className="text-3xl font-semibold">{index + 1}</span>*/}
                    <div className="cursor-pointer" key={`carouse-link-${index}`} onClick={() => {
                        router.push(`/showroom?name=${monkeys[index].name}&kind=${monkeys[index].kind}&mint=${monkeys[index].mint}`);
                        router.refresh();
                      }}>
                      <img src={`${elem.img}`}  className={`w-28 h-28 max-lg:w-20 max-lg:h-20 rounded-2xl
                        border-4 ${elem.mint? "border-green-600": "border-white"} max-md:rounded-full max-md:w-16 max-md:h-16
                        max-ssm:w-10 max-ssm:h-10`}/>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
      </Carousel>
    }
    { winWidth && winWidth < 640 &&
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full max-w-xs max-sm:w-[100%] max-ssm:w-[200px]"
      >
        <CarouselContent className="-mt-1 h-[525px] max-lg:h-[300px] max-md:h-[250px] max-sm:h-auto">
          {monkeys.map((elem, index) => (
            <CarouselItem key={index} className="pt-1 basis-1/3 max-sm:basis-1/4 max-lg:pt-2">
              <div className="">
                <Card key={`carouse-card-${index}`} className="bg-transparent border-none shadow-none">
                  <CardContent key={`carouse-content-${index}`} className="flex items-center justify-center p-6 max-lg:p-0">
            {/*<span key={`carouse-span-${index}`} className="text-3xl font-semibold">{index + 1}</span>*/}
                    <div className="cursor-pointer" key={`carouse-link-${index}`} onClick={() => {
                        router.push(`/showroom?name=${monkeys[index].name}&kind=${monkeys[index].kind}&mint=${monkeys[index].mint}`);
                        router.refresh();
                      }}>
                      <img src={`${elem.img}`}  className={`w-28 h-28 max-lg:w-20 max-lg:h-20 rounded-2xl
                        border-4 ${elem.mint? "border-green-600": "border-white"} max-md:rounded-full max-md:w-16 max-md:h-16
                        max-ssm:w-10 max-ssm:h-10 max-ssm:border-[2px]`}/>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    }
    </>
  )
}
