import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FilterState } from "../types";

import { ScrollArea } from "./ui/scroll-area";

interface FilterSidebarProps {
	filters: FilterState;
	onFilterChange: (filters: FilterState) => void;
	selectPeriods: number[];
}

const sizes = [4, 6, 8, 10, 12, 14];

export function FilterSidebar({
	filters,
	onFilterChange,
	selectPeriods,
}: FilterSidebarProps) {
	const skipSizes = Array.from(new Set([...sizes, ...filters.skipSizes])).sort(
		(a, b) => a - b
	);
	const periods = Array.from(new Set(selectPeriods)).sort((a, b) => a - b);

	const handleSkipSizeChange = (size: number, checked: boolean) => {
		const newSizes = checked
			? [...filters.skipSizes, size]
			: filters.skipSizes.filter((s) => s !== size);

		onFilterChange({
			...filters,
			skipSizes: newSizes,
		});
	};

	const handlePriceRangeChange = (value: number[]) => {
		onFilterChange({
			...filters,
			price: value[0],
		});
	};

	const handleHirePeriodChange = (value: string) => {
		onFilterChange({
			...filters,
			hirePeriod: value,
		});
	};

	const handleHeavyWasteChange = (checked: boolean) => {
		onFilterChange({
			...filters,
			allowsHeavyWaste: checked,
		});
	};

	const handleAllowedOnRoadChange = (checked: boolean) => {
		onFilterChange({
			...filters,
			allowedOnRoad: checked,
		});
	};

	return (
		<Card className="bg-slate-800 border-slate-700 shrink-0 w-[280px] max-h-[600px]  gap-4 flex items-start">
			<CardHeader className="w-full pr-0 text-start">
				<CardTitle className="text-white">Filter Options</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<div className="w-full">
					<h3 className="text-white font-normal text-sm text-start mb-4">
						Skip Size (Yards)
					</h3>
					<ScrollArea className="h-[200px]  ">
						{skipSizes.map((size) => (
							<div key={size} className="flex mt-3 items-center space-x-2">
								<Checkbox
									id={`size-${size}`}
									checked={filters.skipSizes.includes(size)}
									onCheckedChange={(checked) =>
										handleSkipSizeChange(size, checked as boolean)
									}
									className="border-slate-600 data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"
								/>
								<label
									htmlFor={`size-${size}`}
									className="text-white text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									{size} Yards
								</label>
							</div>
						))}
					</ScrollArea>
				</div>

				<div className="w-full mt-4">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="heavy-waste"
							checked={!!filters.allowsHeavyWaste}
							onCheckedChange={(checked) =>
								handleHeavyWasteChange(checked as boolean)
							}
							className="border-slate-600 data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"
						/>
						<label
							htmlFor="heavy-waste"
							className="text-white text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Allows Heavy Waste
						</label>
					</div>
					<div className="flex items-center space-x-2 mt-2">
						<Checkbox
							id="allowed-on-road"
							checked={!!filters.allowedOnRoad}
							onCheckedChange={(checked) =>
								handleAllowedOnRoadChange(checked as boolean)
							}
							className="border-slate-600 data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"
						/>
						<label
							htmlFor="allowed-on-road"
							className="text-white text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Allowed On Road
						</label>
					</div>
				</div>

				<div className="w-full">
					<div>
						<h3 className="text-white text-sm text-start font-normal mb-4 mt-5">
							Price Range
						</h3>
						<div>
							<p className="text-white text-sm  font-normal  mb-1 mt-5">
								£{filters.price}
							</p>
						</div>
					</div>
					<div className=" w-full">
						<Slider
							value={[filters.price]}
							onValueChange={handlePriceRangeChange}
							min={filters.priceRange[0]}
							max={filters.priceRange[1]}
							step={10}
							className={"w-full]"}
						/>
						<div className="flex justify-between text-sm text-slate-400 mt-2">
							<span>£{filters.priceRange[0]}</span>
							<span>£{filters.priceRange[1]}</span>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-white text-start  text-sm font-normal mb-4 my-5">
						Hire Period
					</h3>
					<Select
						value={filters.hirePeriod}
						onValueChange={handleHirePeriodChange}>
						<SelectTrigger
							value={filters.hirePeriod}
							className="bg-slate-700 w-full border-slate-600 text-white">
							<SelectValue placeholder="Select hire period" />
						</SelectTrigger>
						<SelectContent className="bg-slate-700 text-white border-slate-600">
							<ScrollArea className="h-[200px]">
								<SelectItem value="Any">Any</SelectItem>
								{periods.map((per) => (
									<SelectItem key={per.toString()} value={per.toString()}>
										{per} days
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}
