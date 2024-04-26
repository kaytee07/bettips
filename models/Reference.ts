import { Schema, models, model } from "mongoose";

const ReferenceSchema = new Schema({
    ref: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Refs = models.Refs || model("Refs", ReferenceSchema);
export default Refs;