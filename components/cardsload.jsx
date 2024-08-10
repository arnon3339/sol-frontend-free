"use client";

export function MainLoading() {

	const numCard = 100;

	const LoadingCard = () => {
		return (
			<div className="rounded-md w-[200px] h-[250px] 2xl:w-[250px] 2xl:h-[300px] my-card-loading" >
				<div className="relative w-full h-full">
					<div className="flex flex-col justify-between items-center absolute top-0 l-0 w-full h-full p-4">
						<div className="w-[180px] h-[180px] block bg-gray-400 2xl:w-[230px] 2xl:h-[230px]">	
						</div>
						<div className="flex flex-row justify-center items-center">
						{
							Array.from({length: 4}).map((_, i) => (
								<div key={`loading-card-text-${i}`} className=" rounded-sm w-4 h-6 bg-gray-400 mx-1 mt-6"></div>
							))
						}
						</div>
					</div>
					<div className="absolute top-0 left-0 w-full h-full loading-gradient-box">
					</div>
				</div>
			</div>
		);
	}

  return (
		<div className="card-container-loading">
		{
			Array.from({length: numCard}).map((_, i) => {
				return (
						<LoadingCard key={`card-loading-${i}`}/>
					);
				})
		}
		</div>
  )
};
