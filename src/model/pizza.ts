/**
 * Pizza Model.
 */

import {Ingredient} from "./ingredient";

export class Pizza {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    ingredients: Array<Ingredient>;
}