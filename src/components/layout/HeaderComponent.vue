<script setup>
  import { useAuth } from '@/shared/useAuth'
  import { useRouter } from 'vue-router';
  import {ref} from 'vue'

  const router = useRouter();
  const { currentUser, logout } = useAuth()

  const goToHome = () => {
    router.push("/");
  }

  const showDropdown = ref(false);

  const toggleDropdown = () => {
    showDropdown.value =!showDropdown.value;
  };


  const goTo = (routeName) => {
    router.push({name: routeName})
    showDropdown.value = false;
  }

  const handleLogout = () =>{
    logout();
    showDropdown.value = false;
  }


</script>

<template>
  <div class="header">
    <div class="container">
      <!-- <h1 class="logo">Rentapalooza</h1> -->
      <img src="../../assets/images/rentapaloozasign.png" alt="Rentapalooza" @click="goToHome" />
      <nav v-if="currentUser">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'items' }"
          >Items For Rent</RouterLink
        >
      </nav>
      <div class="auth-control" v-if="currentUser">
        <div class="dropdown">
        <p @click="toggleDropdown" class="dropdown-toggle">
          {{ currentUser.username }} ▼
        </p>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li @click="goTo('profile')">My profile</li>
          <li @click="goTo('rentalHistory')">My rentals</li>
          <li @click="goTo('myItems')">My items</li>
          <li @click="handleLogout">Log out</li>
        </ul>
        </div>
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
  background-color: #f0f0f0;
}
</style>