<script setup lang="ts">
import Footer from '@/components/front/Footer.vue'
import Navbar from '@/components/front/Navbar.vue'
</script>

<template>
  <div class="container">
    <Navbar />
  </div>
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped></style>
