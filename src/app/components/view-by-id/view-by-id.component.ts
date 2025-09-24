import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.css']
})
export class ViewByIdComponent implements OnInit{
  // course$:any;
  course$:Observable<any[]>=of([]);
  id:any;
  constructor(private service:CourseServiceService,private active:ActivatedRoute){
    this.active.params.subscribe((params)=>{
      this.id = params['id'];
      // this.viewByIds(this.id);
      this.viewById(this.id);
    })
  }
  ngOnInit(): void {

  }
  // viewByIds(id:any){
  //   this.service.getCoursesById(id).subscribe((data)=>{
  //     this.course$ = data;
  //   })
  // }
  viewById(id:any){
    this.course$ = this.service.getCourseById(id);
  }
}
