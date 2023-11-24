import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GroceriesService } from 'src/app/groceries.service';
import { InputDialogServiceService } from 'src/app/input-dialog-service.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List";
/*   items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Eggs",
      quantity: 1
    },
    {
      name: "Bananas",
      quantity: 6
    },
    {
      name: "Bread",
      quantity: 2
    },
  ]; */
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, private groceriesService:GroceriesService, private inputDialogService: InputDialogServiceService) {}

  loadItems(){
    return this.groceriesService.getItems();
  }

  async removeItem(item: any, index: any) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Item at index  '+ index + ' was removed successfully.',
      duration: 3000
    });
    (await toast).present();
    this.groceriesService.removeItem(index);
    // this.items.splice(index,1);
  }

  async shareItem(item: any, index: any) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item: ' + item.name,
      duration: 3000
    });
    (await toast).present();
    try {
      await Share.share({
        title: 'Sharing Grocery Item',
        text: 'Item: ' + item.name + ", Quantity: " + item.quantity
      });
    } catch (error) {
      console.error('Error sharing item: ', error);
      
    }
    
  }

  async editItem(item: any, index: any) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item '+ index,
      duration: 3000
    });
    (await toast).present();
    this.inputDialogService.showPrompt(item, index);
  }

    async addItem(){
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
/*     async showAddItemPrompt() {
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
    }

    async showEditItemPrompt(item:any, index:any) {
      const prompt = await this.alertCtrl.create({
        header:'Edit Item',
        message: "Please edit the item: ",
        inputs: [
          {
            name: 'name',
            placeholder: 'Name',
            value: item.name
          },
          {
            name: 'quantity',
            placeholder: "Quantity",
            value: item.quantity 
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
              this.groceriesService.editItem(item, index)
              // this.items[index] = item;
            }
          }
        ]
      });
      await prompt.present();
    } */

}

