import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
;

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {

  categories : Array<any> = [];
  formCategory : string = '';
  formStatus : string = 'Add';
  categoryID : string = '';

  constructor(private categoriesService :CategoriesService) { }

  ngOnInit(): void {

    this.categoriesService.FechCategory().subscribe(res=>{
      this.categories = res;
      console.log(this.categories)
    })
  }


  AddCategory(form : NgForm){
    let category : Category ={
      category : form.value.category
    };

    if(this.formStatus === 'Add'){

      this.categoriesService.AddCategory(category);
      form.reset();
    }
    if(this.formStatus === 'Edit') {
      this.categoriesService.EditCategory(this.categoryID,category);
      form.reset();
      this.formStatus = 'Add';
    }
  }



  EditCategory(category : string, id : string){
    this.formCategory = category;
    this.formStatus = 'Edit';

    this.categoryID = id;
  }


  DeleteCategory(id : string){
    this.categoriesService.DeleteCategory(id);
    console.log(id)
  }

}
