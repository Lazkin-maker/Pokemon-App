import { Pokemon } from "./pokemon.model";

export interface trainer {
    id: number;
    name: string;
    collected: Pokemon[]
}