<script setup>
  import HeaderComponent from './components/layout/HeaderComponent.vue'
  import FooterComponent from './components/layout/FooterComponent.vue'
</script>
<template>
  <div class="layout">
    <HeaderComponent />
    <main class="container">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container {
    flex: 1;
  }

  footer {
    background-color: var(--color-bg-alt);
    color: var(--color-text-muted);
    padding: 1rem 0;
    text-align: center;
  }
</style>
