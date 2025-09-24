import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Courses } from 'src/app/models/courses';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  cont$:Observable<any[]>=of([]);
  final$:Observable<any[]>=of([]);
  delid:any;
  constructor(private service:CourseServiceService,private active:ActivatedRoute,private route:Router){
    this.active.params.subscribe((params)=>{
      this.delid = params['id'];
      this.deleteById(this.delid);
    })
  }
  ngOnInit(): void {
    this.cont$ = this.service.getCourses();
    this.final$ = this.cont$.pipe(map((d)=>d.sort((a:Courses,b:Courses)=>a.courseName.localeCompare(b.courseName))));
    // this.final$.pipe(toArray());
    // let arr;
    // this.final$.subscribe((d)=>{
    //   arr = d;
    //   if(arr){
    //     const data = JSON.stringify(arr);
    //     localStorage.setItem("Courses",data);
    //   }
    // });

  }
  searchValue(e:any){
    const value = e.target.value;
    if(!value){
      this.final$ = this.cont$;
      return
    }
    this.final$ = this.cont$.pipe(map((d)=>{
      return d.filter((data)=>data.id.toString().toLowerCase().includes(value.toLowerCase()) || data.courseName.toString().toLowerCase().includes(value.toLowerCase()))
    }))
  }
  deleteById(id:any){
    this.service.deleteCourse(id).subscribe(()=>{
      this.route.navigate(['/view']);
    })
  }

}
