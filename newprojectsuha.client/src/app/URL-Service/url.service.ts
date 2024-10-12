import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://localhost:7286/api/"

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.email.asObservable();


  GetGymAndClassItems(type:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetClassOrGym/${type}`)
  }


  GetAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/AllProducts`);
  }


  GetAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Categories/AllCategories`);
  }
  GetProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Categories/ProductsByCategoryId2/${categoryId}`);
  }


  GetGymAndClassItemDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetItemsDetails/${id}`)
  }

  GetGymAndClassItemAvailableTime(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetAvailableTime/${id}`)
  }



  GetSubscriptions(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/GetSubscription/${id}`)
  }


 



  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}User/Register`, data)
}
  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/LOGIN`, data)
  }


  getTips(): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Nutirition/Tips`)
  }


  GetProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/Product/${id}`)
  }



  GetLast3ProductsByCategory(categoryId: any) {
    return this.http.get<any[]>(`${this.baseUrl}Products/GetLast3ProductsByCategory/${categoryId}`);
  }


  addCartItem(userId: number, cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/addCartItems/${userId}`, cartItem);
  }

}



 



