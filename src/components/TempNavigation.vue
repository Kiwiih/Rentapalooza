<!-- TempNavigation.vue -->

<script setup>
  import { useAuth } from '@/shared/useAuth'

  const { currentUser, logout } = useAuth()
</script>

<template>
  <div class="nav-wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'items' }">Items</RouterLink>
      <RouterLink :to="{ name: 'rentalHistory' }">rentalHistory</RouterLink>
      <RouterLink :to="{ name: 'itemDetails', params: { id: '1' } }"
        >ItemDetails</RouterLink
      >
    </nav>
    <div class="auth-control" v-if="currentUser">
      <p>{{ currentUser.email }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div class="ball"></div>
  </div>
</template>

<style scoped>
  .nav-wrapper {
    position: absolute;
    top: -6.5%;
    width: 100%;
    display: flex;
    opacity: 0.97;
    background-color: var(--color-secondary);
    border-radius: 0 0 5px 5px;
    justify-content: space-around;
    box-shadow: 0 4px 10px black;

    transition: 1s;
  }

  .nav-wrapper:hover {
    top: 0%;
  }

  .ball {
    display: flex;
    font-size: 15px;
    position: absolute;
    top: 90%;
    border-radius: 50%;
    box-shadow: 0 0px 5px 1px black;
    /* border: 1px solid black; */

    width: 1rem;
    height: 1rem;
    background-color: var(--color-secondary);
  }

  nav {
    font-weight: bold;
    display: flex;
    padding: 1rem;
    gap: 1rem;
  }

  .auth-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  p {
    font-weight: bold;
  }
</style>
