import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  posts : any = [];
  
  constructor(private postService :PostsService) { }

  ngOnInit(): void {
    this.postService.loadPosts().subscribe(res=>{
      this.posts = res;

    })
  }

  deletePost(postID : string, picturePath :string){
    this.postService.DeleteImage(picturePath,postID);
  }

  onFeatured(postID :string,value :boolean){
    const featuredData = {
      isFeatured : value
    }
    this.postService.markFeatured(postID,featuredData);
  }

}
