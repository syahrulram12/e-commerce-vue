<template>
    <div class="payment-success">
        <h1>Payment Successful</h1>
        <p>Thank you for your purchase! Your order has been successfully processed.</p>
        <router-link to="/orders">View your orders</router-link>
    </div>
</template>

<script>
export default {
    name: 'PaymentSuccess'
}
</script>

<style scoped>
.payment-success {
    text-align: center;
    margin-top: 50px;
}

.payment-success h1 {
    color: green;
}

.payment-success p {
    font-size: 18px;
    margin: 20px 0;
}
</style>