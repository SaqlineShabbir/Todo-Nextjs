import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import EditTodoModal from './EditTodoModal';

const Todo = ({ todo, fetchData }) => {
    const { name, status, _id, completed, priority } = todo;

    const [openModal, setOpenModal] = useState(false);
    console.log('from', priority)
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'text-red-500 bg-red-500 rounded-full';
            case 'Medium':
                return 'text-green-500 bg-green-500 rounded-full';
            case 'Low':
                return 'text-blue-500  bg-blue-500 rounded-full';
            default:
                return 'bg-blue-500';
        }
    }
    const handleStatusChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://todo-nextjs-alpha.vercel.app/api/todo/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true, status: 'complete' }),
            });

            if (response.ok) {
                toast.success('Marked as complete')
                fetchData()

            }

        } catch (error) {
            console.error('Error updating status:', error.message);
            toast.error(error.message)
        }


    };

    //delete todo
    const handleDeleteTodo = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://todo-nextjs-alpha.vercel.app/api/todo/${_id}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                toast.success(' Successfully Deleted')
                fetchData()

            }
        } catch (error) {
            console.error('Error deleting todo:', error.message);
            toast.error(error.message)
            setError(`Error deleting todo: ${error.message}`);

        }
    };

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center  items-center mr-2  ${status && 'border-green-500 focus-within:border-green-500'
                    }`}
            >
                <Toaster />
                <input
                    type="checkbox"
                    checked={completed}
                    className="opacity-0 absolute rounded-full cursor-pointer text-blue-100"
                    onChange={handleStatusChange}
                    disabled={completed}
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            <p className={`select-none flex-1 ${completed && 'line-through'
                } hover:bg-gray-100  py-1 px-1`}
            // onKeyDown={handleTextChange}
            // onBlur={handleTextInput}
            >{name}</p>

            <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer  ${getPriorityColor(priority)}`}

            ></div>

            <div><FaRegEdit onClick={() => setOpenModal(true)} size={20} className='text-red-600 cursor-pointer' /></div>

            <div onClick={(e) => handleDeleteTodo(e)}
            ><MdDelete size={20} className='text-red-600 cursor-pointer' /></div>


            {openModal && <EditTodoModal setOpenModal={setOpenModal} todoName={name} id={_id} fetchData={fetchData}></EditTodoModal>}
        </div>
    );
};

export default Todo;
