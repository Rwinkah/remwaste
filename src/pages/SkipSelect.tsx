import { useEffect, useState } from "react";

import { FilterSidebar } from "../components/FilterSidebar";
import type { SkipData, FilterState } from "../types";
import { Progress } from "../components/Progress";
import { SkipCard } from "../components/SkipCard";
import { fetchSkips, filterSkips } from "../utils";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { ChevronLeft, Filter } from "lucide-react";

import { Button } from "../components/ui/button";

export default function SkipSelect() {
	const [filter, setFilter] = useState<FilterState>({
		skipSizes: [4, 6, 8], // Example skip sizes
		priceRange: [100, 500], // Example price range (min, max)
		hirePeriod: "", // Example hire period,
		price: 500,
		allowedOnRoad: false,
		allowsHeavyWaste: false,
	});

	const [skip, selectSkip] = useState<SkipData | null>(null);
	const [active, setActive] = useState<number | null>(null);
	const [skipData, setSkipData] = useState<SkipData[]>([]);
	const [hirePeriods, setHirePeriods] = useState<number[]>([7, 12, 10]);

	useEffect(() => {
		const fetchData = async () => {
			const skips = await fetchSkips();

			setSkipData(skips);

			if (skips && skips.length > 0) {
				const prices = skips.map((s: SkipData) => s.price_before_vat);
				const sizes = skips.map((s: SkipData) => s.size);
				const periods = skips.map((s: SkipData) => s.hire_period_days);
				setHirePeriods((per) => [...periods, ...per]);

				const minPrice = Math.min(...prices);
				const maxPrice = Math.max(...prices);

				setFilter((prev) => ({
					...prev,
					priceRange: [minPrice, maxPrice],
					price: maxPrice,
					skipSizes: sizes,
				}));
			}
		};
		fetchData();
	}, []);

	console.log(skip);
	return (
		<div className="w-full flex flex-col items-center xs:p-1 sm:p-[2rem]">
			<div className="flex gap-5 w-full items-center pb-5 ">
				<Button variant={"ghost"} className="!p-0 md:hidden">
					<ChevronLeft color="#3b81f4" size={18} strokeWidth={5} />
				</Button>
				<div className="flex justify-between w-full items-center">
					<Progress />
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger className="flex items-center font-bold text-xs text-white  gap-2">
								<p> Filters</p>
								<Filter fill="white" color="white" size={16} />
							</SheetTrigger>
							<SheetContent side="right" className="bg-transaprent border-none">
								<FilterSidebar
									selectPeriods={hirePeriods}
									filters={filter}
									onFilterChange={setFilter}
								/>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
			<div className="mt-[20px]  hidden md:flex mb-[50px] flex-col gap-2">
				<h1 className="text-white font-bold text-2xl">Choose Your Skip Size</h1>
				<p className="text-sm font-light text-slate-400">
					Select the skip size that best suits your need
				</p>
			</div>
			<div className="overflow-hidden max-w-[1440px] w-full ">
				<div className="flex justify-center gap-5">
					<div className="md:flex hidden">
						<FilterSidebar
							selectPeriods={hirePeriods}
							filters={filter}
							onFilterChange={setFilter}
						/>
					</div>
					<ScrollArea className="h-[80vh] md:h-[70vh] w-full flex">
						<div className="md:hidden">
							<div className="mt-[50px] mb-5 flex flex-col gap-2">
								<h1 className="text-white font-bold text-2xl">
									Choose Your Skip Size
								</h1>
								<p className="text-sm font-light text-slate-400">
									Select the skip size that best suits your need
								</p>
							</div>
						</div>
						<div className=" flex w-full  gap-5 flex-wrap  items-center justify-center    ">
							{filterSkips(skipData, filter).map((skips) => (
								<SkipCard
									key={skips.id}
									onSelect={setActive}
									skip={skips}
									selected={active === skips.id}
									hire={selectSkip}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
