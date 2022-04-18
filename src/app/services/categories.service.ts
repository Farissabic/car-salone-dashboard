import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs : AngularFirestore) { }

  AddCategory(category : Category){
    this.afs.collection('categories').add(category).then(res=>{
      console.log(res);
    }).catch(error=>{
      console.log(error);
    });
  }

  FechCategory(){
    return this.afs.collection('categories').snapshotChanges().pipe(map(response=>{
      return response.map(res=>{
        const data = res.payload.doc.data();
        const id = res.payload.doc.id;

        return {id ,data};
      })
    }))
  }

  EditCategory(id : string, data :any){

    this.afs.collection('categories').doc(id).update(data).then(res=>{

    })
  }

  DeleteCategory(id:string){
    this.afs.collection('categories').doc(id).delete();
  }
}
