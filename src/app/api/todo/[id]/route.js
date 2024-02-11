import { connect } from "@/connectDB/conectDB";
import Todo from "@/mongoose/models/todoModel";
import { NextResponse } from "next/server";

//edit task
export async function PATCH(request, { params }) {
    await connect();

    try {
        const data = await request.json();
        const { id } = params;


        // Assuming the ID is passed as a parameter in the URL
        const todo = await Todo.findOneAndUpdate({ _id: id }, data, { new: true });

        // Check if the todo was not found 
        if (!todo) {
            return NextResponse.json({
                message: "todo not found",
                success: false,
            });
        }

        // Return success response with the updated todo data
        return NextResponse.json({
            message: "Successfully updated todo",
            success: true,
            todo
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        return NextResponse.json({
            message: error.message,
            success: false,
        }, { status: 500 });
    }
}
// delete tasks
export async function DELETE(request, { params }) {
    await connect();

    try {
        const { id } = params;

        // Assuming the ID is passed as a parameter in the URL
        const todo = await Todo.findOneAndDelete({ _id: id });

        // Check if the todo was found and updated
        if (!todo) {
            return NextResponse.json({
                message: "todo not found",
                success: false,
            });
        }

        // Return success response with the updated todo data
        return NextResponse.json({
            message: "Successfully Deleted Todo",
            success: true,
            todo,
        });
    } catch (error) {
        console.error('Error deleteing Todo:', error);
        return NextResponse.json({
            message: error.message,
            success: false,
        },);
    }
}