"use client";

import { useContext} from "react";
import { useRouter } from "next/navigation";

export default function Navigator({numcards, page, data})
{
  const router = useRouter()
  const numClasses = "py-2 text-center w-12 h-10 rounded-xl m-1 hover:cursor-pointer\
   hover:shadow-sm hover:shadow-gray-600 max-sm:h-8 max-sm:w-8 max-sm:text-sm z-10 \
  backdrop-blur"

  
  const calUI = () => {
    const numPage = Math.ceil(numcards/32)
    let pageArr;
    let pageSkip = [-1, -1]

    if (numPage < 11)
    {
      pageArr = Array.from({length: numPage}).map((elem, index) => index)
    }
    else
    {
      if (page < 4)
      {
        pageArr = [0, 1, 2, 3, 4, 5, numPage - 2, numPage -1]
        pageSkip = [5, -1]
      }
      else if (page > numPage - 5)
      {
        pageArr = [0, 1, numPage - 6, numPage - 5, numPage - 4, numPage - 3, numPage - 2, numPage - 1]
        pageSkip = [-1, numPage - 6]
      }
      else
      {
        pageArr = [0]
        pageArr.push(...Array.from({length: 7}).map((_, index) => (page + (index - 3))))
        pageArr.push(numPage - 1)
        pageSkip = [page - 3, page + 3]
      }
    }

    return (<ul className="mt-8 flex flex-row justify-center">
      {
        pageArr.map((elem, index) => 
        {
          if (elem == page)
          {
            return (
              <li className={`bg-white/70 text-black ${numClasses}`} key={`page-${elem}`} value={elem} onClick={handleSelectNum}>
                {elem + 1}
              </li>
              )
          }
          else if (pageSkip.includes(elem))
          {
            return (
              <li className={`${numClasses} text-white bg-white/30`} key={`page-${elem}`} value={elem} onClick={handleSelectNum}>
                ...
              </li>
              )
          }
          else
          {
            return (
              <li className={`${numClasses} bg-white/30 text-white`} key={`page-${elem}`} value={elem} onClick={handleSelectNum}>
                {elem + 1}
              </li>
              )
          }
        })}
    </ul>)
  }

  const handleSelectNum = (e) => {
		router.replace(`/?search=${data?.search? data.search: ""}&page=${e.target.value}&sort=${data?.sort? data.sort: 0}&body=${data?.body? data.body: 0}&
head=${data?.head? data.head: 0}&eyes=${data?.eyes? data.eyes: 0}&
mouth=${data?.mouth? data.mouth: 0}&clothe=${data?.clothe? data.clothe: 0}&
eyesacc=${data?.eyesacc? data.eyesacc: 0}&mouthacc=${data?.mouthacc? data.mouthacc: 0}`);
		router.refresh();
  }
  return (
    calUI()
  )
}
