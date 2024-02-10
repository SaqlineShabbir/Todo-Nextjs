import { connect } from "@/connectDB/conectDB";
import Todo from "@/mongoose/models/todoModel";
import { NextResponse } from "next/server";

//add todo
export async function POST(request) {

    await connect()
    try {
        const { name, status, completed, priority } = await request.json()

        //create todo
        const response = await Todo.create({
            name,
            status,
            priority,
            completed

        });

        // Return success response
        return NextResponse.json({
            message: "Todo created successfully",
            success: true,
            response

        });

    } catch (error) {
        console.error('Error creating:', error);
        return NextResponse.json({
            error: error.message
        });
    }
}
//get todo
export async function GET(request) {
    await connect()
    try {

        const todos = await Todo.find({})

        if (!todos) {
            return NextResponse.json({
                message: error.message
            });

        }
        // Return success response
        return NextResponse.json({
            message: "successfully get Todos",
            success: true,
            todos
        });

    } catch (error) {
        console.error('Error getting :', error);
        return NextResponse.json({
            message: error.message
        }, { status: 500 });

    }
}