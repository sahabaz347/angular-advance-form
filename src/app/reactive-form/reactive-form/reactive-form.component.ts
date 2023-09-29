import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Control, JsonFormData } from 'src/app/utils';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  jsonFormData!: JsonFormData;
  dynamicForm!: FormGroup;
  selectedValue!: string;

  constructor(private apiService: ServiceService, private fb: FormBuilder) {

  }
  ngOnInit() {

    this.dynamicForm = this.fb.group({})
    this.apiService.getJsonData()
    this.apiService.formDataSubject.subscribe((res: any) => {
      this.jsonFormData = JSON.parse(JSON.stringify(res))
      this.setDynamicForm(JSON.parse(JSON.stringify(res.controls)))
    });
  }
  getDynamicForm() {

  }
  setDynamicForm(controls: Control[]) {
    console.log(controls)
    for (const control of controls) {
      const validator = [];
      if (control.validators.required) {
        validator.push(Validators.required)
      }
      if (control.validators.minLength) {
        validator.push(Validators.minLength(5))
      }
      this.dynamicForm.addControl(control.name, this.fb.control(control.value, validator))
    }
  }
  onSubmit() {
    console.log(this.dynamicForm);
  }
}
