import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { CategoriesService } from '../services/categories.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  imgSrc : string | any | null= './assets/placeholder.png';
  selectedImages : any[] = [] ;
  selectedImage :any;
  categories : Array<any> = [];

  postForm: FormGroup =this.fb.group([]);
  post:any;
  formStatus : string = 'Add';
  postID :string = '';

  constructor(private categoriesService : CategoriesService, 
              private fb : FormBuilder,
              private postService : PostsService,
              private ActivatedRout : ActivatedRoute) {

    this.ActivatedRout.queryParams.subscribe(res=>{
      this.postID = res['id'];

      if(this.postID){

        this.postService.loadOnePost(res['id']).subscribe(res=>{
        
          this.post = res;
          console.log(this.post)
  
          this.postForm = this.fb.group({
            name: [this.post.name, [Validators.required, Validators.minLength(5)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, [Validators.required]],
            value: [this.post.value, [Validators.required]],
            yare: [this.post.yare, [Validators.required, Validators.minLength(4)]],
            mileage: [this.post.mileage, [Validators.required]],
            fuel: [this.post.fuel, [Validators.required]],
            power: [this.post.power, [Validators.required]],
            doorCount: [this.post.doorCount, [Validators.required]],
            gearbox: [this.post.gearbox, [Validators.required]],
            color: [this.post.color, [Validators.required]],
            emissionClass: [this.post.emissionClass, [Validators.required]],
            picture: [this.post.picturePath, [Validators.required]],
            features: [this.post.features, Validators.required],
            description: [this.post.description, Validators.required]
          })
  
          this.imgSrc = this.post.picturePath;
          this.formStatus='Edit';
        })

      }
      this.postForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        category: ['', [Validators.required]],
        value: ['', [Validators.required]],
        yare: ['', [Validators.required, Validators.minLength(4)]],
        mileage: ['', [Validators.required]],
        fuel: ['', [Validators.required]],
        power: ['', [Validators.required]],
        doorCount: ['', [Validators.required]],
        gearbox: ['', [Validators.required]],
        color: ['', [Validators.required]],
        emissionClass: ['', [Validators.required]],
        picture: ['', [Validators.required]],
        features: ['', [Validators.required]],
        description: ['', [Validators.required]]
      })
     
    })


    



  }

  ngOnInit(): void {
    this.categoriesService.FechCategory().subscribe(res=>{
      this.categories = res;
      console.log(this.categories);
    })
  }

  get fc(){
    return this.postForm.controls;
  }


  showPicture($event : any){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event.target.files[0];
    console.log(this.selectedImage);
  }




  onSubmit(){

   let splited = this.postForm.value.category.split('-');


    const postData : Post ={
      name: this.postForm.value.name,
      category: {
          categoryId: splited[0],
          category:  splited[1]
      },
      value: this.postForm.value.value ,
      yare: this.postForm.value.yare,
      mileage: this.postForm.value.mileage ,
      fuel: this.postForm.value.fuel ,
      power:  this.postForm.value.power,
      doorCount:  this.postForm.value.doorCount,
      gearbox:  this.postForm.value.gearbox,
      color:  this.postForm.value.color,
      emissionClass: this.postForm.value.emissionClass,
      picturePath : '',
      features:  this.postForm.value.features ,
      description:  this.postForm.value.description,
      isFeatured: false
    }
    console.log(postData);

    this.postService.uploadIMG(this.selectedImage,postData,this.formStatus,this.postID);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder.png';
  }

}
