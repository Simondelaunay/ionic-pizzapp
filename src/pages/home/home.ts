import { Component,OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { PizzaProvider } from "../../providers/pizza/pizza";
import { DetailPage } from "../detail/detail";
import { FormPage } from "../form/form";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    listPizza: any[] = [];
    pizzaDetailPage: typeof DetailPage;
    FormPage: typeof FormPage;

  constructor(
      public navCtrl: NavController,
      private pizzaProvider: PizzaProvider,
      private navParams: NavParams,) {

      this.pizzaDetailPage = DetailPage;
      this.FormPage = FormPage;

  }

  ngOnInit() {
    this.pizzaProvider.get().subscribe(data => {
      console.log(data);
      this.listPizza = data;
    });
  };

  onDelete(id) {

    var newTable = [];

    this.pizzaProvider.deleteById(id).subscribe(
        () => {
          for (const i in this.listPizza) {
            console.log(this.listPizza);
            console.log(i);
            if (this.listPizza[i]._id !== id) {
              newTable.push(this.listPizza[i]);
            }
          }
          this.listPizza = newTable;
        },
        err => {
          console.log(err);
        }
    );
  }
}
