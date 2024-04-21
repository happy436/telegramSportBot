import { combineReducers, configureStore } from "@reduxjs/toolkit";
import measurementsReducer from "./measurement.js";
import userReducer from "./user.js";
import buttonsReducer from "./buttons.js";

const rootReducer = combineReducers({
	measurements: measurementsReducer,
	user: userReducer,
    buttons: buttonsReducer
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}

const store = createStore();
export const getState = () => store.getState();
export const dispatch = (func) => store.dispatch(func);
