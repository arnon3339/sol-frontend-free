'use client';

import { useState, useEffect } from "react";
import {DotsVerticalIcon} from "@radix-ui/react-icons";

export default function OwnersLoader({mint, name, kind}) {
    const [data, setData] = useState([])
  const host = process.env?.NEXT_PUBLIC_VERCEL_URL ? 
			`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`:
			`${process.env.BACKEND_LOCALHOST}:${process.env.BACKEND_LOCALPORT}/api`
  const query = `/nftowners/?name=${name}&mint=${mint}&kind=${kind}`;

  useEffect( () => {
    const getData = async() => {
        const res = await fetch(host + query, {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
        }
        });
        const resData = await res.json();
        setData(resData);
    };

    getData();
  }, []);

  if (data.length == 0) 
    return <div>Loading...</div>;
  else {
    const ownersData = data.slice(1);
    return (
      <div className="flex flex-col rounded-3xl justify-start items-center
        text-2xl max-lg:text-sm w-full max-sm:text-[12px] max-ssm:text-[10px]">
            <div className=" bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px] max-lg:border-[1px]
              text-center rounded-2xl border-4  max-lg:w-[400px] max-lg:py-1 max-lg:rounded-xl
              max-md:w-[80%] max-sm:w-[95%]">{data[0]}</div>
            <div className="font-bold py-4 pt-5 w-[800px] text-center text-green-400 max-lg:w-[400px] max-lg:py-1 
              max-md:w-[80%] max-sm:w-[95%]">Owners</div>
        {
          ownersData.length <= 4 &&
          <>
            {
              ownersData.map(
                (e, i) => {
                  if (i != ownersData.length - 1)
                    return (<div className="px-20 bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px]
                      text-center rounded-2xl border-2 border-gray-400 max-lg:w-[400px] max-lg:py-1 max-md:w-[80%]
			    max-sm:w-[95%]" 
                      key={`owner-${i}`}>{e}</div>);
                  else
                    return (<div  className=" bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px]
                      	text-center rounded-2xl border-4 border-green-600 max-lg:w-[400px] max-lg:py-1 max-md:w-[80%]
			max-sm:w-[95%]" 
                      key={`owner-${i}`}>{e}</div>);
                }
              )
            }
          </>
        }
        {
          ownersData.length > 4 &&
          <>
            {
              Array.from({length: 5}).map(
                (e, i) => {
                  if (i < 3)
                    return <div className="bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px] max-lg:border-[1px]
                      text-center rounded-2xl border-2 border-gray-400 max-lg:w-[400px] max-lg:py-1 max-lg:rounded-xl
                      max-md:w-[80%] max-sm:w-[95%]" 
                      key={`owner-${i}`}>{ownersData[i]}</div>;
                  else if (i == 3)
                    return <DotsVerticalIcon className="my-2 text-2xl w-6 h-6 max-lg:w-4 max-lg:h-4"/>;
                  else
                    return <div className=" bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px] max-lg:border-[1px]
                      text-center rounded-2xl border-4 border-green-600 max-lg:w-[400px] max-lg:py-1 max-lg:rounded-xl
                      max-md:w-[80%] max-sm:w-[95%]" 
                      key={`owner-${i}`}>{ownersData[ownersData.length - 1]}</div>;
                }
              )
            }
          </>
        }
      </div>
    );
  }
};
