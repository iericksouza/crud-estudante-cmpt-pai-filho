import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnChanges{

  @Input()
  client: Student = {} as Student;

  @Output()
  saveEvent = new EventEmitter<Student>();
  @Output()
  cleanEvent = new EventEmitter<void>();

  formGroupClient: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {

    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupClient.setValue(this.client);
  }

  save() {
      this.submitted = true;
      if(this.formGroupClient.valid){
        this.saveEvent.emit(this.formGroupClient.value);
        this.formGroupClient.reset();
        this.submitted = false;
      }
  }

  clean() {
    this.cleanEvent.emit();
    this.formGroupClient.reset();
    this.submitted = false;
  }


  get name() : any {
    return this.formGroupClient.get("name");
  }

  get email() : any {
    return this.formGroupClient.get("email");
  }

  get phone() : any {
    return this.formGroupClient.get("phone");
  }



}
