<script setup>
  import { useAuth } from '@/shared/useAuth'
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const router = useRouter()
  const route = useRoute()
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

  const goToProfile = () => {
    router.push({ name: 'profile', params: { id: currentUser.value.id } })
  }

  //håller koll på de alternativet i dropwodnen som är aktivt så de går att styla.
  const isActiveDropDownPage = (routeName) => {
    //jämför rutten med ruttnamnet(parametern). Om det är samma så return true. annars fales
    return route.name === routeName
  }

    const isDropdownActive = () => {
    const activeRoutes = ['profile', 'rentalHistory', 'myItems']
    return activeRoutes.includes(route.name)
  }

  const handleLogout = () => {
    logout()
    showDropdown.value = false
  }

  // stänger dropdownen vid klick utanför
  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      showDropdown.value = false;
    }
  };


  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
  <div class="header">
    <div class="container">
      <img
        src="../../assets/images/rentapaloozasign.png"
        alt="Rentapalooza"
        @click="goToHome"
        class="rentaLogo"
      />

      <!-- detta syns alltid -->
      <nav>
        <RouterLink class="nav-link" to="/">HOME</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'items' }"
          >LISTINGS</RouterLink
        >


        <div class="auth-control" v-if="currentUser">
         <div :class="{ dropdown: true, activeDDHead: isDropdownActive() }">
          <p @click="toggleDropdown" class="dropdown-toggle">
            {{ currentUser.username }} ▼
          </p>
          <ul v-if="showDropdown" class="dropdown-menu">
            <li
              @click="goToProfile"
              :class="{ active: isActiveDropDownPage('profileView') }"
            >
              My profile
            </li>

            <li
              @click="goTo('rentalHistory')"
              :class="{ active: isActiveDropDownPage('rentalHistory') }"
            >
              My bookings
            </li>

            <li
              @click="goTo('myItems')"
              :class="{ active: isActiveDropDownPage('myItems') }"
            >
              My items
            </li>
            <hr />

            <li @click="handleLogout">Log out</li>
          </ul>
        </div>
      </div>

      <RouterLink v-if="!currentUser" :to="{ name: 'login' }"
        ><button class="button-secondary">Login</button></RouterLink
      >




      </nav>

      <!-- detta syns för en inloggad -->

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
   .activeDDHead {
    color: yellow;
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
    justify-content: flex-end;
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

  .dropdown-toggle, .dropdown-menu {
    font-family: Poppins;
    font-size: 1rem;
  }

  .dropdown-menu li {
     color: var(--color-text);
    padding: 10px 15px;
    cursor: pointer;
  }

  .dropdown-menu li:hover {
    background-color: var(--color-accent);
  }

  .active {
    background-color: yellow;
  }

  .rentaLogo {
    cursor: pointer;
    position: absolute;
    left: 1rem;
  }

  .container {
    max-width: none;
  }

  @media(max-width: 500px){
    .header .container {
      flex-direction: column;
    }

    .rentaLogo {
      position: unset;
    }
}


</style>
