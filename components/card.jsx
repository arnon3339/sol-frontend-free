import Link from 'next/link';
import Filter from './filter';
import "@/app/mainpage.css"
import Navigator from './navigator';
import ToTopBtn from './totopbtn';
import Image from 'next/image';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default async function CardContainer({data}){
	try{
		const host = process.env?.NEXT_PUBLIC_VERCEL_URL ? 
			`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`:
			`${process.env.BACKEND_LOCALHOST}:${process.env.BACKEND_LOCALPORT}/api`
		const queries = `/limited-cards/?search=${data?.search? data.search: ""}&page=${data?.page? data.page: 0}&sort=${data?.sort? data.sort: 0}&
body=${data?.body? data.body: 0}&head=${data?.head? data.head: 0}&eyes=${data?.eyes? data.eyes: 0}&
mouth=${data?.mouth? data.mouth: 0}&clothe=${data?.clothe? data.clothe: 0}&
eyesacc=${data?.eyesacc? data.eyesacc: 0}&mouthacc=${data?.mouthacc? data.mouthacc: 0}`;
		const res = await fetch(host + queries, {
			cache: 'no-store'
		});
		if (res.ok){
			const cardsData = await res.json();
      const img_names = (cardsData.cards.map(e => e.name.toString())).join(' ');
      const imgRes = await fetch(host + `/imgblur/?img_names=${img_names}`, {cahce: 'no-store'});
      if (imgRes.ok){
        const imgResData = await imgRes.json();
        return (
          <>
            <div className="w-full h-full">
              <div className="w-full h-full">
                {/* <ToTopBtn /> */}
                {/* <Filter data={data} count={parseInt(cardsData.count)}/> */}
                <div className={`max-md:mt-10 max-sm:mt-2 ${cardsData.cards.length != 0? "card-container": "no-card-container"}`}>
                  {
                    (cardsData.cards.length != 0) &&
                    Array.from({length: cardsData.cards.length}).map((_, index) => {
                      return (
                        <Card key={`card-${index}`} name={`${cardsData.cards[index].name}`} image={`${cardsData.cards[index].img}`}
                          kind={parseInt(cardsData.cards[index].kind)} blur={imgResData[index].b64code} 
                          mint={cardsData.cards[index].mint}/>
                      );
                    })
                  }
                  {(cardsData.cards.length == 0) &&
                      <div className=' w-full text-4xl font-bold text-center text-white'>No data found!</div>
                  }
                </div>
              </div>
              <Navigator numcards={cardsData.count} page={data?.page? parseInt(data.page): 0} data={data}/>
            </div>
          </>
        );
      }
      else{
        return (
          <>
            <div className="w-full h-full">
              <div className="w-full h-full">
                <ToTopBtn />
                <Filter data={data} count={parseInt(cardsData.count)}/>
                <div className="card-container">
                  {
                    Array.from({length: cardsData.cards.length}).map((_, index) => {
                      return (
                        <Card key={`card-${index}`} name={`${cardsData.cards[index].name}`} image={`${cardsData.cards[index].img}`}
                          kind={parseInt(cardsData.cards[index].kind)} mint={cardsData.cards[index].mint}/>
                      );
                    })
                  }
                </div>
              </div>
              <Navigator numcards={cardsData.count} page={data?.page? parseInt(data.page): 0} data={data}/>
            </div>
          </>
        );
      }
		}
	} catch(e){}
}

function Card({image, name, kind, mint, blur=null}){
	return (
		<Link className="cursor-pointer rounded-md w-[200px] h-[250px] 2xl:w-[250px] 2xl:h-[300px] my-card" 
			href={`/showroom/?name=${name}&kind=${kind}&mint=${mint}`}>
			<div className="relative w-full h-full">
				<div className="flex flex-col justify-between absolute top-0 l-0 w-full h-full p-4 items-center">
          <div className="w-[180px] h-[180px] border-white 2xl:w-[230px] 2xl:h-[230px] border-2 relative">
    {
      blur &&
            <Image  
              src={image}
              alt=""
              fill={true}
              priority={true}
              placeholder="blur"
              blurDataURL={`data:image/jpg;base64,${blur}`}
            />
    }
    {
      !blur &&
            <Image  
              src={image}
              alt=""
              priority={true}
              placeholder="empty"
            />
    }
          </div>
					<div className="mt-6 font-bold text-2xl text-gray-600 text-center">
						{name}
					</div>
				</div>
				{
					mint != 0 &&
					<div className="absolute top-2 -right-3 w-10 h-10 2xl:w-14 2xl:h-14">
						<img src={`./images/cardtags/price-tag-svgrepo-com.svg`} />
					</div>
				}
			</div>
		</Link>
	);
}
