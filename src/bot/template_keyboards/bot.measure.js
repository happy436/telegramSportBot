import { MEASUREMENTS } from "../../constants/measurements.contants.js";

export const measurementCommandUp = [
	[
		{
			text: MEASUREMENTS.height.value + ", " + MEASUREMENTS.height.units,
			callback_data:
				MEASUREMENTS.height.param + " | " + MEASUREMENTS.height.value,
		},
		{
			text: MEASUREMENTS.weight.value + ", " + MEASUREMENTS.weight.units,
			callback_data:
				MEASUREMENTS.weight.param + " | " + MEASUREMENTS.weight.value,
		},
	],
	[
		{
			text: MEASUREMENTS.neck.value + ", " + MEASUREMENTS.neck.units,
			callback_data:
				MEASUREMENTS.neck.param + " | " + MEASUREMENTS.neck.value,
		},
	],
	[
		{
			text:
				MEASUREMENTS.shoulders.value +
				", " +
				MEASUREMENTS.shoulders.units,
			callback_data:
				MEASUREMENTS.shoulders.param +
				" | " +
				MEASUREMENTS.shoulders.value,
		},
	],
	[
		{
			text:
				MEASUREMENTS.leftBiceps.value +
				", " +
				MEASUREMENTS.leftBiceps.units,
			callback_data:
				MEASUREMENTS.leftBiceps.param +
				" | " +
				MEASUREMENTS.leftBiceps.value,
		},
		{
			text: MEASUREMENTS.chest.value + ", " + MEASUREMENTS.chest.units,
			callback_data:
				MEASUREMENTS.chest.param + " | " + MEASUREMENTS.chest.value,
		},
		{
			text:
				MEASUREMENTS.rightBiceps.value +
				", " +
				MEASUREMENTS.rightBiceps.units,
			callback_data:
				MEASUREMENTS.rightBiceps.param +
				" | " +
				MEASUREMENTS.rightBiceps.value,
		},
	],
	[{ text: ">>", callback_data: "next2" }],
	[{ text: "Назад до меню", callback_data: "backToMeasurementMenu" }],
];

export const measurementCommandMiddle = [
	[
		{
			text:
				MEASUREMENTS.leftForearm.value +
				", " +
				MEASUREMENTS.leftForearm.units,
			callback_data:
				MEASUREMENTS.leftForearm.param +
				" | " +
				MEASUREMENTS.leftForearm.value,
		},
		{
			text:
				MEASUREMENTS.underBust.value +
				", " +
				MEASUREMENTS.underBust.units,
			callback_data:
				MEASUREMENTS.underBust.param +
				" | " +
				MEASUREMENTS.underBust.value,
		},
		{
			text:
				MEASUREMENTS.rightForearm.value +
				", " +
				MEASUREMENTS.rightForearm.units,
			callback_data:
				MEASUREMENTS.rightForearm.param +
				" | " +
				MEASUREMENTS.rightForearm.value,
		},
	],
	[
		{
			text: MEASUREMENTS.waist.value + ", " + MEASUREMENTS.waist.units,
			callback_data:
				MEASUREMENTS.waist.param + " | " + MEASUREMENTS.waist.value,
		},
	],
	[
		{
			text: MEASUREMENTS.butt.value + ", " + MEASUREMENTS.butt.units,
			callback_data:
				MEASUREMENTS.butt.param + " | " + MEASUREMENTS.butt.value,
		},
	],
	[
		{ text: "<<", callback_data: "back1" },
		{ text: ">>", callback_data: "next3" },
	],

	[{ text: "Назад до меню", callback_data: "backToMeasurementMenu" }],
];

export const measurementCommandDown = [
	[
		{
			text: MEASUREMENTS.thigh.value + ", " + MEASUREMENTS.thigh.units,
			callback_data:
				MEASUREMENTS.thigh.param + " | " + MEASUREMENTS.thigh.value,
		},
	],
	[
		{
			text:
				MEASUREMENTS.leftThigh.value +
				", " +
				MEASUREMENTS.leftThigh.units,
			callback_data:
				MEASUREMENTS.leftThigh.param +
				" | " +
				MEASUREMENTS.leftThigh.value,
		},
		{
			text:
				MEASUREMENTS.rightThigh.value +
				", " +
				MEASUREMENTS.rightThigh.units,
			callback_data:
				MEASUREMENTS.rightThigh.param +
				" | " +
				MEASUREMENTS.rightThigh.value,
		},
	],
	[
		{
			text:
				MEASUREMENTS.leftShin.value +
				", " +
				MEASUREMENTS.leftShin.units,
			callback_data:
				MEASUREMENTS.leftShin.param +
				" | " +
				MEASUREMENTS.leftShin.value,
		},
		{
			text:
				MEASUREMENTS.rightShin.value +
				", " +
				MEASUREMENTS.rightShin.units,
			callback_data:
				MEASUREMENTS.rightShin.param +
				" | " +
				MEASUREMENTS.rightShin.value,
		},
	],
	[{ text: "<<", callback_data: "back2" }],
	[{ text: "Назад до меню", callback_data: "backToMeasurementMenu" }],
];
