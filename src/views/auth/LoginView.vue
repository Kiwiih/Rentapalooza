<!-- LoginView.vue -->

<script setup>
  import './auth.css'
  import { useAuth } from '@/shared/useAuth'
  import { ref } from 'vue'
  //temporary hardcoded for developers to login quickly ;)
  const email = ref('lasse@gmail.com')
  const password = ref('lasse')

  const { login, logout, currentUser, loading, error } = useAuth()

  const handleLogin = () => {
    error.value = ''

    login(email.value, password.value)
  }
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input
          autocomplete="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
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
        <RouterLink to="/auth/register">Register</RouterLink>
      </p>

      <!--! Temporary buttons -->
      <button
        v-if="currentUser"
        @click="console.log('current user:', currentUser)"
      >
        currentUser
      </button>
      <button v-if="currentUser" @click="logout">logout</button>
      <!--! ------------------ -->
    </div>
  </div>
</template>

<style scoped></style>
