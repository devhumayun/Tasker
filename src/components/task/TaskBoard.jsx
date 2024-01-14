import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchBar from "./SearchBar";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const initialTask = {
    id: "1",
    title: "React Developers",
    description: "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ['web', 'Api'],
    priority: "Hight",
    isFavourite: false
}

export default function TaskBoard() {

    const [tasks, setTask] = useState([initialTask])
    const [showTaskAddModal, setShowTaskAddModal] = useState(false)
    const [updateTask, setUpdateTask] = useState(null)

    function handleClickShowModal() {
        setShowTaskAddModal(true)
    }

    const handleAddTask = (e, newTask, isAdd) => {
        e.preventDefault()
        if (isAdd) {
            setTask([
                ...tasks,
                newTask
            ])
        } else {
            setTask(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask
                    }
                    return task
                })
            )
        }
        setShowTaskAddModal(false)
    }

    function handleEditTask(task) {
        setUpdateTask(task)
        setShowTaskAddModal(true)
    }

    // Close the modal
    function handleModalClose() {
        setShowTaskAddModal(false)
        setUpdateTask(null)
    }

    // delete task one by one
    function handleTaskDelete(taskId) {
        const taskAfterDelete = tasks.filter(task => task.id !== taskId)
        setTask(taskAfterDelete)
    }

    // delete all task
    function handleDeleteAllTask() {
        tasks.length = 0
        setTask([...tasks])
    }

    // toggle task favourite toggle
    function handleTaskFav(favId) {
        const taskIndex = tasks.findIndex(task => task.id === favId)

        const newTask = [...tasks]
        newTask[taskIndex].isFavourite = !newTask[taskIndex].isFavourite
        setTask(newTask)
    }


    return (
        <>
            {
                showTaskAddModal && <AddTaskModal onSave={handleAddTask} updateTask={updateTask} handleModalClose={handleModalClose} />
            }
            <section className="mb-20" id="tasks">
                <div className="container">
                    <SearchBar />
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <TaskAction handleShowAddModal={handleClickShowModal} onDeleteAllTask={handleDeleteAllTask} />
                        <TaskList tasks={tasks} handleEditTaskModal={handleEditTask} onDelete={handleTaskDelete} onFav={handleTaskFav} />
                    </div>
                </div>
            </section>
        </>
    );
}