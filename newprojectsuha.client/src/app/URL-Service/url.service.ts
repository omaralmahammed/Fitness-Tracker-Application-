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

  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();


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
  } //

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}User/Register`, data)
}
  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/LOGIN`, data)
  }

  getTips(): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Nutirition/Tips`)
  }


  getCategorieRecipe(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Nutirition/RecipesCategory`);
  }
  
  getRecipesByCategory(categoryId: number): Observable<any[]> {
    const url = `https://localhost:7286/api/Nutirition/Recipes/${categoryId}`; 
    return this.http.get<any[]>(url);
  }



  getRecipeDetails(id: number): Observable<any> {
    const url = `https://localhost:7286/api/Nutirition/Recipesdetels/${id}`; 
    return this.http.get<any>(url); 
  }


  getallRecipes(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7286/api/Nutirition/showallrecipe');
  }


  addRecipe(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7286/api/Nutirition/recipepost', data);
  }

  PUTRecipe(id: any, data: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7286/api/Nutirition/recipeput/${id}`, data);
  }
  deleteRecipe(id: any): Observable<any> {
    return this.http.delete<any>(`https://localhost:7286/api/Nutirition/Delete/${id}`)
    this.getallRecipes();
  }


  getallTips(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7286/api/Nutirition/Tips');
  }
  deleteTip(id: any): Observable<any> {
    return this.http.delete<any>(`https://localhost:7286/api/Nutirition/DeleteTips/${id}`)
    this.getallTips();
  }
  addTips(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7286/api/Nutirition/TipsPost', data);
  }
  //////////////////
  addProdect(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7286/api/Products/AddProduct', data);
  }

  PUTProddect(id: any, data: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7286/api/Products/UpdateProduct/${id}`, data);
  }

  deletProdects(id: any): Observable<any> {
    return this.http.delete<any>(`https://localhost:7286/api/Products/Delete/${id}`)
    this.GetAllProducts();
  }
 



  GetProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/Product/${id}`)
  }

  GetRandom3ProductsByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Products/GetRandom3ProductsByCategory/${id}`)
  }

  GetLast3ProductsByCategory(categoryId: any) {
    return this.http.get<any[]>(`${this.baseUrl}Products/GetLast3ProductsByCategory/${categoryId}`);
  }


 


  addCartItem(userId: number, cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/addCartItems/${userId}`, cartItem);
  }

  submitContact(contactData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Contact`, contactData);
  }





  addSubscribtionToEnrolled(data:any): Observable<any> {
    
    return this.http.post<any>(`https://localhost:7286/api/Pyment/checkoutForSubscription`, data)
  }

  getTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Testimonials`);

  }
  addTestimonial(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Testimonials`, formData)
  }

  


  getCartItems(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getCartItems/${id}`)
  }

  getCartTotal(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getCartTotal/${id}`)
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Cart/deleteCartItem/${cartItemId}`)
  }

  changeCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Cart/changeCartItemQuantity/${cartItemId}`, quantity)
  }

  moveFromCartToOrder(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/moveFromCartToOrder/${userId}`, null)
  }

  getUserInfoForOrder(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}CheckOut/getUserInfoForOrder/${userId}`)
  }

  getCartDetailsForCheckout(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}CheckOut/getCartDetailsForCheckout/${userId}`)
  }
  //Admin :


  // Get all ClassAndGyms
  GetClassAndGyms(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/ClassAndGyms`);
  }


  // Get ClassAndGym details by id
  GetClassAndGym(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/ClassAndGyms/${id}`);
  }

  // Create a new ClassAndGym
  CreateClassAndGym(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}GymAndClassAdmin/ClassAndGyms`, data);
  }

  // Update ClassAndGym by id
  UpdateClassAndGym(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}GymAndClassAdmin/ClassAndGyms/${id}`, data);
  }


  // Delete ClassAndGym by id
  DeleteClassAndGym(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}GymAndClassAdmin/ClassAndGyms/${id}`);
  }

  // Subscription CRUD methods

  GetAllSubscriptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/Subscriptions`)
  } 

  // Create a new subscription
  CreateSubscription(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}GymAndClassAdmin/Subscriptions`, data);
  }

  // Update subscription by id
  UpdateSubscription(id: number, data: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7286/api/GymAndClassAdmin/Subscriptions/${id}`, data);
  }

  // Delete subscription by id
  DeleteSubscription(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}GymAndClassAdmin/Subscriptions/${id}`);
  }

  // AvailableTimes CRUD methods

  // Get all available times
  GetAvailableTimes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/AvailableTimes`);
  }

  // Get available time by id
  GetAvailableTime(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/AvailableTimes/${id}`);
  }

  // Create a new available time
  CreateAvailableTime(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}GymAndClassAdmin/AvailableTimes`, data);
  }

  // Update available time by id
  UpdateAvailableTime(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}GymAndClassAdmin/AvailableTimes/${id}`, data);
  }

  // Delete available time by id
  DeleteAvailableTime(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}GymAndClassAdmin/AvailableTimes/${id}`);
  }



  BSCArtList: any = []
  BSCArtListSub = new BehaviorSubject<any>(this.BSCArtList)
  BSCArtListObs = this.BSCArtListSub.asObservable()
  

  BSAddToCart(data: any) {
    /*debugger*/
    var record = this.BSCArtList.find((x: any) => x.productId == data.productId)

    if (record) {
      record.quantity += data.quantity
      console.log(record)
      //console.log(this.BSCArtList)

      //alert("product already exist in the cart")
    }
    else {
      this.BSCArtList.push(data);
      this.BSCArtListSub.next(this.BSCArtList)
      //console.log(this.BSCArtList)
    }

  }

  logoutFunc() {
    this.BSCArtList = [];
    this.BSCArtListSub.next(this.BSCArtList)

    // Clear the email and user ID by emitting an empty string
    this.email.next("");
    this.UserId.next("");

    localStorage.clear();

  }

  getProductInfoForCart(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cart/getProductInfoForCart/${productId}`)
  }

  BSCArtTotal(data: any): number {
    let total: any = 0;
    data.forEach((item: any) => {
      total += item.quantity * item.price
    })
    console.log(total)
    return total
  }

  // Get all contacts
  getContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}Contact/contact`);
  }


  // Get a single contact by ID
  getContactById(contactId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ContactStatus?contactId=${contactId}`);
  }


  GetAllusers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}User/GetAllUsers`);
  }

  //GetAllFitness(): Observable<any> {
  //  return this.http.get<any>(${ this.staticData }/ Admin / GetAllFitnessClass);
  //}

  //updateContactStatus(id: number): Observable<any> {
  //  return this.http.put(`${this.baseUrl}Contact/UpdateContactStatus/${id}`, {});
  //}


  updateContactStatus(id: number ){ 
    return this.http.put(`${this.baseUrl}Contact/UpdateContactStatus/${id}`, {});
  }


  // Update product by id
  EditProduct(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Products/UpdateProduct/${id}`, data);
  }

  BSCartItemDelete(productId: number) {

    const index = this.BSCArtList.findIndex((x: any) => x.productId === productId);

    if (index !== -1) {
      this.BSCArtList.splice(index, 1); // Remove the item using splice
      this.BSCArtListSub.next([...this.BSCArtList]); // Update the BehaviorSubject with a new array
    } else {
      alert("No product was found");
    }

  }
  //=======================================
  //profile admin cycle
  getAllOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Order/${userId}`);
  }

  BSCartItemQuantity(productId: number, quantity: number) {
    var product = this.BSCArtList.find((a: any) => a.productId == productId);

    if (product) {
      product.quantity = quantity;

      // stop negative quantities
      if (product.quantity <= 0) {
        product.quantity = 1;
      }

      this.BSCArtListSub.next([...this.BSCArtList]);
    }
  }


  //get all orders


  getAllOrders(): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Order/GetAllOrdersAdmin`);

  }

  // Get order items by OrderId
  getOrderItems(orderId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Order/getOrderItem/${orderId}`);
  }

  //home page get last 3 products

 
  GetLast3Products(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}Products/GetLast3Products`)
  }
  AdminTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Testimonials/getAllTestimonialInAdmin`);

  }

  moveFromBStoDB(userId: number, BSList: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Cart/moveFromBStoDB/${userId}`, BSList)
  }




  updateTestimonialStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}Testimonials/updateTestimonialStatus/${id}`, { status: status });
  }




  // Delete Product by id
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Products/Delete/${id}`);
  }
  
  // Delete Category by id
  DeleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Categories/${id}`);
  }

  //AddCategory
  AddCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Categories/AddCategory`, data)
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7286/api/Profile/GetUserProfile/${id}`)
  }

  changeUserInfo(id: number, data:any): Observable<any> {
    return this.http.put<any>(`https://localhost:7286/api/Profile/EditUserProfile/${id}`, data)
  }
  //AddProduct
  AddProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Products/AddProduct`, data)
  }

  GetSubscriptionsByClassId(classId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClassAdmin/SubscriptionsByClassId/${classId}`);
  }

  UpdateProduct(id: any, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Products/UpdateProduct/${id}`, product)
  }
  // Update category method
  UpdateCategory(id: any, category: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Categories/${id}`, category);
  }


  // Get Category by ID
  GetCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Categories/GetCategoryById/${id}`);
  }

  CartCheckOut(id: number): Observable<any> {
    return this.http.post<any>(`https://localhost:7286/api/CartPayment/checkoutForSubscription/${id}`, {});
  }


  //////get user subscription//////
  getUserSubscriptions(userId: number, flag: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GymAndClass/getUserSubscriptions/${userId}?flag=${flag}`)
  }



  getAdminCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Categories/AllCategories`)
  }

  putAdminCategory(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Categories/${id}`, data)
  }

  AddAdminCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Categories/AddCategory`, data)
  }

  SearchProductsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Products/SearchByName?name=${name}`);
  }
  
}



 



