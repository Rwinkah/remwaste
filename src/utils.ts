import axios from "axios";
import type { FilterState, SkipData } from "./types";

export async function fetchSkips(postcode = "NR32", area = "Lowestoft") {
	const url = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${encodeURIComponent(
		area
	)}`;
	const response = await axios.get(url);
	return response.data;
}

export const imageUrl = (size: number) => {
	return `/assets/${size}-yarder-skip.jpg`;
};
export function priceAfterVat(price: number, vat: number) {
	return Math.round((price + (vat / 100) * price) * 100) / 100;
}

export function filterSkips(
	skips: SkipData[],
	filter: FilterState
): SkipData[] {
	return skips.filter((skip) => {
		const sizeMatch =
			filter.skipSizes.length === 0 || filter.skipSizes.includes(skip.size);

		const priceMatch = skip.price_before_vat <= filter.price;

		// Filter by hire period (if set)
		const hirePeriodMatch =
			!filter.hirePeriod ||
			filter.hirePeriod === "Any" ||
			skip.hire_period_days === Number(filter.hirePeriod);

		return sizeMatch && priceMatch && hirePeriodMatch;
	});
}
