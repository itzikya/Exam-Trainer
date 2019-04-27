import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { RequestOptions } from "@angular/http";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(upload: File) {
    //let fileList: FileList = event.target.files;
    //if(fileList.length > 0) {
      //let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('uploadFile', upload, upload.name);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      /*
      let options = new RequestOptions({ headers: headers });
      this.http.post("http://localhost:3000/api/posts", formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
          data => console.log('success'),
          error => console.log(error)
      )*/
  }
    /*
    //const file: File;
    //console.log(upload);
    let formData = new FormData();
    formData.append('upload', upload);

    this.http
      .post<string>("http://localhost:3000/api/posts", formData)
      .subscribe(() => console.log("Hi!!!"));*/
  }
/*
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
*/
