<!-- RegisterView.vue -->

<script setup>
  import './auth.css'
  import { useAuth } from '@/shared/useAuth'
  import { ref } from 'vue'

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const { createUser, loading, error } = useAuth()

  const handleRegister = () => {
    error.value = ''

    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match!'
      return
    }

    createUser(email.value, password.value)
  }
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          :class="{ error: error === 'Passwords do not match!' }"
          placeholder="Confirm Password"
          required
        />

        <!-- Error message -->
        <p v-if="error" class="error-message">{{ error }}</p>

        <!-- Register Button -->
        <button
          :class="{ 'loading-btn': loading }"
          :disabled="loading"
          type="submit"
        >
          Register
        </button>
      </form>

      <!-- switch to LoginView -->
      <p class="switch-auth">
        Already have an account?
        <RouterLink to="/auth/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
