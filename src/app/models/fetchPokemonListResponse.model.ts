import { Pokemon } from "./pokemon.model";

export interface FetchPokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[]
}