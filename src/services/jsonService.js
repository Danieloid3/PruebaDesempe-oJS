import {API_URLS} from "../utils/constants.js";

export default class JsonService {
    async getProductsIDs() {
        try {
            const products = await this.getProducts()
            const ids = products.map(product => product.id);
            return ids;
        } catch (error) {
            console.error('Product IDs not obtained', error);
            throw new Error('Could not connect to the Products API.');
        }
    }

    async getProductById(productId) {
        try {
            const response = await fetch(`${API_URLS.PRODUCTS}/${productId}`);
            if (!response.ok) {
                throw new Error(`Producto no encontrado (HTTP ${response.status})`);
            }
            const product = await response.json();
            return product;
        } catch (error) {
            console.error(`Product ${productId} not obtained`, error);
            throw new Error('Could not connect to the Products API.');
        }
    }

    async getProducts() {
        try {
            const response = await fetch(`${API_URLS.PRODUCTS}`);
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Products not obtained', error);
            throw new Error('Could not connect to the Products API.');
        }
    }

    async createProduct(product) {
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: window.JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Error HTTP ' + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error('Product not created', error);
            throw new Error('Could not connect to the Products API.');
        }
    }

    async deleteProduct(id) {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error al eliminar producto');
        return true;
    }

    async updateProduct(productId, updates) {
        try {
            const response = await fetch(`${API_URLS.PRODUCTS}/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates),
            });
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Product ${productId} not updated`, error);
            throw new Error('Could not connect to the Products API.');
        }
    }


}