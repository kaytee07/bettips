import { Schema, models, model } from "mongoose";

const TipsSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tipType: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Tips = models.Tips || model("Tips", TipsSchema);
export default Tips;

