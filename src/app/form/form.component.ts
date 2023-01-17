import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
    this.getData()
  }
  public userForm: FormGroup;
  Alldata: any = [];
  id:any="";
  name: string = "";
  designation: string = "";
  salary: any = "";

 
  formData: any = []


  constructor(private fb: FormBuilder) {
    // Form element defined below
    this.userForm = this.fb.group({
      id:"",
      name: '',
      designation: "",
      salary: "",

    });
  }
  public saveData(key: string, value: string) {
    let data: any = localStorage.getItem(key) ? localStorage.getItem(key) : "[]";
    let finaldata = JSON.parse(data);
    let task: any = [...finaldata, value]
    localStorage.setItem(key, JSON.stringify(task));
  
    // location.reload()
  }

  reset() {
    this.userForm.reset();
  }

  getData() {

    let data: any = localStorage.getItem('task') ? localStorage.getItem("task") : [];
    this.Alldata = JSON.parse(data);


  }

  setValue() {
    this.id =this.userForm.value.id=this.Alldata.length+1;
    this.name = this.userForm.get('name')?.value;
    this.designation = this.userForm.get('designation')?.value;
    this.salary = this.userForm.get('salary')?.value; // input value retrieved
    this.saveData("task", this.userForm.value);
    console.log(this.userForm.value)


  }

  deleteemployee(a: any) {
    console.log(a.name)
    let arr: any = [];
    this.Alldata.filter((value: any) => {
      if (value.name !==a.name && value.salary===a.salary ) {
      arr.push(value)
      }
    })
    localStorage.setItem("task", JSON.stringify(arr));
    this.getData();
    console.log(arr)
  }

  showForm(data: any) {
    this.formData = data;
    this.userForm.patchValue({
          id: data.id,
          name: data.name,
          salary: data.salary,
          designation: data.designation

    });
    let arr: any = [];

    this.Alldata.filter((value: any) => {
      if (value.name !== data.name) {
        arr.push(value)
      }
    })
    localStorage.setItem("task", JSON.stringify(arr));
    this.getData();
    console.log(arr)

  }

//   updateUser(testform: any) {

//     let userData: any = {};

//     userData.id = testform.value.id;

//     userData.name = testform.value.name;

//     userData.salary = testform.value.salary;

//     userData.designation = testform.value.designation;
         
//     console.log(testform)
// }

}
