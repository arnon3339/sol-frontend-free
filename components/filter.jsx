'use client';
import HomeBtn from './homebtn';
import {useState, useMemo, useRef, useEffect} from 'react';

import { 
  TriangleUpIcon, 
  TriangleDownIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@radix-ui/react-icons";

import { 
	bodyAttData,
	headAttData, 
	eyesAttData, 
	mouthAttData, 
	clotheAttData, 
	eyesAccAttData, 
	mouthAccAttData
} from '@/modules/attributes';
import { useRouter } from 'next/navigation';
import {genHexAtt, genBitsAtt} from '@/modules/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
	SelectGroup
} from "@/components/ui/select"
import FilterIcons from '@/components/filtericons';

export default function Filter({data}){
	const router = useRouter();
	const sortList = [ 
		"Name",
		"Mint",
		"Body",
		"Head",
    "Eyes",
    "Mouth",
    "Clothe",
    "Eyes Acc",
    "Mouth Acc"
	];
	const searchRef = useRef(null);
  const [attScrolls, setAttScrolls] = useState([0, 0, 0, 0, 0, 0, 0]);
  const attScrollRefs = [useRef(null), useRef(null), useRef(null), useRef(null), 
		useRef(null), useRef(null), useRef(null)];
  const [sortDirect, setSortDirect] = useState(false);
  //const [mint, setMint] = useState(data?.mint? data.mint: 0);
	const [blockSel, setBlockSel] = useState(false);
  const sortRef = useRef(null);
	const [attSorted, setAttSorted] = useState(data?.sort? Math.floor(parseInt(data.sort)/2): 0);
	const [showFilter, setShowFilter] = useState(false);
	const [filterFade, setFilterFade] = useState("");
	const allAttData = [bodyAttData, headAttData, eyesAttData, mouthAttData, 
		clotheAttData, eyesAccAttData, mouthAccAttData];
	const [allAtts, setAllAtts] = useState({
		body: data?.body && parseInt(Number("0x" + data.body)) != 0 ?
		genBitsAtt(allAttData[0].length, data.body) 
		:Array.from({length: allAttData[0].length}).map((_) => false),
		head: data?.head && parseInt(Number("0x" + data.head)) != 0 ?
		genBitsAtt(allAttData[1].length, data.head) 
		:Array.from({length: allAttData[1].length}).map((_) => false),
		eyes: data?.eyes && parseInt(Number("0x" + data.eyes)) != 0 ?
		genBitsAtt(allAttData[2].length, data.eyes) 
		:Array.from({length: allAttData[2].length}).map((_) => false),
		mouth: data?.mouth && parseInt(Number("0x" + data.mouth)) != 0 ?
		genBitsAtt(allAttData[3].length, data.mouth) 
		:Array.from({length: allAttData[3].length}).map((_) => false),
		clothe: data?.clothe && parseInt(Number("0x" + data.clothe)) != 0 ?
		genBitsAtt(allAttData[4].length, data.clothe) 
		:Array.from({length: allAttData[4].length}).map((_) => false),
		eyesacc: data?.eyesacc && parseInt(Number("0x" + data.eyesacc)) != 0 ?
		genBitsAtt(allAttData[5].length, data.eyesacc) 
		:Array.from({length: allAttData[5].length}).map((_) => false),
		mouthacc: data?.mouthacc && parseInt(Number("0x" + data.mouthacc)) != 0 ?
		genBitsAtt(allAttData[6].length, data.mouthacc) 
		:Array.from({length: allAttData[6].length}).map((_) => false),
	});
	const [oldAllAtts, setOldAllAtts] = useState({
		body:[...allAtts.body],
		head:[...allAtts.head],
		eyes:[...allAtts.eyes],
		mouth:[...allAtts.mouth],
		clothe:[...allAtts.clothe],
		eyesacc:[...allAtts.eyesacc],
		mouthacc:[...allAtts.mouthacc]
	});
	const filterStyles = ["bg-gray-800 text-white", "text-gray-400 bg-gray-200", 
		"text-gray-800 bg-white", "text-white bg-black"];
	const filterNames = [
		"Body",
		"Head",
		"Eyes",
		"Mouth",
		"Clothe",
		"Eyes acc",
		"Mouth acc"
	];
	const [attActive, setAttActive] = useState(-1);
	const [attSelected, setAttSelected] = 
		useState(Object.keys(allAtts).map(k => allAtts[k].some(x => x)));
	const [winWidth, setWinWidth] = useState(null);

	useEffect(() => {
    const searchHandler = (event) => {
      if (event.keyCode === 13){
        setSortDirect(false);
        setAttSorted(0);
        router.replace(`/?search=${searchRef.current.value}&page=0&sort=0&
body=${genHexAtt(allAtts.body)}&head=${genHexAtt(allAtts.head)}&eyes=${genHexAtt(allAtts.eyes)}&
mouth=${genHexAtt(allAtts.mouth)}&clothe=${genHexAtt(allAtts.clothe)}&
eyesacc=${genHexAtt(allAtts.eyesacc)}&mouthacc=${genHexAtt(allAtts.mouthacc)}`);
        event.preventDefault();
      }
    }

    if (searchRef.current) searchRef.current.addEventListener("keydown", searchHandler);
		const winWidthHandler = () => {
			if (window) {
				setWinWidth(window.innerWidth);
			}
		}

		if (window) {
			setWinWidth(window.innerWidth);
			window.addEventListener('resize', winWidthHandler);
		}

    return () => {
      if (searchRef.current)
        searchRef.current.removeEventListener("keydown", searchHandler);
      if (window)
        window.removeEventListener('resize', winWidthHandler);
    };
	}, []);

  useEffect(() => {
		attScrolls.forEach((e, i) => {
			if (attScrollRefs[i]?.current) attScrollRefs[i].current.scrollTop = attScrolls[i];
		});
  });

	const NftAtt = () => {
		const attKey = Object.keys(allAtts)[attActive];
		return (
			<div className="att-container overflow-scroll" ref={attScrollRefs[attActive]}
			>
				{
					allAttData[attActive].map((e, i) => {
						return (
							<div key={`atts-${attKey}-${i}`} className={`cursor-pointer rounded-3xl 
							w-[200px] py-2
							border-2 border-gray-600 text-md text-center px-2 max-lg:text-sm 
								${allAtts[attKey][i]? "bg-black text-white": "bg-white text-black"}`}  
                id="att-selected" onClick={(e) => {
									setAttScrolls(attScrolls.map((ee, ii) => attScrollRefs[ii].current?
										attScrollRefs[ii].current.scrollTop: ee));
									const attObj = {};
									let attArr = [...allAtts[attKey]];
									let attSelArr = [...attSelected];
									attArr[i] = !attArr[i];
									attObj[attKey] = attArr;
									attSelArr[attActive] = attArr.some(x => x);
									setAttSelected(attSelArr);
									setAllAtts(prev => Object.assign({}, prev, attObj));
								}}>
								{e}
							</div>
						);
					})
				}
			</div>
		);
	}

	return (
		<div className="absolute w-full h-full top-0 left-0">
		{showFilter && 
			<div className={`sticky w-full top-0 l-0 z-40 backdrop-blur-lg bg-white/50 flex flex-col
				justify-start py-2 h-screen ${filterFade}`}>
				<div className="flex flex-row justify-center">
        {
          winWidth >= 640 &&
					<div className="filter-container">
						{
							Object.keys(allAtts).map((kk, ki) => {
								let filterStyleUsed = "";
								if (attActive === ki && attSelected[ki])
									filterStyleUsed = filterStyles[3];
								else if (attActive === ki && !attSelected[ki])
									filterStyleUsed = filterStyles[2];
								else if (attSelected[ki])
									filterStyleUsed = filterStyles[0];
								else
									filterStyleUsed = filterStyles[1];
								return (
									<button key={`filter-att-${ki}`} className={`filter-child backdrop-blur-none p-1 px-6
										rounded-3xl border-2 border-gray-400 text-xl ${filterStyleUsed}`} onClick={() => {
											setAttScrolls(attScrolls.map((ee, ii) => attScrollRefs[ii].current?
												attScrollRefs[ii].current.scrollTop: ee));
											setAttActive(prev => prev === ki? -1: ki);
										}}>
										{filterNames[ki]}{attActive === ki?
												<TriangleUpIcon className="ml-1 inline h-8 w-8" />: <TriangleDownIcon 
													className="ml-1 inline h-8 w-8" />}
									</button>
								);
							})
						}
					</div>
        }
        {
          winWidth < 640 &&
					<div className="filter-container-sm">
						{
							Object.keys(allAtts).map((kk, ki) => {
								let filterStyleUsed = "";
                let filterStyleWhite = false;
								if (attActive === ki && attSelected[ki]){
									filterStyleUsed = filterStyles[3];
                  filterStyleWhite = true;
                }
								else if (attActive === ki && !attSelected[ki]){
									filterStyleUsed = filterStyles[2];
                }
								else if (attSelected[ki]){
									filterStyleUsed = filterStyles[0];
                  filterStyleWhite = true;
                }
								else{
									filterStyleUsed = filterStyles[1];
                }
								return (
									<div key={`filter-att-${ki}`} className={`backdrop-blur-none w-12 h-12 text-center 
                    flex flex-row justify-center items-center max-ssm:w-10 max-ssm:h-10
										rounded-full p-1 border-2 border-gray-400 text-xl cursor-pointer ${filterStyleUsed}`} 
                    onClick={() => {
											setAttScrolls(attScrolls.map((ee, ii) => attScrollRefs[ii].current?
												attScrollRefs[ii].current.scrollTop: ee));
											setAttActive(prev => prev === ki? -1: ki);
										}}>
                  <FilterIcons icon={ki} styles1={filterStyleWhite? "fill-white": "fill-black"} 
                    styles2={filterStyleWhite? "stroke-white": "stroke-black"}/>
									</div>
								);
							})
						}
					</div>
        }
				</div>
				{
					attActive != -1 &&
						<NftAtt/>
				}
				<div className="flex flex-row justify-center items-center py-2 mt-auto">
					<button className="w-40 p-1 px-6 rounded-3xl border-4 font-bold max-ssm:my-1
						border-gray-600 text-2xl text-gray-600 mr-2 max-sm:text-sm max-sm:px-2 max-sm:w-24" onClick={() => {
							setAttScrolls([0, 0, 0, 0, 0, 0, 0]);
							setAttSelected(Array.from({length: attSelected}).map(_ => false));
							setAllAtts({
								body: Array.from({length: allAttData[0].length}).map((_) => false),
								head: Array.from({length: allAttData[1].length}).map((_) => false),
								eyes: Array.from({length: allAttData[2].length}).map((_) => false),
								mouth: Array.from({length: allAttData[3].length}).map((_) => false),
								clothe: Array.from({length: allAttData[4].length}).map((_) => false),
								eyesacc: Array.from({length: allAttData[5].length}).map((_) => false),
								mouthacc: Array.from({length: allAttData[6].length}).map((_) => false)
							});
              setAttActive(-1);
						}}>
						reset
					</button>
					<button className="w-40 p-1 px-6 rounded-3xl border-4 font-bold max-ssm:my-1
						border-gray-600 text-2xl text-gray-600 mr-2 max-sm:text-sm max-sm:px-2 max-sm:w-24" onClick={() => {
							setAttScrolls(attScrolls.map((ee, ii) => attScrollRefs[ii].current?
								attScrollRefs[ii].current.scrollTop: ee));
							setFilterFade('filter-plane-fadeout-05s');
							setAttSorted(0);
              setSortDirect(false);
								document.body.style.overflowY = "scroll";
							setTimeout(()=>{
								setShowFilter(false);
								router.replace(`/?page=0&sort=0&
body=${genHexAtt(allAtts.body)}&head=${genHexAtt(allAtts.head)}&eyes=${genHexAtt(allAtts.eyes)}&
mouth=${genHexAtt(allAtts.mouth)}&clothe=${genHexAtt(allAtts.clothe)}&
eyesacc=${genHexAtt(allAtts.eyesacc)}&mouthacc=${genHexAtt(allAtts.mouthacc)}`);
								router.refresh();
							}, 1000);
						}}>
						apply	
					</button>
					<button onClick={() => {
						setAttScrolls(attScrolls.map((ee, ii) => attScrollRefs[ii].current?
							attScrollRefs[ii].current.scrollTop: ee));
						setAllAtts({
							body:[...oldAllAtts.body],
							head:[...oldAllAtts.head],
							eyes:[...oldAllAtts.eyes],
							mouth:[...oldAllAtts.mouth],
							clothe:[...oldAllAtts.clothe],
							eyesacc:[...oldAllAtts.eyesacc],
							mouthacc:[...oldAllAtts.mouthacc]
							});
						setAttSelected(Object.keys(oldAllAtts).map(k => oldAllAtts[k].some(x => x)))
						document.body.style.overflowY = "scroll";
						setShowFilter(false);
					}}>
						<svg className="w-14 h-14 max-sm:w-8 max-sm:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 
