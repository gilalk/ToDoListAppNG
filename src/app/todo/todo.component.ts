import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // An array for the tasks
  tasks: string[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm) {
    let newTask = addForm.value.task;
    this.tasks.push(newTask)
    addForm.resetForm();
  }

  handleRemove(t:string){
    this.tasks = this.tasks.filter((myTask) => myTask != t);
  }

}
