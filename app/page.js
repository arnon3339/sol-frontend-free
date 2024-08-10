import CardContainer from "@/components/card"
import { MainLoading } from "@/components/cardsload"
import { Suspense } from "react"
import ToTopBtn from "@/components/totopbtn"
import Filter from "@/components/filter"

export default function Page({params, searchParams}) {
  return (
		 <Suspense fallback={<MainLoading />}>
		 	<main className="flex min-h-screen flex-col items-center justify-start
			 p-28 max-md:px-24 max-md:py-20 max-ssm:px-4 max-ssm:py-16 max-sm:px-2 relative">
				<ToTopBtn />
				<Filter data={searchParams}/>
				<CardContainer data={searchParams}/>
		 	</main>
		 </Suspense>
  )
}