22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 
9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 
14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z" fill="#444444">
							</path>
						</svg>
					</button>
				</div>
			</div>
		}
		{
			blockSel && 
			<div className={`sticky w-full top-0 l-0 z-10 opacity-0 h-screen`}>
			</div>
		}
			<div className="flex flex-col justify-center items-center pt-4 absolute left-0 top-0 w-full z-20">
				<div className="flex flex-row justify-center w-full items-center max-ssm:justify-between max-ssm:px-1">

			<div className="flex flex-row justify-start items-center py-2 pl-4 top-0 left-0 absolute">
				<HomeBtn />
			</div>
          {/* <div className="ssm:absolute top-4 left-2 max-sm:left-1">
            <HomeBtn />
          </div> */}
					<form>
						<div className="border-2 border-gray-200 rounded-3xl p-1 px-2 bg-white max-sm:py-0">
							<input className="text-gray-600 text-xl outline-none w-96 h-8 px-4 max-md:w-60 max-sm:w-32 max-sm:h-4
								max-ssm:w-28 max-sm:text-sm max-sm:px-0 max-sm:py-0"
								type="text" name="comedain-ape-club-search" ref={searchRef} defaultValue={data?.search? data.search: ""}/>
							<span type="submit" onClick={(e) => {
                e.preventDefault();
                setSortDirect(false);
                setAttSorted(0);
                router.replace(`/?search=${searchRef.current.value}&page=0&sort=0&
body=${genHexAtt(allAtts.body)}&head=${genHexAtt(allAtts.head)}&eyes=${genHexAtt(allAtts.eyes)}&
mouth=${genHexAtt(allAtts.mouth)}&clothe=${genHexAtt(allAtts.clothe)}&
eyesacc=${genHexAtt(allAtts.eyesacc)}&mouthacc=${genHexAtt(allAtts.mouthacc)}`);
              }}>
								<svg className="w-14 h-8 inline cursor-pointer text-gray-400 font-bold border-l-2 max-sm:pl-1
									border-gray-400 max-sm:w-5 max-sm:h-5 max-sm:text-sm max-sm:mb-1 max-sm:border-l-1" 
									xmlns="http://www.w3.org/2000/svg" 
									viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" 
									strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
									<path d="M21 21l-6 -6" />
								</svg>
							</span>
						</div>
					</form>
					<div className={`cursor-pointer rounded-lg ml-4 px-1 text-white max-sm:ml-1 max-sm:pt-1 
						${attSelected.some(x => x)? "bg-gray-800": "bg-opacity-0"}`} 
						onClick={() => {
							setOldAllAtts({
								body:[...allAtts.body],
								head:[...allAtts.head],
								eyes:[...allAtts.eyes],
								mouth:[...allAtts.mouth],
								clothe:[...allAtts.clothe],
								eyesacc:[...allAtts.eyesacc],
								mouthacc:[...allAtts.mouthacc]
							});
							setShowFilter(true);
							document.body.style.overflowY = "hidden";
							setFilterFade('filter-plane-fadein-05s');
						}}>
						<svg className="w-12 h-12 max-sm:w-6 max-sm:h-6 max-sm:mb-1"
							xmlns="http://www.w3.org/2000/svg" 
							viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" 
							strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M4 6l8 0" />
							<path d="M16 6l4 0" />
							<path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M4 12l2 0" />
							<path d="M10 12l10 0" />
							<path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M4 18l11 0" />
							<path d="M19 18l1 0" />
						</svg>
					</div>
				</div>
				<div className="flex flex-row justify-center items-center -ml-8 w-72 
					max-ssm:w-[10rem] max-ssm:text-sm">
				 <Select value={`${data?.sort? Math.floor(parseInt(data.sort)/2): 0}`} onValueChange={(value) => {
          setSortDirect(false);
					setBlockSel(true);
					setAttSorted(value)
					router.replace(`/?search=${data?.search? data.search: ""}&page=0&sort=${parseInt(value)*2}&
body=${genHexAtt(allAtts.body)}&
head=${genHexAtt(allAtts.head)}&eyes=${genHexAtt(allAtts.eyes)}&
mouth=${genHexAtt(allAtts.mouth)}&clothe=${genHexAtt(allAtts.clothe)}&
eyesacc=${genHexAtt(allAtts.eyesacc)}&mouthacc=${genHexAtt(allAtts.mouthacc)}`);
					router.refresh();
					 setTimeout(()=>{setBlockSel(false);}, 500);
					 }}>
						<SelectTrigger>
						<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
							{
								sortList.map((e, i) => <SelectItem key={`sort-${i}`} value={`${i}`}>{e}</SelectItem>)
							}	
							</SelectGroup>
						</SelectContent>
					</Select>
          <div className="block rounded-full backdrop-blur-md ml-1 p-1 mt-2 bg-white/50 cursor-pointer" 
            onClick={() => {
              router.replace(`/?search=${data?.search? data.search: ""}&page=0&sort=${parseInt(attSorted)*2 + (!sortDirect? 1: 0)}&
body=${genHexAtt(allAtts.body)}&
head=${genHexAtt(allAtts.head)}&eyes=${genHexAtt(allAtts.eyes)}&
mouth=${genHexAtt(allAtts.mouth)}&clothe=${genHexAtt(allAtts.clothe)}&
eyesacc=${genHexAtt(allAtts.eyesacc)}&mouthacc=${genHexAtt(allAtts.mouthacc)}`);
              setSortDirect(prev => !prev);
            }}>
            {(data?.sort? parseInt(data.sort)%2 === 0: true) && <ArrowDownIcon className="w-4 h-4 max-sm:h-2 max-sm:w-2" />}
            {(data?.sort? parseInt(data.sort)%2 === 1: false) && <ArrowUpIcon className="w-4 h-4 max-sm:h-2 max-sm:w-2" />}
          </div>
				</div>
			</div>
		</div>
	);
}

