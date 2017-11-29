import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

/*import * as io from 'socket.io-client' */

import { Pizza } from '../../model/pizza';
/*
  Generated class for the PizzaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PizzaProvider {

  constructor(public http: HttpClient) {
  }

  private readonly url = 'https://pizza-delaunay1-cloned-simsimz.c9users.io/pizzas';

  //Retourne la liste de toutes les pizzas
  get(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.url);
  }

  //Detail d'une pizza
  getById(id): Observable<Pizza> {
    if(id) {
      return this.http.get<Pizza>(this.url + '/' + id);
    }else {
      return Observable.of(new Pizza());
    }
  }
  //Creer une pizza
  create(pizza: Pizza): Observable<any> {
    if (pizza._id) {
      return this.http.put(this.url + '/' + pizza._id, pizza);
    }
    else {
      return this.http.post(this.url, pizza);
    }
  }
//Modifier une pizza
  update(id, pizza: Pizza): Observable<any> {
    return this.http.put(this.url + '/' + id, pizza);
  }

  //Supprimer une Pizza
  deleteById(pizzaId: string): Observable<any> {
    return this.http.delete(this.url + '/' + pizzaId);
  }

}
