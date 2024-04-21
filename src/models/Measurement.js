import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	measurements: {
		type: {
			height: Number,
			neck: Number,
			shoulders: Number,
			left_biceps: Number,
			chest: Number,
			right_biceps: Number,
			left_forearm: Number,
			under_bust: Number,
			right_forearm: Number,
			waist: Number,
			butt: Number,
			thigh: Number,
			left_thigh: Number,
			right_thigh: Number,
			left_shin: Number,
			right_shin: Number,
		},
		required: true,
	},
});

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;