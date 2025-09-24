import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courses } from '../models/courses';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  apiUrl = "https://ec2-43-204-28-178.projects.wecreateproblems.com/proxy/6000/courses"
  constructor(private http:HttpClient) { }
  addCourse(course:Courses):Observable<any>{
    return this.http.post(this.apiUrl,course);
  }
  getCourses():Observable<any>{
    return this.http.get(this.apiUrl);
  }
  getCourseById(id:any):Observable<any[]>{
    return this.http.get(this.apiUrl+"/"+id).pipe(map((data)=>{
      if(Array.isArray(data)){
        return data;
      }
      else{
        return [data];
      }

    }))
  }
  getCoursesById(id:any):Observable<any>{
    return this.http.get(this.apiUrl+"/"+id);
  }
  updateById(id:any,course:Courses):Observable<any>{
    return this.http.put(this.apiUrl+"/"+id,course);
  }
  deleteCourse(id:any):Observable<any>{
    return this.http.delete(this.apiUrl+"/"+id);
  }
}