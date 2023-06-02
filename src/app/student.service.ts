import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost:4200"
  constructor(private http: Http) { }

  getStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  save(student: StudentService): Observable<Student>{
  return this.http.post<Student>(this.url, student);
  }

  update(student: StudentService): Observable<Student>{
    return this.http.post<Student>(this.url, student);
  }

  delete(student: StudentService): Observable<void>{
    return this.http.delete<void>(`${this.url}/${student.id}`);
    }
}
