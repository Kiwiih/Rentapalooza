<script setup>
  // Emil Högberg

  import { ref, computed, onBeforeMount, watch } from 'vue'
  // Import the functions that fetches the data
  import { useItems } from '@/shared/useItems'
  import { useAuth } from '@/shared/useAuth'
  import { useRentals } from '@/shared/useRentals'
  import handleUnbookItem from '@/utils/unbookItem'
  // Destruct the functions we need
  const { items, getItems } = useItems()
  const { users, currentUser, fetchUsers } = useAuth()
  const { rentals, fetchRentals, updateRental } = useRentals()
  // Add a loading state
  const loading = ref(true)
  // Add a message if the are no bookings to show
  const noPreviousBookingsMessage = ref(false)
  onBeforeMount(async () => {
    await getItems()
    await fetchRentals()
    await fetchUsers()
    loading.value = false
  })

  // Get current date to use for filtering
  const today = new Date()

  // Filter items to only show those who are rented by the current user
  const userItems = computed(() => {
    if (!items.value.length || !currentUser.value) return []
    return items.value.filter((item) => item.renterId === currentUser.value.id)
  })

  const isReturnable = (item, rental) => {
    const today = new Date()
    const endDate = new Date(rental.endDate)
    return !item.isAvailable && endDate >= today
  }
  // Combine all data into a combined list for easy rendering
  const combinedRentals = computed(() => {
    return rentals.value
      .map((rental) => {
        const item = userItems.value.find((i) => i.id === rental.itemId) || {}
        const owner = users.value.find((u) => u.id === rental.ownerId) || {}
        return {
          ...rental,
          isReturnable: isReturnable(item, rental),
          itemTitle: item.title || 'Unknown Item',
          itemImage:
            Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : 'https://via.placeholder.com/300/CCCCCC/000000?text=No+Image',
          itemDescription: item.description || 'No description available',
          ownerUsername: owner.username || 'Unknown User',
          ownerProfileImage:
            owner.profileImage ||
            'https://via.placeholder.com/150/CCCCCC/000000?text=Avatar'
        }
      })
      .filter((rental) => rental.itemTitle !== 'Unknown Item')
  })

  // Filtering logic
  const selectedFilter = ref('all')
  // Filter the items based on if they are upcoming or past by comparing today's date
  const filteredRentals = computed(() => {
    const baseList = combinedRentals.value.reverse()
    switch (selectedFilter.value) {
      case 'past':
        return baseList.filter((rental) => new Date(rental.endDate) < today)
      case 'upcoming':
        return baseList.filter((rental) => new Date(rental.startDate) > today)
      default:
        return baseList
    }
  })
  // Watch and see if there are any bookings, if not show a message
  watch(filteredRentals, (newRentals) => {
    if (newRentals.length === 0) {
      noPreviousBookingsMessage.value = true
    } else {
      noPreviousBookingsMessage.value = false
    }
  })
</script>

<template>
  <div class="container">
    <h1>My Booking History</h1>
    <div class="filter-buttons">
      <button
        @click="selectedFilter = 'all'"
        :class="{ active: selectedFilter === 'all' }"
      >
        All Bookings
      </button>
      <button
        @click="selectedFilter = 'upcoming'"
        :class="{ active: selectedFilter === 'upcoming' }"
      >
        Upcoming Bookings
      </button>
      <button
        @click="selectedFilter = 'past'"
        :class="{ active: selectedFilter === 'past' }"
      >
        Past Bookings
      </button>
    </div>

    <ul v-if="noPreviousBookingsMessage === true">
      <li>
        <h3>No bookings to show..</h3>
      </li>
    </ul>
    <ul v-else-if="filteredRentals.length > 0">
      <li v-for="rental in filteredRentals" :key="rental.id">
        <p>{{ rental.startDate }} - {{ rental.endDate }}</p>
        <h2>{{ rental.itemTitle }}</h2>
        <img :src="rental.itemImage" alt="Item Image" class="item-image" />
        <p>{{ rental.itemDescription }}</p>
        <div class="owner-container">
          <img
            :src="rental.ownerProfileImage"
            alt="Owner Avatar"
            class="avatar"
          />
          <p>{{ rental.ownerUsername }}</p>
        </div>
        <p>Total cost: {{ rental.price }} SEK</p>

        <button v-if="rental.isReturnable" @click="handleUnbookItem(rental)">
          Return Item
        </button>
        <hr />
      </li>
    </ul>
    <ul v-else>
      <p>Loading your bookings...</p>
      <br />
      <li v-for="index in 3" :key="index">
        <hr />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--color-text);
  }

  .filter-buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .filter-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      box-shadow 0.2s ease;
  }

  .filter-buttons .active {
    background-color: var(--color-primary-variation);
    color: white;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    max-width: 600px;
  }

  li {
    background: var(--color-bg-alt);
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: box-shadow 0.2s ease;
  }

  li:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .item-image {
    width: 100%;
    max-width: 200px;
    border-radius: 10px;
    margin: 10px 0;
  }

  .owner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }

  .avatar {
    border-radius: 50%;
    border: 2px solid var(--color-border);
    width: 50px;
    height: 50px;
  }

  hr {
    border: 0;
    border-top: 1px solid var(--color-border);
    margin: 20px 0;
  }

  .item-image,
  .avatar {
    transition: transform 0.3s ease;
  }

  .item-image:hover,
  .avatar:hover {
    transform: scale(1.05);
  }
</style>
