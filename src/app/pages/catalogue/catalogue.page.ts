import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage {

  get pokemonList(): Pokemon[] {
    return this.catalogueService.pokemonList;
  }

  constructor(private readonly catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.catalogueService.fetchPokemonList();
  }
}
