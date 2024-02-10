'use client'

import Todo from './Todo';
const TodoList = ({ todos, isLoading, fetchData }) => {


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
        content = todos.map((todo) => <Todo key={todo._id} todo={todo} fetchData={fetchData} />);
    }

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {content}

        </div>
    );
};

export default TodoList;
