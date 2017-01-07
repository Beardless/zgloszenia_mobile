import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ImageProvider {
  private images: Array<Object>=[];
  constructor(
    public sanitizer: DomSanitizer
  ){}

  public getImages()
  {
      return this.images;
  }

  public remove(key)
  {
    this.images.splice(key, 1);
  }

  public add(image){
    if (image.substring(0,21)=="content://com.android") {
      let photo_split = image.split("%3A");
      image="content://media/external/images/media/"+photo_split[1];
    }

    this.images[this.images.length] = {
      "source": this.sanitizer.bypassSecurityTrustUrl(image),
      "contentType": "image/jpeg"
    };
    console.log(image);
  }
}
