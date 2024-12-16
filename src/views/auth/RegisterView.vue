<!-- RegisterView.vue -->

<script setup>
  import './auth.css'
  import { useAuth } from '@/shared/useAuth'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const { createUser, loading, error } = useAuth()

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  // Register handler
  const handleRegister = () => {
    error.value = ''

    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match!'
      return
    }

    createUser(username.value, email.value, password.value, route.query)
  }
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>Register</h2>

      <form @submit.prevent="handleRegister">
        <!-- Username input -->
        <input
          type="text"
          v-model="username"
          :class="{ error: error === 'Username is already in use' }"
          placeholder="Username"
          required
        />

        <!-- Email input -->
        <input
          type="email"
          v-model="email"
          :class="{ error: error === 'A user with this email already exists' }"
          placeholder="Email"
          required
        />

        <!-- Password Input -->
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />

        <!-- Confirm pwd Input -->
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

<style scoped>
.auth-wrapper{
  background: none;
  height: 100%;
  margin: auto;
}

.auth-box{
  width:50vw;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 3px solid;
  border-width: 10px;
  border-style: solid;
  border-image: repeating-linear-gradient(
    45deg,
    rgb(255, 255, 255),
    rgb(255, 255, 255) 10px,
    black 10px,
    black 20px
  ) 10;
}

.switch-auth{
  margin-top: 2rem;
}

</style>
