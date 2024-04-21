import { createSlice } from "@reduxjs/toolkit";
import { formatDateToDayMonthYear } from "../utils/common/formatDate.js";
import { MEASUREMENTS } from "../constants/measurements.contants.js";

const date = formatDateToDayMonthYear(Date.now());

const initialState = {
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
};

const measurementSlice = createSlice({
	name: "measurements",
	initialState: {
		entities: initialState,
		error: null,
		isLoading: false,
	},
	reducers: {
		measurementsRequested: (state) => {
			state.isLoading = true;
		},
		measurementsReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		measurementsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addMeasurement: (state, action) => {
			// Получаем данные из action.payload
			const measurementData = action.payload;

			// Обновляем соответствующий объект в состоянии сущностей (entities)
			state.entities[date] = {
				...state.entities[date], // Сначала копируем предыдущие данные
				...measurementData, // Затем обновляем их данными из action.payload
			};
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

export const createMeasurement = (data) => (dispatch) => {
	dispatch(measurementsRequested());
	try {
		dispatch(addMeasurement(data));
	} catch (error) {
		dispatch(measurementsRequestFailed(error.message));
	}
};

export const saveMeasurementsToDataBase =
	() => async (dispatch, getState) => {};

export const getAllMeasurements = () => (dispatch, getState) =>
	getState().measurements.entities;

export const getTodayMeasurements = () => (dispatch, getState) =>
	getState().measurements.entities[date];

export default measurementsReducer;
