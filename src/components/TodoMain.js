'use client'
import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const TodoMain = () => {

    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch todo data
    const fetchData = async () => {
        try {
            const response = await fetch('https://todo-nextjs-alpha.vercel.app/api/todo', {
                method: 'GET'
            });

            const data = await response.json();
            setTodos(data?.todos)

            if (data?.success) {
                setIsLoading(false)
            }

        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching data:', error.message);
        }
    };

    // Call the fetchData function 
    useEffect(() => {
        fetchData();

    }, []);
    return (
        <div>
            <AddTodo fetchData={fetchData} todos={todos} />
            <hr className="mt-4" />
            <TodoList todos={todos} isLoading={isLoading} fetchData={fetchData} />
            <hr className="mt-4" />
        </div>
    );
};

export default TodoMain;