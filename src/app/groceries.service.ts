import { Injectable } from "@angular/core";

interface GroceryItem {
  name: string;
  quantity:number;
}

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  
  items: GroceryItem[]=[];

  constructor() { }

getItems(){
  return this.items;
}

removeItem(index: any){
    this.items.splice(index,1);
  }

addItem(item:any){
  this.items.push(item);
}

editItem(item: any, index:any){
  this.items[index] = item;
  }

}