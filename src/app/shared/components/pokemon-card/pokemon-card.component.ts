import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  /**Nombre e imagen delantera del pokemon */
  @Input() pokemonId? : number|null = null;
  @Input() name? : string = '';
  @Input() spriteFront? : string = '';

  // @Input() spriteBack: string = '';
  //puede que con un hover la imagen de back del sprite
}
