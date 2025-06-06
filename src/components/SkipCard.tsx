"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleAlert, CircleAlert } from "lucide-react";

import type { SkipData } from "../types";
import { imageUrl, priceAfterVat } from "@/utils";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface SkipCardProps {
	skip: SkipData | null | undefined;
	selected?: boolean;
	hire: (data: SkipData) => void;
	onSelect: (data: number | null) => void;
}

export function SkipCard({
	skip,
	onSelect,
	selected = false,
	hire,
}: SkipCardProps) {
	return (
		<>
			{skip && (
				<Sheet>
					<SheetTrigger asChild>
						<Card
							className={`
						w-[300px]
					
      bg-slate-800 border-2 transition-all duration-200 hover:border-slate-600
      ${selected ? "border-blue-500" : "border-slate-700"}
    `}>
							<CardContent className="p-0">
								<div className="relative px-2">
									<img
										src={imageUrl(skip.size) || "/placeholder.svg"}
										alt={`${skip.size} Yard Skip`}
										className="w-full h-48 object-cover rounded-lg"
									/>
									{!skip.allowed_on_road && (
										<div className="absolute top-3 right-3 bg-transparent ">
											<Tooltip>
												<TooltipTrigger>
													<TriangleAlert color="#fc0f03" fill="white" />
												</TooltipTrigger>
												<TooltipContent>
													<p className="font-bold text-xs">
														Not allowed on roads
													</p>
												</TooltipContent>
											</Tooltip>
										</div>
									)}
								</div>

								<div className="p-6 text-start">
									<h3 className="text-xl text font-bold text-white mb-2">
										{skip.size} Yard Skip
									</h3>
									<p className="text-slate-400 text-sm mb-4">
										{skip.hire_period_days} day hire period
									</p>
									<p className="text-3xl font-bold text-blue-400 mb-6">
										£{skip.price_before_vat}
									</p>

									<Button
										onClick={() => {
											onSelect(skip.id);
										}}
										className={`
              w-full transition-all duration-200
              ${
								selected
									? "bg-blue-600 hover:bg-blue-700 text-white"
									: "bg-slate-700 hover:bg-slate-600 text-white"
							}
            `}>
										{selected ? <>Selected</> : "Hire"}
									</Button>
								</div>
							</CardContent>
						</Card>
					</SheetTrigger>
					<SheetContent className="h-screen overflow-y-scroll bg-slate-800 border-none">
						<SheetHeader className="">
							<SheetTitle className="text-white">Selected Skip</SheetTitle>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<p className="text-white font-semibold text-sm">#{skip.id}</p>

								<img
									src={imageUrl(skip.size) || "/placeholder.svg"}
									alt={`${skip.size} Yard Skip`}
									className="w-full h-48 object-cover "
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Size</p>
									<p className="text-white text-xs ">{skip.size} yard skip</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">
										Hire Period
									</p>
									<p className="text-white text-xs ">
										{skip.hire_period_days} days
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">
										Transport Cost
									</p>
									<p className="text-white text-xs ">
										£{skip.transport_cost ?? 0}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">
										Per Tonne Cost
									</p>
									<p className="text-white text-xs ">
										£{skip.per_tonne_cost ?? 0}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Price</p>
									<p className="text-white text-xs ">
										£{skip.price_before_vat ?? 0}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Vat</p>
									<p className="text-white text-xs ">{skip.vat ?? 0}%</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Postcode</p>
									<p className="text-white text-xs ">
										{skip.postcode ?? "N/A"}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Area</p>
									<p className="text-white text-xs ">
										{!skip.area || skip.area.length < 1 ? "N/A" : skip.area}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">Forbidden</p>
									<p className="text-white text-xs ">
										{skip.forbidden ? "Yes" : "No"}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">
										Allowed on Roads
									</p>
									<p className="text-white text-xs ">
										{skip.allowed_on_road ? "Yes" : "No"}
									</p>
								</div>
								<div className=" gap-1">
									<p className="text-white font-semibold text-sm">
										Allows Heavy Waste
									</p>
									<p className="text-white text-xs ">
										{skip.allows_heavy_waste ? "Yes" : "No"}
									</p>
								</div>
							</div>
						</div>
						<div className="text-white   h-full font-semibold text-center">
							<p>Total £{priceAfterVat(skip.price_before_vat, skip.vat)}</p>
						</div>
						<SheetFooter className="mb-5 flex flex-col ">
							<div className="flex-col flex  gap-3 w-full mb-5">
								<Button
									type="submit"
									onClick={() => {
										hire(skip);
										onSelect(skip.id);
									}}>
									Hire Skip
								</Button>
								<SheetClose asChild>
									<Button onClick={() => onSelect(null)} variant="outline">
										Back
									</Button>
								</SheetClose>
							</div>
							<span className="">
								<CircleAlert color="white" className="shrink-0" size={12} />
								<p className="text-slate-400 text-[10px] font-medium ">
									Imagery and information shown throughout this website may not
									reflect the exact shape or size specification, colours may
									vary, options and/or accessories may be featured at additional
									cost.
								</p>
							</span>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			)}
		</>
	);
}
