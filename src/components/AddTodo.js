'use client'
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import toast, { Toaster } from 'react-hot-toast';

const AddTodo = () => {
    const [textInput, setTextInput] = useState('');

    //reset from after adding
    const resetForm = (e) => {
        setTextInput('');
    };

    // add todo to data  base
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
                    status: "in-complete"
                }),
            });

            if (response.ok) {
                toast.success('successfully added');
                resetForm()
            } else {
                const errorData = await response.json();
                console.log('add failed:', errorData);

                toast.error(errorData.message || 'add failed');
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
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                action=""
            >
                <CgNotes size={25} className='text-gray-600' />
                <input
                    type="text"
                    placeholder="Type your todo and tap enter"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button
                    type="submit"

                ><FaPlus className='text-gray-600' /></button>
            </form>

        </div>
    );
};

export default AddTodo;