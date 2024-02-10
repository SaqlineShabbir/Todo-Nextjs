import { connect } from "@/connectDB/conectDB";
import Todo from "@/mongoose/models/todoModel";
import { NextResponse } from "next/server";


export async function POST(request) {

    await connect()
    try {
        const { name, status } = await request.json()
        //create todo
        const response = await Todo.create({
            name,
            status

        });

        // Return success response
        return NextResponse.json({
            message: "Todo created successfully",
            success: true,
            response

        });

    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({
            error: error.message
        });
    }
}