import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getproducts(){
    return this.http.get('https://fakestoreapi.com/products');
  }
  getproductsbyid(id:number){
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }
  getcategories(){
    return this.http.get('https://fakestoreapi.com/products/categories');
  }
}
