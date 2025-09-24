import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  formG!:FormGroup;
  isEdit:boolean=false;
  updatedId:any;
  status=['Active','In active'];
  constructor(private fb:FormBuilder,private service:CourseServiceService,private active:ActivatedRoute,private route:Router){
    this.active.params.subscribe((params)=>{
      this.updatedId = params['id'];
      this.patch(this.updatedId);
    })
  }
  ngOnInit(): void {
    this.formG = this.fb.group({
      courseName:['',[Validators.required,this.unique]],
      enrollmentCount:['',[Validators.required,this.positive]],
      publishDate:['',[Validators.required,this.date]],
      status:['',[Validators.required]],
      dateOfBirth:['',[Validators.required,this.date]],
      startDate:['',[Validators.required,this.date]],
      endDate:['',[Validators.required,this.date]],
      phone:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      seatNumber:['',[Validators.required,this.seatValidator]],
    },{validators:this.rangeValidator});
  }
  patch(id:any){
    this.service.getCourseById(id).subscribe((data)=>{
      var da= data[0];
      this.formG.patchValue({
        id:da.id,
        courseName:da.courseName,
        enrollmentCount:da.enrollmentCount,
        publishDate:da.publishDate,
        status:da.status,
        dateOfBirth:da.dateOfBirth,
        startDate:da.startDate,
        endDate:da.endDate,
        phone:da.phone,
        email:da.email,
        seatNumber:da.seatNumber
      })
    })
  }
  unique(cont:AbstractControl):ValidationErrors | null{
    const user = cont.value;
    const value = JSON.parse(localStorage.getItem('Courses') || '{}');
    if(Array.isArray(value)){
      const users = value.map((d:any)=>d.courseName);
      if(users.includes(user)){
        return {notUnique:true};
      }
    }
    return null;
  }
  positive(cont:AbstractControl):ValidationErrors | null{
    const value = cont.value;
    if(value !=='' && value!==null && value>0){
      return null;
    }
    return {notPositive:true};
  }
  date(cont:AbstractControl):ValidationErrors | null {
    const value = cont.value;
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if(value && !pattern.test(value)){
      return {invalidDate:true};
    }
    return null;
  }
  rangeValidator(group:FormGroup):ValidationErrors | null{
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if(start && end){
      const start1 = new Date(start);
      const end1 = new Date(end);
      if(end1 < start1){
        return {invalidRange:true};
      }
    }
    return null;
  }
  seatValidator(cont:AbstractControl):ValidationErrors | null{
    const value = cont.value;
    if(value && !/^[AB].*/.test(value)){
      return {invalidSeat : true};
    }
    return null;
  }
  onChange(e:any){
    if(e.target.value == 'update'){
      this.isEdit = true;
    }
    else{
      this.isEdit = false;
    }
  }
  onSubmit(){
    if(this.formG.valid){
      if(this.updatedId){
        this.service.updateById(this.updatedId,this.formG.value).subscribe(()=>{
          this.route.navigate(['/view']);
        })
      }
      else{
        this.service.addCourse(this.formG.value).subscribe(()=>{
          this.route.navigate(['/view']);
        })
      }
    }
  }
}

