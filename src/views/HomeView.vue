<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useItems } from '@/shared/useItems.js'
  import BarForSearch from '@/components/BarForSearch.vue'
  import { useRentals } from '@/shared/useRentals';

  const { items, getItems } = useItems()
  const { rentals, fetchRentals } = useRentals();
  
   // function that reverse any array you want
   const reverseArray = (arr) => {
    return arr.slice().reverse()
  }
  
  getItems()
  fetchRentals();

  const searchQuery = ref('')

  const search = () => {
    console.log('Searching for:', searchQuery.value)
  }
const popularItems = ref([])

// calculating the most popular items
const calculatePopularItems = () => {
  const itemCountMap = rentals.value.reduce((acc, rental) => {
    acc[rental.itemId] = (acc[rental.itemId] || 0) + 1
    return acc
  }, {})

  // sort by most number of receipts
  const sortedItems = items.value
    .map((item) => ({
      ...item,
      rentalCount: itemCountMap[item.id] || 0,
    }))
    .sort((a, b) => b.rentalCount - a.rentalCount)

  popularItems.value = sortedItems.slice(0, 3)
}

// fetches on mount
onMounted(async () => {
  await Promise.all([getItems(), fetchRentals()])
  calculatePopularItems()
})
</script>

<template>
  <div>
  <div class="home-page">
      <div>
        <section class="hero">
          <h2>Find what you need, rent with ease</h2>
          <p>Discover a wide range of items available for rent in your area.</p>
          <BarForSearch />
        </section>

        <section class="featured-items">
          <h3>Latest listings ⇩</h3>
          <div class="item-grid">
           
            <div
              v-for="item in reverseArray(items).slice(0, 4)"
              :key="item.id"
              class="item-card"
            >
              <img :src="item.images[0]" :alt="item.title" class="item-image" />
              <h4>{{ item.title }}</h4>
              <p>{{ item.price }} SEK</p>
              <router-link :to="{ name: 'itemDetails', params: { id: item.id } }">
              <button class="button-secondary">View Details</button>
              </router-link>
            </div>
           </div>
       </section>

       <section class="popular-items">
          <h3 class="head-pop">Most popular listings 🔥</h3>
          <div class="item-grid">
            <div
              v-for="item in popularItems"
              :key="item.id"
              class="item-card-pop"
            >
              <img :src="item.images[0]" :alt="item.title" class="item-image" />
              <h4>{{ item.title }}</h4>
              <p>{{ item.price }} SEK</p>
              <p>Rented {{ item.rentalCount }} times</p>
              <router-link :to="{ name: 'itemDetails', params: { id: item.id } }">
                <button class="button-secondary">View Details</button>
              </router-link>
            </div>
          </div>
        </section>
      </div>
  </div>
</div>
</template>

<style scoped>

.home-page{
  width: 100%;
}

  .hero {
    text-align: center;
    margin-bottom: 0rem;
  }

  .hero h2 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  p{
    font-size: 1rem;
  }

  .search-bar {
    display: flex;
    max-width: 600px;
    margin: .5rem auto;
  }

  .search-bar input {
    flex-grow: 1;
    margin-bottom: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search-bar button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

.featured-items{
  width: 100%
}

  .featured-items h3 {
    margin-bottom: 1rem;
    border-width: 10px;

  }

  .item-grid {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

 .item-card {
  background-color: var(--color-bg);
  border: 2px solid var(--color-border); 
  border-radius: 6px; 
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  text-align: center;
  width: 15rem;
  height: 22rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2), 
              -5px -5px 15px rgba(255, 255, 255, 0.4);
  transform: rotate(-3deg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.item-card:hover {
  transform: rotate(0deg) translateY(-5px);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3); 
}


.item-card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 2px solid var(--color-border)
}

h3 {
  margin-top: 2rem;
}

.item-image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 2px solid var(--color-border)
}

.item-card-pop{
  background-color: var(--color-bg);
  border: 2px solid var(--color-border); 
  border-radius: 6px; 
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  text-align: center;
  width:20rem;
  height: 24rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2), 
              -5px -5px 15px rgba(255, 255, 255, 0.4);
  transform: rotate(-3deg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.head-pop{
  margin: 3rem 1rem 1rem 1rem;
}

.item-card-pop:hover {
  transform: rotate(0deg) translateY(-5px);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3); 
}

</style>
