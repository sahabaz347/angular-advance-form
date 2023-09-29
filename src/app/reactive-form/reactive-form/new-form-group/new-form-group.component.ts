import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { JsonFormData } from 'src/app/utils';

@Component({
  selector: 'app-new-form-group',
  templateUrl: './new-form-group.component.html',
  styleUrls: ['./new-form-group.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class NewFormGroupComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  dynamicForm!: FormGroup;

  jsonGroupFormData!: JsonFormData
  parentContainer = inject(ControlContainer);
  @Input() label = '';
  constructor(private apiService: ServiceService, private fb: FormBuilder) { }
  get ParentFormGroup() {
    return this.parentContainer.control as FormGroup
  }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({})
    this.apiService.formDataSubject.subscribe(res => {
      this.jsonGroupFormData = JSON.parse(JSON.stringify(res))
      this.setParentControl(res?.controlsGroup)
    })
  }
  setParentControl(controlsGroup: any) {
    for (const control of controlsGroup) {
      const validator = [];
      if (control.validators.required) {
        validator.push(Validators.required)
      }
      if (control.validators.minLength) {
        validator.push(Validators.minLength(5))
      }
      this.dynamicForm.addControl(control.name, this.fb.control(control.value, validator));
    }

    this.ParentFormGroup.addControl(this.controlKey, this.dynamicForm);
  }
  ngOnDestroy(): void {
    this.ParentFormGroup.removeControl(this.controlKey);
  }
}