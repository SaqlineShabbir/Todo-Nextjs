'use client'
import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloudUploadOutline } from 'react-icons/io5';
const EditTodoModal = ({ setOpenModal, todoName, id, fetchData }) => {

    const [name, setName] = useState(todoName)

    //post actual data to  backend

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://todo-nextjs-alpha.vercel.app/api/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });

            if (response.ok) {
                setOpenModal(false)
                fetchData()

            }

        } catch (error) {
            console.error('Error updating status:', error.message);

        }
    }

    return (

        <div
            id="close"
            onClick={(e) => {
                if (e.target.id === 'close') {
                    setOpenModal(false);
                }
            }}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 w-full h-full   overflow-y-scroll"
            style={{ marginLeft: 0 }}
        >
            <div className="rounded  w-[300px] md:w-[300px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ">
                <IoIosCloseCircle size={20} color='red' className='cursor-pointer' onClick={() => setOpenModal(false)} />


                <h1 className=" lg:text-3xl text-gray-700 mb-5">
                    Update Todo
                </h1>
                <hr />

                <div>

                </div>
                {/* //helllo */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2"

                            placeholder={todoName}

                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Toaster />

                    <button className='px-8 py-1 bg-green-400' type='submit' width='w-full' >submit</button>
                </form>

            </div>
        </div>

    );
};

export default EditTodoModal;
