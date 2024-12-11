<script setup>
  import { useAuth } from '@/shared/useAuth'

  const { currentUser, logout } = useAuth()
</script>

<template>
  <div class="header">
    <div class="container">
      <!-- <h1 class="logo">Rentapalooza</h1> -->
      <img src="../../assets/images/rentapaloozasign.png" alt="Rentapalooza" />
      <nav v-if="currentUser">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'items' }"
          >Items For Rent</RouterLink
        >
        <RouterLink
          class="nav-link"
          :to="{ name: 'itemDetails', params: { id: '1' } }"
          >ItemDetails
        </RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'rentalHistory' }"
          >My Bookings</RouterLink
        >
        <RouterLink class="nav-link" :to="{ name: 'myItems' }"
          >My Items</RouterLink
        >
      </nav>
      <div class="auth-control" v-if="currentUser">
        <p>{{ currentUser.username }}</p>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .auth-control {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: black;
  }

  img {
    max-width: 15em;
  }

  .header {
    background-color: var(--color-primary);
    color: white;
    padding: 1rem 0;
  }

  .header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    color: white;
    text-decoration: none;
  }

  .nav-link:hover {
    color: lightgray;
  }

  .router-link-active {
    color: yellow;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
