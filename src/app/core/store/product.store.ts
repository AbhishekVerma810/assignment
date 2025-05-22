import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product, ProductCategory } from '../../models/product.model';
import { computed, effect, inject } from '@angular/core';


export interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}
const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
};
export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        totalProducts: computed(() => products().length),
        totalValue: computed(() => products().reduce((total, product) => total + (product.price * product.stockQuantity), 0)),
        productsByCategory: computed(() => {
            const categories = Object.values(ProductCategory);
            return categories.map(category => ({
                category,
                count: products().filter(product => product.category === category).length
            }));
        }),
        stockLevels: computed(() => products().map(product => ({
            name: product.name,
            stockQuantity: product.stockQuantity
        }))),
        productTrends: computed(() => {
            const groupedByMonth: Record<string, number> = {};
            products().forEach(product => {
                const month = new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short' });
                if (!groupedByMonth[month]) {
                    groupedByMonth[month] = 0;
                }
                groupedByMonth[month]++;
            });
            return Object.entries(groupedByMonth).map(([month, count]) => ({ month, count }));
        })
    })),
    withMethods((store) => {
        const debugEffect = effect(() => {
            console.log('Products updated:', store.products());
            console.log('Selected product:', store.selectedProduct());
        });
        return {
            addProduct(product: Omit<Product, 'id' | 'createdAt'>) {
                const newProduct: Product = {
                    ...product,
                    id: Date.now().toString(),
                    createdAt: new Date()
                };
                console.log('Adding product:', newProduct);
                patchState(store, (state) => ({
                    products: [...state.products, newProduct]
                }));
            },
            updateProduct(updatedProduct: Product) {
                console.log('Updating product:', updatedProduct);
                patchState(store, (state) => ({
                    products: state.products.map(p =>
                        p.id === updatedProduct.id ? updatedProduct : p
                    )
                }));
            },
            deleteProduct(productId: string) {
                console.log('Deleting product:', productId);
                patchState(store, (state) => ({
                    products: state.products.filter(p => p.id !== productId),
                    selectedProduct: state.selectedProduct?.id === productId ? null : state.selectedProduct
                }));
            },
            selectProduct(productId: string) {
                console.log('Selecting product with ID:', productId);
                const selectedProduct = store.products().find(p => p.id === productId) || null;
                console.log('Found product:', selectedProduct);
                patchState(store, { selectedProduct });
            },
            clearSelectedProduct() {
                console.log('Clearing selected product');
                patchState(store, { selectedProduct: null });
            },
            setLoading(loading: boolean) {
                patchState(store, { loading });
            },
            setError(error: string | null) {
                patchState(store, { error });
            },
            initializeWithSampleData() {
                const sampleProducts: Product[] = [
                    {
                        id: '1',
                        name: 'Laptop',
                        category: ProductCategory.ELECTRONICS,
                        price: 999.99,
                        stockQuantity: 15,
                        createdAt: new Date(2025, 0, 15)
                    },
                    {
                        id: '2',
                        name: 'T-shirt',
                        category: ProductCategory.CLOTHING,
                        price: 19.99,
                        stockQuantity: 100,
                        createdAt: new Date(2025, 1, 10)
                    },
                    {
                        id: '3',
                        name: 'JavaScript Book',
                        category: ProductCategory.BOOKS,
                        price: 39.99,
                        stockQuantity: 30,
                        createdAt: new Date(2025, 2, 5)
                    },
                    {
                        id: '4',
                        name: 'Coffee Beans',
                        category: ProductCategory.GROCERIES,
                        price: 12.99,
                        stockQuantity: 50,
                        createdAt: new Date(2025, 3, 20)
                    },
                    {
                        id: '5',
                        name: 'Action Figure',
                        category: ProductCategory.TOYS,
                        price: 24.99,
                        stockQuantity: 25,
                        createdAt: new Date(2025, 4, 1)
                    }
                ];
                console.log('Initialize', sampleProducts);
                patchState(store, { products: sampleProducts });
            }
        };
    })
);

export type ProductsStoreType = typeof ProductsStore;