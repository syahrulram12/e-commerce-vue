<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h1>Shopping Cart</h1>
                    <b-table striped hover :items="cartItems" :fields="fields">
                        <template #cell(actions)="data">
                            <b-button variant="danger" @click="removeItem(data.item)">Remove</b-button>
                        </template>
                    </b-table>
                    <b-row class="mt-3">
                        <b-col>
                            <h4>Total: {{ totalPrice }}</h4>
                        </b-col>
                        <b-col class="text-right">
                            <b-button variant="success" @click="checkout">Checkout</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartItems: [
                { id: 1, name: 'Product 1', price: 10, quantity: 1 },
                { id: 2, name: 'Product 2', price: 20, quantity: 2 },
            ],
            fields: [
                { key: 'name', label: 'Product Name' },
                { key: 'price', label: 'Price' },
                { key: 'quantity', label: 'Quantity' },
                { key: 'actions', label: 'Actions' },
            ],
        };
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        },
    },
    methods: {
        removeItem(item) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        },
        checkout() {
            // Handle checkout logic
            alert('Proceeding to checkout');
        },
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>