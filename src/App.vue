<script setup>
  import HeaderComponent from './components/layout/HeaderComponent.vue'
  import FooterComponent from './components/layout/FooterComponent.vue'
  import { useItems } from './shared/useItems'
  import { useAuth } from './shared/useAuth'
  import { onMounted } from 'vue'
  import { useRentals } from './shared/useRentals'
  import refreshItemAvailability from '@/utils/itemAvailability'

  const { fetchRentals } = useRentals()
  const { getItems } = useItems()
  const { fetchUsers } = useAuth()
  onMounted(async () => {
    // Fetch on mount
    await getItems()
    await fetchRentals()
    await fetchUsers()
    // update availability of items depend on if rental date has expired
    await refreshItemAvailability()
  })
</script>

<template>
  <div class="layout">
    <HeaderComponent />
    <div class="layout-main">
      <div class="content-container">
        <RouterView />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<style scoped>
  .layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url('../src/assets/images/RENTAPOOLZA-BÅDA.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .layout-main {
    overflow-y: auto; /* Hide vertical scrollbar */
    overflow-x: hidden; /* Hide horizontal scrollbar */
    flex: 1;
  }

  .content-container {
    background-color: rgba(255, 255, 255, 0.165);
    /* mask: linear-gradient(black,black,transparent); */
    backdrop-filter: blur(5px);
    margin: 0rem auto;
    width: 80vw;
    display: flex;
    justify-content: center;
    min-height: 100%;
    padding: 2rem;
  }

  footer {
    background-color: var(--color-bg-alt);
    color: var(--color-text-muted);
    padding: 1rem 0;
    text-align: center;
  }

  @media(max-width: 500px){

     .content-container {
        width: 100%;
      }

      .layout-main{
        width: 93vw;
      }

      .layout{
        height: 100vh;
      }
  

}
</style>
