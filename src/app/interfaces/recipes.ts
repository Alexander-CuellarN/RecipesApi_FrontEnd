export interface Recipes {
    idreceta: number,
    idusuario: number,
    nombre: string,
    descripcion: string,
    tiempoPreparacion: number,
    nombreUsuario?: string,
    pasos?: Pasos[],
    ingrediente?: Ingredientes[]
}

export interface RecipesCreate {
    idusuario: number,
    nombre: string,
    Descripcion: string,
    tiempoPreparacion: number,
    idreceta?:number
}

export interface Ingredientes {
    idingrediente?: number,
    idreceta?: number,
    nombre: string,
    cantidad: number
}

export interface Pasos {
    idpaso?: number,
    idreceta?: number,
    descripcion: string,
    orden: number
}

export interface recetaDto {
    recetaDto: RecipesCreate,
    ingredientesDto: Ingredientes[],
    preparacionDto: Pasos[]
}

export interface recetasResponse {
    message: string,
    data: Recipes[]
}

export interface recetasListResponse{
    message: string,
    data: Recipes[]
}