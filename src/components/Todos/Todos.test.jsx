import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import Todos from '.';

global.fetch = vi.fn();

describe("Todos component", () => {

  afterEach(() => {
    cleanup();
    localStorage.removeItem('todos');

  });

  it("Renders the Todos component", () => {
    render(<Todos />);
    const header = screen.getByText("Todo List");
    expect(header).toBeTruthy();
  });

  it("Adds a new todo", () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText("Add a new ToDo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    const newTodo = screen.getByText("New Todo");
    expect(newTodo).toBeTruthy();
  });

  it("Toggles the completion of a todo", () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText("Add a new ToDo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Toggle Todo" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByText("Toggle Todo").closest('li').querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  it("Removes a todo", () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText("Add a new ToDo");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Todo to Remove" } });
    fireEvent.click(addButton);

    const todoToRemove = screen.getByText("Todo to Remove").closest("li");
    const removeButton = todoToRemove.querySelector('button');

    fireEvent.click(removeButton);

    const todos = screen.queryAllByRole("listitem");
    expect(todos.length).toBe(0);
  });
  
  

});
