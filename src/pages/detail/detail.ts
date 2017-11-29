import {Component} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Pizza } from '../../model/pizza';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {

  pizza: Pizza;

  constructor(private navParams: NavParams) {
    this.pizza = this.navParams.data;
  }

}
