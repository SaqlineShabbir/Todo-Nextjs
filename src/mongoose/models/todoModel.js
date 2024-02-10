
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
    priority: {
        type: String,
        required: [true, "priority is required"],

    },
    completed: {
        type: Boolean,
        required: [true, "completed is required"],

    },
}, { timestamps: true });

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;