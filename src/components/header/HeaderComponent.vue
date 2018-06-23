<template>
    <div id="header">
        <div class="container">
            <div class="logo">ShopTime</div>
            <div class="menu">
                <router-link active-class="active" to="/">Home</router-link>
                <router-link active-class="active" to="/order">Order</router-link>
                <router-link active-class="active" to="/product">Product</router-link>
            </div>
            <div class="user">Admin</div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
