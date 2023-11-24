import { Injectable } from '@angular/core';
import { GroceriesService } from './groceries.service';
import { AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertCtrl: AlertController, private groceriesService:GroceriesService) { }

 /*  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header:'Add Item',
      message: "Enter an item and quantity: ",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
        },
        {
          name: 'quantity',
          placeholder: "Quantity"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked', data);
          }
        },
        {
          text: 'save',
          handler: item => {
            console.log('Save Clicked', item);
            this.groceriesService.addItem(item)
            // this.items.push(item);
          }
        }
      ]
    });
    await prompt.present();
  } */

  async showPrompt(item?:any, index?: any) {
    const prompt = await this.alertCtrl.create({
      header: item ?'Edit Item': 'Add Item',
      message: item ? "Please edit the item: ": "Please enter the item: ",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: "Quantity",
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked', data);
          }
        },
        {
          text: 'save',
          handler: item => {
            console.log('Save Clicked', item);
            if (index !== undefined) {
              this.groceriesService.editItem(item,index);
            }
            else {
              this.groceriesService.addItem(item);
            }
            /* this.groceriesService.editItem(item, index)
            // this.items[index] = item; */
          }
        }
      ]
    });
    await prompt.present();
  }

}
