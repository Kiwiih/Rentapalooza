<script setup>
  import { useAuth } from '@/shared/useAuth'
  import Review from '../components/Review.vue'
  const { currentUser } = useAuth()
  console.log(currentUser)
</script>

<template>
  <div>
    <h2>Welcome {{ currentUser.username }}</h2>
  </div>
  <Review />
</template>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    background: yellow;
    padding: 1rem 2rem;
    border-radius: 30px;
    width: 50%;
    border: 3px solid;
    text-align: center;
  }
</style>
