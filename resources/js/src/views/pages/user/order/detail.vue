<template>
    <div>
        <h1>Order Detail</h1>
        <div v-if="order">
            <p>Order ID: {{ order.id }}</p>
            <p>Customer Name: {{ order.customer_name }}</p>
            <p>Total Amount: {{ order.total_amount }}</p>
            <button @click="payWithMidtrans">Pay with Midtrans</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            order: null,
        };
    },
    created() {
        this.fetchOrderDetail();
    },
    methods: {
        fetchOrderDetail() {
            // Replace with your API endpoint to fetch order details
            axios.get('/api/order/123')
                .then(response => {
                    this.order = response.data;
                })
                .catch(error => {
                    console.error('Error fetching order details:', error);
                });
        },
        payWithMidtrans() {
            // Replace with your Snap Midtrans client key
            const clientKey = 'YOUR_MIDTRANS_CLIENT_KEY';
            window.snap.pay(clientKey, {
                transaction_details: {
                    order_id: this.order.id,
                    gross_amount: this.order.total_amount,
                },
                onSuccess: function(result) {
                    console.log('Payment success:', result);
                },
                onPending: function(result) {
                    console.log('Payment pending:', result);
                },
                onError: function(result) {
                    console.error('Payment error:', result);
                },
                onClose: function() {
                    console.log('Payment popup closed');
                },
            });
        },
    },
};
</script>

<style scoped>
/* Add your styles here */
</style></div>