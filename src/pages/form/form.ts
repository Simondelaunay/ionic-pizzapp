import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {PizzaProvider} from "../../providers/pizza/pizza";
import {Pizza} from "../../model/pizza";
import {HomePage} from "../home/home";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage{

  pizza: Pizza;
  form: FormGroup;
  base64textString: string;
  title_form: string;


  ingredients = [{
    name: '',
    weight: '',
    price: 0
  }];

  editMode: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pizzaProvider: PizzaProvider) {

    this.editMode = this.navParams.data.update ? this.navParams.data.update : false;
    if (this.editMode) {
      this.pizza = this.navParams.data.pizza;
    } else {
      this.resetForm();
    }

  }

  resetForm(){
    this.pizza = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      ingredients: []
    };
  }

  ionViewDidLoad() {
    // SI ON AJOUTE
    if (!this.editMode){
      this.title_form = 'Ajouter';
    } else {
      this.title_form = 'Modifier';
    }

    this.base64textString = this.pizza.image;
    // On initialise le renam
    this.form = new FormGroup({
      img: new FormControl(this.base64textString),
      name: new FormControl(this.pizza.name, Validators.required),
      description: new FormControl(this.pizza.description, Validators.required),
      price: new FormControl(this.pizza.price, Validators.required)
    });

  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.form.patchValue({
      image: this.base64textString
    });
    console.log(btoa(binaryString));
  }


  onSubmit() {
    // SI ON AJOUTE
    if (!this.editMode) {
      this.form.value.img = this.base64textString;
      this.pizzaProvider.create(this.form.value).subscribe(
          () => {
            this.navCtrl.setRoot(HomePage);
          },
          () => console.error(`Pizza non conforme.`),

      );
    } else {
      // SI ON UPDATE
      console.log(this.pizza._id);
      this.pizzaProvider.update(this.pizza._id, this.form.value).subscribe(
          (pizza) => {
            this.navCtrl.setRoot(FormPage);
          },
          () => console.log(`Un problème est survenu lors de a mise à jour de la pizza.`, 'Oups !'),
      );
    }

  }


}

