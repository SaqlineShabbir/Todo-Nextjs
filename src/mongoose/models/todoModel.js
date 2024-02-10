
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name is required"],
        trim: true
    },
    status: {
        type: String,
        required: [true, "status is required"],
        trim: true
    },
}, { timestamps: true });

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;