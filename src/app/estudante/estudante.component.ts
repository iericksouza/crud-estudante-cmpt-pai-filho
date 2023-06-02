import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit{

  students: Student[] = [];
  student: Student = {} as Student;
  isEditing: boolean n = false;
  constructor(private StudentService: StudentService){
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.StudentService.getStudents().subscribe({
      next: data => this.student = data
    });
  }

  onCleanEvent(){
    this.isEditing = false;
  }

  onSaveEvent(client: Student) {
      if (this.isEditing) {
        this.StudentService.update(student).subscribe(
          {
            next: () => {
              this.loadClients();
              this.isEditing = false;
            }

          }
        );
      }
      else {
        this.StudentService.save(student).subscribe(
          {
            next: data => {
              this.students.push(data)
            }
          }
        );
      }
  }

  edit(student: Student) {
    this.student = student;
    this.isEditing = true;
  }

  delete(student: Student) {
    this.StudentService.delete(student).subscribe(
      {
        next: () => this.loadClients()
      }
    );
  }

}

}
