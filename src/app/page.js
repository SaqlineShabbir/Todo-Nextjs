import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import TodoMain from "@/components/TodoMain";


export default function Home() {
  return (
    <main className="">
      <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
        <Navbar />

        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <TodoMain></TodoMain>

        </div>
      </div>



    </main>
  );
}
