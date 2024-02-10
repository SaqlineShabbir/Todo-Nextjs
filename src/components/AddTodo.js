'use client'
import React, { useState } from 'react';
import { FaCircle, FaPlus } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import toast, { Toaster } from 'react-hot-toast';


const AddTodo = ({ fetchData, todos }) => {
    const [textInput, setTextInput] = useState('');
    const [priority, setPriority] = useState('low')

    console.log(priority)
    const completedTasks = todos?.filter((todo) => todo?.status === 'complete')

    //reset from after adding
    const resetForm = (e) => {
        setTextInput('');
    };

    // add todo to data base
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://todo-nextjs-alpha.vercel.app/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: textInput,
                    status: "in-complete",
                    completed: false,
                    priority
                }),
            });

            if (response.ok) {
                toast.success('successfully added');
                resetForm()
                fetchData()
            }
        } catch (error) {
            console.error('add failed:', error.message);
            toast.error('add failed');
        }

    }
    return (
        <div>
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className=""
                action=""
            >
                <p>Define priority by selecting</p >

                <select
                    className={`px-2 py-1 bg-gray-100 w-full my-3`}
                    value={priority}
                    required
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option className='text-blue-500' value="Low">Low</option>
                    <option className='text-green-500' value="Medium">Medium</option>
                    <option className='text-red-500' value="High">High</option>
                </select>


                <div className='flex items-center bg-gray-100 px-4 py-4 rounded-md'>
                    <CgNotes size={25} className='text-gray-600' />
                    <input
                        type="text"
                        placeholder="Type your todo and tap enter"
                        className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                        value={textInput}
                        required
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button
                        type="submit"

                    ><FaPlus className='text-gray-600' /></button>
                </div>

            </form>

            {/* //counting tasks */}
            < div className='flex  py-5 justify-between'>
                <p className=''>Total Tasks {todos?.length}</p>
                <p>Completed Tasks {completedTasks?.length || 0}</p>
            </div>
        </div>
    );
};

export default AddTodo;
