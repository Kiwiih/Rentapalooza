// useAuth.js

import axios from 'axios'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import bcrypt from 'bcryptjs'

// Current user is information about authenticated user
const currentUser = ref(JSON.parse(localStorage.getItem('user')) || null)

// Loading and error uses to indicate status
const loading = ref(false)
const error = ref(false)
// ------------------------------------------------------------------------------------------

export const useAuth = () => {
  // 'users' holds ALL users, to match input information.
  const users = ref([])

  // using router to redirect to specific path
  const router = useRouter()

  // ------------------------------------------------------------------------------------------
  //* Fetch all users
  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(
        'https://api.jsonbin.io/v3/b/6751aed4acd3cb34a8b49242',
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
      users.value = await response.data.record.users // Update the users list
      console.log('fetched users succsessfully')
      console.log()
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching users.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  //* Create a new user (signup)
  const createUser = async (email, password) => {
    loading.value = true
    error.value = null

    try {
      // Start with getting all users
      await fetchUsers()

      // Check if email already exists
      const emailExists = users.value.some((user) => user.email === email)
      if (emailExists) {
        throw new Error('A user with this email already exists.')
      }

      // Create new user object
      const newUser = {
        id: uuidv4(),
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'user',
        bio: '',
        profileImg: ''
      }

      const response = await axios.put(
        'https://api.jsonbin.io/v3/b/6751aed4acd3cb34a8b49242',
        {
          users: [...users.value, newUser]
        },
        {
          headers: {
            'X-Master-Key': import.meta.env.VITE_API_X_MASTER_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
      users.value = response.data.record.users // Update the users list
      console.log('Register users succsessfully')

      // Automatically Login after register user
      await login(email, password)
    } catch (err) {
      error.value = err.message || 'An error occurred while creating the user.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  //* Login
  const login = async (email, hashedPassword) => {
    loading.value = true
    error.value = null

    try {
      // Start with getting all users
      await fetchUsers()

      // Check if there is a user with matching email and password
      const user = users.value.find(
        (user) =>
          user.email === email &&
          bcrypt.compareSync(hashedPassword, user.password)
      )

      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Store specific properties from user in reactive state
      currentUser.value = { id: user.id, email: user.email }

      // Store current user in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          email: user.email,
          hashedPwd: user.password // to show it's hashed
        })
      ) // Save user to localStorage

      // Redirect to homeView when loggin in
      router.push('/')

      console.log('Login successfully')
    } catch (err) {
      error.value = err.message || 'An error occurred while logging in.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  //* Logout
  const logout = () => {
    currentUser.value = null // Set current user to null
    localStorage.removeItem('user') // Remove user from localStorage
    router.push({ name: 'login' }) // Redirect to LoginView
    console.log('Logout successfully')
  }

  return {
    currentUser,
    loading,
    error,

    createUser,
    login,
    logout
  }
}
