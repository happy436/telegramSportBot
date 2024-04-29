import { createSlice } from "@reduxjs/toolkit";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import { MEASUREMENTS } from "../constants/measurements.contants.js";

const date = formatDateToDayMonthYear(Date.now());

/* const initialState = {
	[date]: {
		[MEASUREMENTS.weight.param]: null,
		[MEASUREMENTS.height.param]: null,
		[MEASUREMENTS.neck.param]: null,
		[MEASUREMENTS.shoulders.param]: null,
		[MEASUREMENTS.leftBiceps.param]: null,
		[MEASUREMENTS.chest.param]: null,
		[MEASUREMENTS.rightBiceps.param]: null,
		[MEASUREMENTS.leftForearm.param]: null,
		[MEASUREMENTS.underBust.param]: null,
		[MEASUREMENTS.rightForearm.param]: null,
		[MEASUREMENTS.waist.param]: null,
		[MEASUREMENTS.butt.param]: null,
		[MEASUREMENTS.thigh.param]: null,
		[MEASUREMENTS.leftThigh.param]: null,
		[MEASUREMENTS.rightThigh.param]: null,
		[MEASUREMENTS.leftShin.param]: null,
		[MEASUREMENTS.rightShin.param]: null,
	},
}; */

const measurementSlice = createSlice({
	name: "measurements",
	initialState: {},
	reducers: {
        //add chatid
		measurementsRequested: (state) => {
			state.isLoading = true;
		},
        //add chatid
		measurementsReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
        //add chatid
		measurementsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addMeasurement: (state, action) => {
			const { chatId, data } = action.payload;

			if (!state[chatId]) {
				state[chatId] = {
					entities: {
						[date]: { ...data },
					},
				};
			} else {
				state[chatId].entities = {
					...state[chatId].entities,
					[date]: {
						...(state[chatId].entities[date] || {}), // Перевіряємо наявність entities[date]
						...data,
					},
				};
			}
		},
	},
});

const { reducer: measurementsReducer, actions } = measurementSlice;
const {
	measurementsRequested,
	measurementsReceived,
	measurementsRequestFailed,
	addMeasurement,
} = actions;

export const loadMeasurements = () => async (dispatch, getState) => {
	dispatch(measurementsRequested());
	try {
		/* const {content} = await measurementService.getMeasurements(chatId)
		dispatch(measurementsReceived(content)); */
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const createMeasurement = (chatId, data) => (dispatch, getState) => {
	dispatch(measurementsRequested());
	try {
		dispatch(addMeasurement({ chatId, data }));
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const saveMeasurementsToDataBase =
	() => async (dispatch, getState) => {};

export const getAllMeasurements = (chatId) => (dispatch, getState) =>
	getState().measurements[chatId].entities;

export const getTodayMeasurements = (chatId) => (dispatch, getState) => {
	const measurements = getState().measurements;
	if (measurements && measurements[chatId] && measurements[chatId].entities) {
		return measurements[chatId].entities[date];
	}
	return {height:null}; // або інше значення за замовчуванням, якщо потрібно
};

export default measurementsReducer;
