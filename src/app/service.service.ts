import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonFormData } from './utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   formDataSubject = new BehaviorSubject<JsonFormData | null>({
    "controls": [],
    "controlsGroup":[]
});

  constructor(private http: HttpClient) { }
  getJsonData() {
     this.http.get<JsonFormData>('assets/form.json').subscribe((formData: JsonFormData) => {
       this.formDataSubject.next(formData)
    })
  }
  
}
