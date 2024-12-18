<script setup>
  import { ref, onMounted, computed } from 'vue'
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

  const { reviews, fetchReviews, addReview } = useReviews()
  const { currentUser } = useAuth()

  const showForm = ref(false)
  const newRating = ref(0)
  const commentText = ref('')

  const setRating = (rating) => {
    newRating.value = rating
  }

  //basic switch case för att visa stjärnor istället för siffra för existerande reviews rating
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

  const addNewReview = async () => {
    const newReview = {
      id: uuidv4(),
      rating: newRating.value,
      comment: commentText.value,
      userId: currentUser.value.id,
      //Behöver också logik för profilen man är på
      reviewerId: '05d66035-34f9-40cc-9cfa-d3fc877a7783'
    }
    try {
      await addReview(newReview)

      newRating.value = 0
      commentText.value = ''
      showForm.value = false
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  newRating.value = 0
  commentText.value = ''
  showForm.value = false

  onMounted(() => {
    fetchReviews()
  })
</script>
<template>
  <h1>alla små reviews ⭐</h1>
  <!-- Här visas alla reviews -->
  <button @click="showForm = true">add new review</button>
  <button @click="showForm = false">X</button>

  <div v-if="showForm" class="add-review-form">
    <span
      v-for="i in 5"
      :key="i"
      @click="setRating(i)"
      :class="{ active: i <= newRating }"
    >
      ⭐
    </span>
    <input
      type="text"
      placeholder="Write your comment here..."
      rows="4"
      v-model="commentText"
    />
    <button @click="addNewReview">SEND</button>
  </div>
  <li v-for="review in reviews" :key="review.id">
    {{ getRating(review.rating) }} <br />
    {{ review.comment }}
    {{}}
  </li>
</template>

<style scoped>
  .add-review-form {
    background-color: rgb(43, 226, 76);
    margin-top: 1em;
    border-radius: 25px;
    padding: 1em;
    border: black solid;
  }
  li {
    list-style: none;
    background-color: rgb(255, 253, 253);
    border-radius: 25px;
    padding: 1em;
    margin-top: 0.5em;
    border: black solid;
  }
  span:hover {
    background-color: antiquewhite;
  }
</style>
