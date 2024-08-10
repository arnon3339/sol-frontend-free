import Show3D from "@/components/show3d";
import "../show3d.css";
import MonkeyCarousel from "@/components/carouse";
import HomeBtn from '@/components/homebtn';
import AttShow from '@/components/attshow';
import NftOwners from '@/components/nftowners';

async function ShowRoom({data}){
  try{
    const host = process.env?.NEXT_PUBLIC_VERCEL_URL ? 
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`:
      `${process.env.BACKEND_LOCALHOST}:${process.env.BACKEND_LOCALPORT}/api`
    const queries = `/imgshow/?name=${data.name}&mint=${data.mint}&kind=${data.kind}`;
    const res = await fetch(host + queries, {cache: "no-store"});
    if (res.ok){
      const resData = await res.json();
      return (
        <>
          <div className="flex flex-col w-full min-h-screen justify-center items-center relative">
						<div className="flex flex-row justify-start items-center py-2 pl-4 top-0 left-0 w-full absolute">
							<HomeBtn />
						</div>
            <div className="flex flex-col justify-center w-full h-full items-center">
              <div className="flex flex-row w-full justify-center items-center -mt-10 max-sm:flex-col 
                  max-sm:justify-start max-sm:mt-4">
                <div className="flex-1 flex flex-col justify-start mt-20 ml-4 max-sm:mt-10 max-sm:ml-0
                                max-sm:items-center max-sm:min-h-[80px] max-md:mt-28">
                  <MonkeyCarousel monkeys={resData.recoms}/>
                </div>
                <div className="flex-[2] h-[800px] flex flex-row justify-center items-start max-lg:h-[500px]
                    max-md:h-[350px] max-md:pt-24 pt-20 max-ssm:pt-4 max-sm:w-full max-sm:min-h-[100dvw]">
                  <Show3D data={resData}/>
                </div>
                <div className="flex-1 flex flex-col justify-start mt-14 mr-4 max-sm:mr-0 max-sm:w-[100%] items-center">
                  <div className="flex flex-col px-2 max-md:grid max-md:grid-cols-12 
                  py-2 w-[350px] h-fit max-sm:w-[95%]
                    bg-white/50 backdrop-blur-lg rounded-xl max-lg:w-[250px] text-md max-lg:text-sm
                    max-md:gap-x-1 max-md:gap-y-2 max-md:w-[250px]">
                    <AttShow atts={resData.atts} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center w-full h-full mb-auto py-2 max-md:mt-20 max-sm:mt-1">
                < NftOwners mint={resData.mint} name={resData.name} kind={resData.atts.kind}/>
              </div>
            </div>
          </div>
        </>
      );
    }
  } catch(e){
    console.log(e);
  }
}

export default function Page({params, searchParams}) {
	return (
		<div className="min-h-screen relative">
      <ShowRoom data={searchParams}/>
		</div>
  )
}
