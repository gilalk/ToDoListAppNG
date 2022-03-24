import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task {
  name: string;
  isUpdated: boolean;
  isVisible: boolean;
}

enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // An array for the tasks
  tasks: Task[] = [];

  readonly TASKS_KEY = 'tasks';

  SortEnum = SortOptions;
  sort: SortOptions = SortOptions.NONE;

  constructor() {
  }

  ngOnInit(): void {
    let savedTasksJson = localStorage.getItem(this.TASKS_KEY);

    if(savedTasksJson != null){
      this.tasks = JSON.parse(savedTasksJson);
      this.handleSearch("");
    }
  }

  handleSubmit(addForm: NgForm) {
    let newTask = { name: addForm.value.task, isUpdated: false, isVisible: true };
    this.tasks.push(newTask)
    addForm.resetForm();
  }

  handleRemove(t: string) {
    this.tasks = this.tasks.filter((myTask: Task) => myTask.name != t);
    this.handleSave();
  }

  handleUpdate(t: Task) {
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

  handleSort(sortDirection: SortOptions) {
    
    if (sortDirection === this.sort){
      this.sort = SortOptions.NONE;
      return;
    }

    //Keeps the current state of the sort
    this.sort = sortDirection;

    switch (sortDirection) {
      case SortOptions.ASC:
        this.tasks = this.tasks.sort((a: Task, b: Task) =>{
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if (aLower < bLower){
            return -1;
          }
          if (aLower > bLower){
            return 1;
          }
          return 0;
        })
        break;
      case SortOptions.DESC:
        this.tasks = this.tasks.sort((a: Task, b: Task) =>{
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();

          if (aLower < bLower){
            return 1;
          }
          if (aLower > bLower){
            return -1;
          }
          return 0;
        })
        break;
      case SortOptions.NONE:
        break;
      default:
        break;
    }
  }

  handleSearch(v:string){
    this.tasks.map( (task) => {
      task.isVisible = (task.name.includes(v));
    });
  }

  handleSave() : void{
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.tasks))
  }
}
