<script setup>
  import { useAuth } from '@/shared/useAuth'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  const router = useRouter()
  const { currentUser, logout } = useAuth()

  const goToHome = () => {
    router.push('/')
  }

  const showDropdown = ref(false)

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }

  const goTo = (routeName) => {
    router.push({ name: routeName })
    showDropdown.value = false
  }

  const handleLogout = () => {
    logout()
    showDropdown.value = false
  }
</script>

<template>
  <div class="header">
    <div class="container">
      <img
        src="../../assets/images/rentapaloozasign.png"
        alt="Rentapalooza"
        @click="goToHome"
      />

      <!-- detta syns alltid -->
      <nav>
        <RouterLink class="nav-link" to="/">HOME</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'items' }"
          >LISTINGS</RouterLink
        >
      </nav>

      <!-- detta syns för en inloggad -->
      <div class="auth-control" v-if="currentUser">
        <div class="dropdown">
          <p @click="toggleDropdown" class="dropdown-toggle">
            {{ currentUser.username }} ▼
          </p>
          <ul v-if="showDropdown" class="dropdown-menu">
            <li @click="goTo('profile')">My profile</li>

            <li @click="goTo('rentalHistory')">My bookings</li>

            <li @click="goTo('myItems')">My items</li>
            <li @click="handleLogout">Log out</li>
          </ul>
        </div>
      </div>

      <RouterLink v-if="!currentUser" :to="{ name: 'login' }"
        ><button class="button-secondary">Login</button></RouterLink
      >
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.458);
    z-index: 1;
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
    gap: 2rem;
    font-family: 'Mouse Memoirs', sans-serif;
    font-size: 2rem;
  }

  .nav-link {
    color: white;
    text-decoration: none;
  }

  .nav-link:hover {
    color: var(--color-accent);
  }

  .router-link-active {
    color: rgb(255, 255, 0);
    font-weight: bold;
  }

  .dropdown {
    position: relative;
    z-index: 1;
  }

  .dropdown-toggle {
    cursor: pointer;
    user-select: none;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 150px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .dropdown-menu li {
    padding: 10px 15px;
    cursor: pointer;
  }

  .dropdown-menu li:hover {
    background-color: var(--color-accent);
  }

  .active {
    background-color: yellow;
  }
</style>
