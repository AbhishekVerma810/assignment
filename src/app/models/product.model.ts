export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stockQuantity: number;
    createdAt: Date;
}

export enum ProductCategory {
    ELECTRONICS = 'Electronics',
    CLOTHING = 'Clothing',
    BOOKS = 'Books',
    GROCERIES = 'Groceries',
    TOYS = 'Toys',
    OTHER = 'Other'
}
