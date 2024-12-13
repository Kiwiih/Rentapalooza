<script setup>
  import { ref } from 'vue'
  import { useItems } from '@/shared/useItems.js'
  import BarForSearch from '@/components/BarForSearch.vue'

  const { items, getItems } = useItems()
  getItems()

  const searchQuery = ref('')

  const search = () => {
    console.log('Searching for:', searchQuery.value)
  }
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
          <h3>Featured Items ⇩</h3>
          <div class="item-grid">
           
            <div
              v-for="item in items.slice(0, 4)"
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
      </div>
  </div>
</div>
</template>

<style scoped>

.home-page{
  width: 100%;
  height:100%;
}

  .hero {
    text-align: center;
    margin-bottom: 2rem;
  }

  .hero h2 {
    font-size: 4.5rem;
    margin-bottom: 0.5rem;
  }

  p{
    font-size: 1.2rem;
  }

  .search-bar {
    display: flex;
    max-width: 600px;
    margin: 1rem auto;
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
  width: 17rem;
  height: 25rem;
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
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 2px solid var(--color-border)
}

</style>
