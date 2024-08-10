import OwnersLoader from "./ownerloader";

export default function NftOwners({mint, name, kind}){
    if (mint) 
      return (<OwnersLoader mint={mint} name={name} kind={kind}/>);
    else
      return (<div className="px-20 bg-white/50 backdrop-blur-lg py-4 pt-5 w-[800px]
          text-center rounded-2xl border-2 border-gray-400 max-md:w-[80%] max-sm:w-[95%]
          max-lg:w-[400px] max-lg:py-1">
            No onchain data</div>);
  }
