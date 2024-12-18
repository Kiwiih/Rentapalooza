<script setup>
  // Emil Högberg
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/shared/useAuth'
  //Get user who is logged in
  const { currentUser } = useAuth()
  const router = useRouter()
  // Function to redirect to edit profile page
  const redirectToEditProfile = () => {
    router.push({ name: 'editProfile', params: { id: currentUser.value.id } })
  }

  //Find where user is located
  const userLocation = ref(null)
  const locationError = ref(null)
  const fetchLocation = () => {
    userLocation.value = t('fetchingLocation')
    locationError.value = null

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()
            userLocation.value = data.display_name
          } catch (error) {
            console.error('Error fetching location name:', error)
            userLocation.value = `${latitude}, ${longitude}`
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          locationError.value = t('locationError')
          userLocation.value = null
        }
      )
    } else {
      locationError.value = 'Geolocation is not supported by your browser'
      userLocation.value = null
    }
  }
  // Start fetching location when component is mounted
  onMounted(fetchLocation)
  //Format date so it shows up in the format "January 2022"
  function formatDate(dateString) {
    const [year, month] = dateString.split('T')[0].split('-')
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }
  // Get date of registration and use it to format it
  const inputDate = currentUser.value.registered
  // Object to hold profile data
  const profile = {
    username: currentUser.value.username,
    bio: currentUser.value.bio,
    location: userLocation,
    registrationDate: formatDate(inputDate),
    imageUrl:
      currentUser.value.profileImg ||
      'https://www.producemarketguide.com/media/user_RZKVrm5KkV/22476/pears_commodity-page.png'
  }
  // Function to get translations
  const t = (key) =>
    ({
      editProfile: 'Edit profile',
      registered: 'Joined',
      listings: 'Items For Rent',
      reviews: 'Reviews'
    })[key]
  // Array with different tabs to switch between
  const tabs = [
    { id: 'listings', label: t('listings') },
    { id: 'reviews', label: t('reviews') }
  ]
  // Holds the active tab
  const activeTab = ref('listings')
</script>

<template>
  <div class="profile-container">
    <div class="profile-content">
      <!-- Profile Image -->
      <div class="profile-image-container">
        <div class="profile-image">
          <img :src="profile.imageUrl" :alt="profile.username" />
        </div>
      </div>
      <!-- Profile Info -->
      <div class="profile-info">
        <div class="profile-header">
          <h1>{{ profile.username }}</h1>
        </div>
        <div class="reg-container">
          <i class="mdi mdi-calendar"></i>
          <span class="separator">|</span>
          <span>{{ t('registered') }} {{ profile.registrationDate }}</span>
        </div>
        <div class="button-container">
          <button
            @click="redirectToEditProfile"
            class="edit-profile-button button-primary"
          >
            {{ t('editProfile') }}
          </button>
        </div>
        <div class="about-section">
          <h4>About</h4>
          <i class="mdi mdi-map-marker"></i>
          <span>{{ profile.location }}</span>
          <hr />
          <div class="profile-details">{{ profile.bio }}</div>
        </div>
        <!-- Tabs -->
        <div class="tabs-container">
          <nav class="tabs-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['tab-button', { active: activeTab === tab.id }]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  hr {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
  }
  h1 {
    font-size: 4rem;
    margin-bottom: 0.5rem;
  }
  .profile-container {
    max-width: 64rem;
    margin: 0 auto;
    padding: 1rem;
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-image-container {
    width: 100%;
  }

  .profile-image {
    aspect-ratio: 1 / 1;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: left;
    flex: 1;
  }

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .profile-header h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  .about-section {
    margin-bottom: 1.5rem;
  }

  .about-section h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  .profile-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4b5563;
  }

  .profile-details i {
    font-size: 1.25rem;
  }

  .separator {
    margin: 0 0.5rem;
  }

  .tabs-container {
    border-bottom: 1px solid #e5e5e5;
  }

  .tabs-nav {
    display: flex;
    gap: 2rem;
  }

  .tab-button {
    padding: 0.5rem 0.25rem;
    margin-bottom: -1px;
    color: #6b7280;
    transition:
      color 0.3s,
      border-color 0.3s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .tab-button.active {
    border-bottom: 2px solid #111827;
    font-weight: 500;
    color: #111827;
  }

  @media (min-width: 768px) {
    .profile-content {
      flex-direction: row;
    }

    .profile-image-container {
      width: 33.333%;
    }
  }
</style>
