'use client';

import { genHexSingleAtt } from '@/modules/utils';
import {useEffect, useState} from 'react';
import Link from 'next/link';

import { 
	bodyAttData,
	headAttData, 
	eyesAttData, 
	mouthAttData, 
	clotheAttData, 
	eyesAccAttData, 
	mouthAccAttData,
	bodyAttLength,
	headAttLength, 
	eyesAttLength, 
	mouthAttLength, 
	clotheAttLength, 
	eyesAccAttLength, 
	mouthAccAttLength

} from '@/modules/attributes';

export default function AttShow({atts}){
  const bgs = ["bg-red-400", "bg-green-400", 
      "bg-blue-400","bg-pink-400", "bg-orange-400","bg-yellow-400", 
      "bg-fuchsia-400"];
  const mdbgs = ["max-md:bg-red-400", "max-md:bg-green-400", 
      "max-md:bg-blue-400","max-md:bg-pink-400", "max-md:bg-orange-400","max-md:bg-yellow-400", 
      "max-md:bg-fuchsia-400"];
  const itemNames = ["Body", "Head", "Eyes", "Mouth", "Clothe", "Eyes Accessory", "Mouth Accessory"];
  return (
    <>
      {
        Object.keys(atts).slice(2).map((k, i) => {
           return (
             <AttItem name={itemNames[i]} attName={k} attValue={atts[k]} bg={bgs[i]} mdbg={mdbgs[i]}
             key={`att-item-${i}`}/>
           );
        })
      }
    </>
  );
}

function AttItem({name, attName, attValue, bg, mdbg}){
  const attHex = genHexSingleAtt(attName, attValue);
  const hlink =  `/?${attName}=${attHex}`;
  const att_ref = {
    "body": bodyAttData,
    "head": headAttData,
    "eyes": eyesAttData,
    "mouth": mouthAttData,
    "clothe": clotheAttData,
    "eyesacc": eyesAccAttData,
    "mouthacc": mouthAccAttData
  };
  const att_length = {
    "body": bodyAttLength,
    "head": headAttLength,
    "eyes": eyesAttLength,
    "mouth": mouthAttLength,
    "clothe": clotheAttLength,
    "eyesacc": eyesAccAttLength,
    "mouthacc": mouthAccAttLength
  };

  let mySpan = "";

  if (["eyesacc", "mouthacc"].findIndex(x => x == attName) != -1)
    mySpan = att_length[attName][att_ref[attName].findIndex(x => x == attValue)] > 9?
      `col-span-${att_length[attName][att_ref[attName].findIndex(x => x == attValue)]}`: "col-span-9";
  else
    mySpan = att_length[attName][att_ref[attName].findIndex(x => x == attValue)] > 5?
      `col-span-${att_length[attName][att_ref[attName].findIndex(x => x == attValue)]}`: "col-span-5";

  // console.log(`${attName}, ${attValue}, ${mySpan}`)
  // const attStyle = `flex flex-col justify-center items-start text-2xl max-md:text-center 
  //           w-fit max-md:items-center max-md:justify-start max-md:py-1
  //           max-md:max-h-[60px] bg-transparent ${mdbg} max-md:rounded-md 
  //           max-md:px-1 ${mySpan} max-lg:text-sm max-ssm:text-[10px]`;

  // const [span, setSpan] = useState("col-span-1 max-md:col-span-1 max-ssm:col-span-1 opacity-0");

  // useEffect(() => {
  //   const getAttSpan = (attKey, attValue, href) => {
  //     let attSpan = "col-span-1";
  //     const attIndex = att_ref[attKey].findIndex(e => e === attValue);
  //     if (['eyesacc', 'mouthacc'].some(x => x===attKey)){
  //       attSpan = att_length[attKey][attIndex] < 8? "col-span-8": `col-span-${att_length[attKey][attIndex]}`;
  //     }
  //     else
  //       attSpan = att_length[attKey][attIndex] < 4? "col-span-4": `col-span-${att_length[attKey][attIndex]}`;
  //     console.log(`${attKey}, ${attValue}, ${attSpan}`)
  //     setSpan(`${attSpan} opacity-100`)
  //   }
  //   getAttSpan(attName, attValue);

    // const setSpanState = () => {
    //   getAttSpan(attName, attValue);
    // }

    // if (window) window.addEventListener('resize', setSpanState);

    // return () => {
    //   if (window) window.removeEventListener('resize', setSpanState);
    // };

  // }, [])


  return (
    <AttLink name={name} attValue={attValue} theSpan={mySpan} mdbg={mdbg} bg={bg} hlink={hlink}/>
  );

}

function AttLink({name, attValue, theSpan, mdbg, bg, hlink}){
        if (`col-span-1`);
        else if (`col-span-2`);
        else if (`col-span-3`);
        else if (`col-span-4`);
        else if (`col-span-5`);
        else if (`col-span-6`);
        else if (`col-span-7`);
        else if (`col-span-8`);
        else if (`col-span-9`);
        else if (`col-span-10`);
        else if (`col-span-11`);
        else if (`col-span-12`);
  return (
      <Link className={`flex flex-col text-2xl max-md:text-center max-md:items-center max-md:justify-start max-md:py-1  
            bg-transparent ${mdbg} max-md:rounded-md ${theSpan} w-fit max-md:w-auto
            max-md:px-1 max-lg:text-sm max-ssm:text-[10px]`} href={hlink}>
      <div>
      <div className={`font-bold whitespace-nowrap`}>
        {name} 
      </div>
      <div className={`max-md:bg-transparent rounded-md px-2 py-1 mt-1 mb-2
       ml-4 max-md:ml-0 max-md:mt-0 ${bg} whitespace-nowrap`}>
        {attValue}
      </div>
      </div>
    </Link>
  );
}
