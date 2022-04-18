import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private angularFireStorage : AngularFireStorage, 
              private afs :AngularFirestore,
              private router : Router) { }


  uploadIMG(selectetImage :any, postData : Post, postStatus : string,id:string){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.angularFireStorage.upload(filePath,selectetImage).then(()=>{

      this.angularFireStorage.ref(filePath).getDownloadURL().subscribe(res=>{
        postData.picturePath = res;

        if(postStatus == 'Edit'){
          this.UpdatePost(postData,id);
        }else{
          this.savePost(postData);
        }
      })
    })
  }

  savePost(data : any){
    this.afs.collection('Posts').add(data);
    this.router.navigate(['/posts'])
  }


  loadPosts(){
    return this.afs.collection('Posts').snapshotChanges().pipe(map(response=>{
      return response.map(res=>{
        const data = res.payload.doc.data();
        const id = res.payload.doc.id;
        return {id,data};
      })
    }))
  }


  DeletePost(postID:string){
    this.afs.collection('Posts').doc(postID).delete();
  }

  DeleteImage(imagePath : string, postID:string){
    this.angularFireStorage.storage.refFromURL(imagePath).delete().then(()=>{
      this.DeletePost(postID);
    })
  }


  loadOnePost(id:string | any){
    return this.afs.collection('Posts').doc(id).valueChanges();
  }

  UpdatePost(data:any,id:string){
    this.afs.collection('Posts').doc(id).update(data);
    this.router.navigate(['/posts']);
  }


  markFeatured(postID: string ,data :any){
    this.afs.collection('Posts').doc(postID).update(data);
  }

  
}


