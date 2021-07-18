import { query } from '@angular/animations';
import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee/employee';
import { EmployeeService } from './employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees : Employee[]=[];
  public filteredEmployees : Employee[]=[];
  public editEmployee :Employee | null=null;
  public deleteEmployee! :Employee;
  public alreadyPresent : string = "";
  constructor(private employeeService : EmployeeService){
  } 

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe((response : Employee[])=>{
      this.employees = response;
      this.filteredEmployees = response;
      console.log(response);
    },
    (error : HttpErrorResponse)=>{
      console.log(error);
    })
  }

  public onAddEmployee(addForm:NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.alreadyPresent="";
        this.getEmployees();},
      (error:HttpErrorResponse)=>{
        // alert(error.message);
        this.alreadyPresent="Employee already present.";
      }); 
  }

  public onUpdateEmployee(addForm:NgForm):void{
    document.getElementById('edit-employee-form')?.click();
    this.employeeService.updateEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.alreadyPresent="";
        this.getEmployees();},
      (error:HttpErrorResponse)=>{
        // alert(error.message);
        this.alreadyPresent="No such employee.";}); 
  }

  public onDeleteEmployee(employeeId:number|any):void{
    document.getElementById('delete-employee-form')?.click();
    if(employeeId){
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: void)=>{
          this.alreadyPresent="";
          this.getEmployees();},
        (error:HttpErrorResponse)=>{
          // alert(error.message);
          this.alreadyPresent="No such employee.";}); 
    }
  }

  public filter(title:any){
    this.filteredEmployees = (query)?
    this.employees.filter(p=>p['name'].toLowerCase().includes(title.toLowerCase())) :
    this.employees; 
  }

  public onOpenModal(employee:Employee | null,mode:String): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type="button";
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addModal');
    }
    if(mode==='edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#editModal');

    }
    if(mode==='delete'){
      if(employee)
        this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  ngOnInit(): void {
    this.getEmployees();  
  }

  
}
