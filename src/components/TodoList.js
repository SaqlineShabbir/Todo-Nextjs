'use client'
import { FaCircle } from "react-icons/fa";
import { useState } from 'react';
import Todo from './Todo';
const TodoList = ({ todos, isLoading, fetchData }) => {
    const [filter, setFilter] = useState('')

    //decide what to render
    let content = null;
    if (isLoading) {
        content = (
            <>
                <p>Loading...</p>
            </>
        );
    }

    if (!isLoading && todos?.length <= 0) {
        content = <p>No Todos Found!</p>;
    }
    if (!isLoading && todos?.length > 0) {
        //filtering before map
        content = todos?.filter((todo) => {
            switch (filter) {
                case 'Low':
                    return todo.priority === 'Low';
                case 'Medium':
                    return todo.priority === 'Medium';
                case 'High':
                    return todo.priority === 'High';
                default:
                    return true;

            }
        }).map((todo) => <Todo key={todo._id} todo={todo} fetchData={fetchData} />);
    }

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {/* //filteration */}
            <div className='flex space-x-3  py-5'>
                <div className=' cursor-pointer ' onClick={() => setFilter('')}><p className="">All</p></div>
                <div className='text-blue-500 cursor-pointer' onClick={() => setFilter('Low')}><FaCircle size={18} /></div>
                <div className='text-green-500 cursor-pointer' onClick={() => setFilter('Medium')}><FaCircle size={18} /></div>
                <div className='text-red-500 cursor-pointer' onClick={() => setFilter('High')}><FaCircle size={18} /></div>

            </div>
            <hr />
            {content}

        </div>
    );
};

export default TodoList;
