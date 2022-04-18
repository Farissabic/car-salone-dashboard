export interface Post {
    name: string,
    category: {
        categoryId: string,
        category: string
    },
    value: number ,
    yare: number,
    mileage: number,
    fuel: string,
    power: string,
    doorCount: string,
    gearbox: string,
    color: string,
    emissionClass:string,
    picturePath : string,
    features: string,
    description: string,
    isFeatured : boolean
}
