<script setup>
  // Emil Högberg

  import { ref, computed } from 'vue'

  // Get current date
  const today = new Date()

  // Recipt
  const rentals = ref([
    {
      id: 'rental123',
      itemId: '1',
      ownerId: 'user123',
      renterId: 'li45h64i',
      startDate: '2024-12-11',
      endDate: '2024-12-20',
      price: 100
    },
    {
      id: 'rental124',
      itemId: '2',
      ownerId: 'user456',
      renterId: 'li45h64i',
      startDate: '2024-12-01',
      endDate: '2024-12-03',
      price: 50
    }
  ])
  // Items
  const items = ref([
    {
      id: '1',
      title: 'The Great Gatsby',
      description: 'A classic novel by F. Scott Fitzgerald.',
      price: 100,
      image: 'https://m.media-amazon.com/images/I/61z0MrB6qOS._SL1500_.jpg'
    },
    {
      id: '2',
      title: 'Camping Tent',
      description: 'A two-person tent for outdoor adventures.',
      price: 50,
      image: 'https://m.media-amazon.com/images/I/71DPerT9EKL._AC_SL1500_.jpg'
    }
  ])
  // Users
  const users = ref([
    {
      id: 'user123',
      name: 'Alice',
      profileImg:
        'https://www.kallesandare.se/wp-content/uploads/2015/04/kalle2012.jpg'
    },
    {
      id: 'user456',
      name: 'Bob',
      profileImg: 'https://via.placeholder.com/150'
    }
  ])

  const currentUserId = 'li45h64i'
  //Load the page by showing all bookings
  const selectedFilter = ref('all')

  const userRentals = computed(() =>
    rentals.value
      .filter((rental) => rental.renterId === currentUserId)
      .map((rental) => {
        const item = items.value.find((i) => i.id === rental.itemId)
        const owner = users.value.find((u) => u.id === rental.ownerId)
        return { ...rental, item, owner }
      })
  )

  // Filter the bookings
  const allBookings = computed(() => userRentals.value)

  const pastBookings = computed(() =>
    userRentals.value.filter((rental) => new Date(rental.endDate) < today)
  )

  const upcomingBookings = computed(() =>
    userRentals.value.filter((rental) => new Date(rental.startDate) > today)
  )

  // Switch between filtered bookings
  const filteredRentals = computed(() => {
    switch (selectedFilter.value) {
      case 'past':
        return pastBookings.value
      case 'upcoming':
        return upcomingBookings.value
      default:
        return allBookings.value
    }
  })
</script>

<template>
  <div class="container">
    <h1>Your Booking History</h1>
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

    <ul v-if="filteredRentals.length">
      <li v-for="rental in filteredRentals" :key="rental.id">
        <h2>{{ rental.item.title }}</h2>
        <p>{{ rental.startDate }} - {{ rental.endDate }}</p>
        <img :src="rental.item.image" width="200" />
        <p>{{ rental.item.description }}</p>
        <div class="owner-container">
          <img class="avatar" :src="rental.owner.profileImg" height="60" />
          <p>{{ rental.owner.name }}</p>
        </div>
        <p>Total cost: {{ rental.price }} SEK</p>
        <br />
        <hr />
        <br />
      </li>
    </ul>
    <p v-else>No bookings found.</p>
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

  .avatar {
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .filter-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .active {
    background-color: #6c757d;
  }

  .owner-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  li {
    list-style: none;
  }
</style>
