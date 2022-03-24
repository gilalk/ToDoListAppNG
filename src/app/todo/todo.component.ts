import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task {
  name: string;
  isUpdated: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // An array for the tasks
  tasks: Task[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm) {
    let newTask = {name: addForm.value.task, isUpdated: false};
    this.tasks.push(newTask)
    addForm.resetForm();
  }

  handleRemove(t:string){
    this.tasks = this.tasks.filter((myTask: Task) => myTask.name != t);
  }

  handleUpdate(t:Task){
    t.isUpdated = true;
  }

  handleFinishUpdate(oldName: string, newTaskName: string) {
    // get task from array to new variable
    let updatedTask: Task = this.tasks.filter((t) => t.name === oldName)[0];

    //Now change the name
    updatedTask.name = newTaskName;

    //canceling update mode
    updatedTask.isUpdated = false;
  }
}
