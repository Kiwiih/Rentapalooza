<!-- LoginView.vue -->

<script setup>
  import './auth.css'
  import { useAuth } from '@/shared/useAuth'
  import { ref } from 'vue'

  import { useRoute } from 'vue-router'
  const route = useRoute()

  //temporary hardcoded for developers to login quickly ;)
  const identifier = ref('lasse@gmail.com')
  const password = ref('lasse')

  const { login, loading, error } = useAuth()

  // Login handler
  const handleLogin = () => {
    error.value = ''
    login(identifier.value, password.value, route.query)
  }

  console.log(route.query)
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <!-- Username or Email Input -->
        <input
          autocomplete="identifier"
          type="text"
          v-model="identifier"
          placeholder="Username or Email"
          required
        />

        <!-- password input -->
        <input
          autocomplete="current-password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />

        <!-- Error message -->
        <p v-if="error" class="error-message">{{ error }}</p>

        <!-- Login Button -->
        <button
          :class="{ 'loading-btn': loading }"
          :disabled="loading"
          type="submit"
        >
          Login
        </button>
      </form>

      <!-- Switch to RegisterView -->
      <p class="switch-auth">
        Don't have an account?

        <RouterLink :to="{ name: 'register', query: route.query }"
          >Register</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
