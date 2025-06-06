import {
	MapPin,
	Trash2,
	ShoppingCart,
	FileCheck,
	Calendar,
	CreditCard,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const steps = [
	{ icon: MapPin, label: "Postcode" },
	{ icon: Trash2, label: "Waste Type" },
	{ icon: ShoppingCart, label: "Select Skip" },
	{ icon: FileCheck, label: "Permit Check" },
	{ icon: Calendar, label: "Choose Date" },
	{ icon: CreditCard, label: "Payment" },
];

export function Progress() {
	const [active, setActive] = useState<number>(2);
	const [ActivePage, setActivePage] = useState<{
		icon: React.ElementType;
		label: string;
	}>(steps[active]);

	return (
		<>
			<ScrollArea className="md:w-[700px] lg:w-full md:flex flex-col hidden whitespace-nowrap">
				<div className="flex items-center justify-center  mx-auto">
					{steps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div key={step.label} className="flex items-center">
								<div className="flex items-center space-x-3">
									<div
										className={
											"flex items-center justify-center w-10 h-10 rounded-full "
										}>
										<Icon
											className="w-5 h-5"
											color={active >= index ? "#3b81f4" : "#5e6573"}
										/>
									</div>
									<span
										className={`
                text-xs font-medium
                ${active === index ? "text-blue-400" : "text-slate-400"}
              `}>
										{step.label}
									</span>
								</div>
								{index < steps.length - 1 && (
									<div className="w-16 h-px bg-slate-600 mx-4" />
								)}
							</div>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div className="flex md:hidden items-center gap-2">
				<ActivePage.icon color="#3b81f4" size={18} />
				<p className="text-sm font-medium  text-blue-400">{ActivePage.label}</p>
			</div>
		</>
	);
}
