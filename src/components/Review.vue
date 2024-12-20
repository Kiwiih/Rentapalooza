<script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useReviews } from '../shared/useReviews'
  import { useAuth } from '../shared/useAuth'
  import { v4 as uuidv4 } from 'uuid'

  //*__________________________________________________________________

  // importera allt skit från review, currentuser,
  // och även hämta in parameter från profile om url,
  // lär ju bli en if-sats om det finns ett id/ownername
  //  i url, annars visa currentusers review,
  // men det ska ej gå att lägga till en review då

  //Kanske en ifsats om den inloggade usern är samma som
  //den om skrivit recensionen, kan man ta bort, annars ej
  //*__________________________________________________________________

  //hämta composables
  const { reviews, fetchReviews, addReview } = useReviews()
  const { currentUser, users, fetchUsers } = useAuth()

  const showForm = ref(false)
  const newRating = ref(0)
  const commentText = ref('')
  // för att få tillgång till route parametrar
  const route = useRoute()

  //basic switch case för att visa stjärnor istället för siffror för existerande reviews rating
  const getRating = computed(() => (rating) => {
    switch (rating) {
      case 1:
        return '⭐'
      case 2:
        return '⭐⭐'
      case 3:
        return '⭐⭐⭐'
      case 4:
        return '⭐⭐⭐⭐'
      case 5:
        return '⭐⭐⭐⭐⭐'
      default:
        return 'no rating available'
    }
  })
  //hämtar id från url så det ka tankas in på vem som sak få reviewn
  const renterId = route.params.id

  const addNewReview = async () => {
    //logik för att lägga till ny review
    const newReview = {
      id: uuidv4(),
      rating: newRating.value,
      comment: commentText.value,
      //Den som skriver recensionen
      reviewerId: currentUser.value.id,
      //Profilen vars sida man är på, den som får reviewn
      renterId: renterId
    }
    try {
      //spread för att behålla tidigare data och addera den nya recensionen
      const updatedReviews = [...reviews.value, newReview]
      await addReview(updatedReviews)
      await fetchReviews()
      //rensa formuläret
      newRating.value = 0
      commentText.value = ''
      showForm.value = false
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  fetchReviews()
  fetchUsers()
</script>
<template>
  <!-- Här visas alla reviews -->
  <button @click="showForm = true">add new review</button>
  <button @click="showForm = false">X</button>
  <!-- Formulär för ny review -->
  <div v-if="showForm" class="add-review-form">
    <span v-for="(star, index) in 5" :key="index" @click="newRating = index + 1"
      >⭐</span
    >
    <input
      type="text"
      placeholder="Write your comment here..."
      v-model="commentText"
    />
    <button @click="addNewReview">ADD</button>
  </div>
  <!-- Lista ut alla review, ska ändras så bara det ska visa den vars profil man r´är på -->
  <li
    v-for="review in reviews.filter((r) => r.renterId === renterId)"
    :key="review.id"
  >
    <!-- Kod för att filtrera så man visar namnet på den som skrivit recensionen -->
    {{ users.find((user) => user.id === review.reviewerId)?.username }}
    {{ getRating(review.rating) }}
    <br />
    {{ review.comment }}
  </li>
</template>

<style scoped>
  .add-review-form {
    background-color: #2de872;
    margin-top: 1em;
    border-radius: 25px;
    padding: 1em;
  }
  li {
    list-style: none;
    background-color: white;
    border-radius: 25px;
    padding: 1em;
    margin-top: 0.5em;
    border: black solid 1px;
  }
  span {
    font-size: 1.5em;
    padding: 0.1em;
  }
  span:hover {
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
  }
</style>
