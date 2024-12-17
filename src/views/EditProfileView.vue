<script setup>
  import { ref, computed } from 'vue'
  import { useAuth } from '@/shared/useAuth'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { currentUser, updateUser } = useAuth()
  const goToProfile = () => {
    router.push('/profile/view')
  }
  const username = ref(currentUser.value.username)
  const bio = ref(currentUser.value.bio || '')
  const imageUrl = ref(
    currentUser.value.picture ||
      'https://www.producemarketguide.com/media/user_RZKVrm5KkV/22476/pears_commodity-page.png'
  )
  const isEditing = ref(false)
  const isLoading = ref(false)
  const errorMessage = ref('')

  const updateProfile = async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const updatedFields = {
        username: username.value,
        bio: bio.value,
        picture: imageUrl.value
      }
      await updateUser(currentUser.value.id, updatedFields)
      isEditing.value = false
    } catch (error) {
      console.error('Failed to update profile:', error)
      errorMessage.value = 'Failed to update profile. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const t = (key) =>
    ({
      edit: 'Edit',
      save: 'Save',
      username: 'Username',
      about: 'About Me',
      profileSettings: 'Profile Settings',
      imageUrl: 'Profile Image URL'
    })[key]
</script>

<template>
  <div class="profile-container">
    <button @click="goToProfile" class="secondary back-button">
      Back to profile
    </button>
    <div class="profile-content">
      <div class="profile-header">
        <h1>{{ t('profileSettings') }}</h1>
        <button
          @click="isEditing ? updateProfile() : (isEditing = true)"
          class="edit-button"
          :disabled="isLoading"
        >
          {{ isEditing ? t('save') : t('edit') }}
        </button>
      </div>

      <div class="profile-body">
        <div class="profile-image-container">
          <div class="profile-image">
            <img :src="imageUrl" :alt="username" />
          </div>
          <div v-if="isEditing" class="input-container mt-2">
            <label for="imageUrl">{{ t('imageUrl') }}</label>
            <input
              id="imageUrl"
              v-model="imageUrl"
              type="url"
              placeholder="Enter image URL"
              class="editing"
            />
          </div>
        </div>

        <div class="profile-info">
          <div class="input-container">
            <label :for="t('username')">{{ t('username') }}</label>
            <input
              :id="t('username')"
              v-model="username"
              :readonly="!isEditing"
              :class="{ editing: isEditing }"
            />
          </div>

          <div class="input-container">
            <label :for="t('about')">{{ t('about') }}</label>
            <textarea
              :id="t('about')"
              v-model="bio"
              :readonly="!isEditing"
              :class="{ editing: isEditing }"
            ></textarea>
          </div>
        </div>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
  .profile-container {
    max-width: 64rem;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .profile-header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
  }

  .profile-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-image-container {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }

  .profile-image {
    aspect-ratio: 1 / 1;
    background-color: #e5e5e5;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-container label {
    font-size: 1rem;
    font-weight: 600;
    color: #4b5563;
  }

  .input-container input,
  .input-container textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e5e5;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: #4b5563;
    transition: all 0.3s ease;
  }

  .input-container input.editing,
  .input-container textarea.editing {
    border-color: #00ff7f;
  }

  .input-container input:focus,
  .input-container textarea:focus {
    outline: none;
    border-color: #00ff7f;
    box-shadow: 0 0 0 3px rgba(0, 255, 127, 0.2);
  }

  .input-container textarea {
    min-height: 100px;
    resize: vertical;
  }

  .edit-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #00ff7f;

    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit-button:hover {
    background-color: #00dd6f;
    transform: translateY(-2px);
  }

  .edit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .back-button {
    font-size: small;
  }

  .icon {
    font-size: 1.25rem;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    .profile-body {
      flex-direction: row;
      align-items: flex-start;
    }

    .profile-image-container {
      width: 33.333%;
    }

    .profile-info {
      flex: 1;
    }
  }
</style>
