import React, { useState, useEffect, useCallback } from "react";
import { TodoItem } from "./TodoItem";
import produce from "immer";

const todoListInit = [
  { id: 1, title: "task 1", done: true },
  { id: 2, title: "task 2", done: true },
  { id: 3, title: "task 3", done: false },
  { id: 4, title: "task 4", done: true },
];

// const a = () => console.log('test');
// const b = () => console.log('test');

// a === b // true ya false ??

export function TodoList() {
  const [todoList, setTodoList] = useState(todoListInit);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const removeTodo = useCallback((id: number) => {
    setTodoList(todoList.filter((x) => x.id !== id));
  }, []);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  useEffect(() => {
    console.log("TodoList");
  }, []);

  // []  -> faqat dafe aval run mishe
  // [todoList]  -> dafe aval va harbar ke todoList change mishe run mishe

  function addTodo() {
    const max = todoList.reduce((a, b) => (a > b.id ? a : b.id), -Infinity);
    const newTodo = { id: max + 1, title: newTodoTitle, done: false };

    // 1
    // let todoListNew = [];
    // for (let index = 0; index < todoList.length; index++) {
    //   const element = todoList[index];
    //   todoListNew.push(element);
    // }
    // todoListNew.push(newTodo);
    // setTodoList(todoListNew)

    // 2
    // let todoListNew = todoList.slice();
    // todoListNew.push(newTodo);
    // setTodoList(todoListNew)

    // 3
    // setTodoList([...todoList, newTodo]);

    // 4 copy deep
    // let todoListNew = JSON.parse(JSON.stringify(todoList));
    // todoListNew.push(newTodo);
    // setTodoList(todoListNew);

    // 5 immer
    const todoListNew = produce(todoList, (todoListNew) => {
      todoListNew.push(newTodo);
    });
    setTodoList(todoListNew);
    setNewTodoTitle("");
  }
  return (
    <>
      <input
        value={newTodoTitle}
        type="text"
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={addTodo}>➕</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>done</th>
            <th>id</th>
            <th>title</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onRemoveTodo={removeTodo}
            ></TodoItem>
          ))}
        </tbody>
      </table>
    </>
  );
}
