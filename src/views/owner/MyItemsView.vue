<script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted } from 'vue'
  import { useAuth } from '@/shared/useAuth.js'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { currentUser } = useAuth()

  // VIKTORS KOD
  import { useItems } from '@/shared/useItems.js'
  // Anropa `useItems` för att få tillgång till `items` och `getItems`
  const { items, getItems } = useItems()
  //SLUT PÅ VIKTORS KOD

  onMounted(async () => {
    await getItems(), currentUser
  })
  const userItems = computed(() => {
    if (!items.value.length) {
    }
    // Returnera items som tillhör inloggade ägare
    return items.value.filter((item) => item.ownerId === currentUser.value.id)
  })

  // console.log(userItems.value)
  // console.log(currentUser.value.id)

  const sendToAddItem = () => {
    router.push('/owner/create')
  }
</script>
<template>
  <div v-if="userItems">
    <div></div>
    <h2>All your items available for rent</h2>
    <div class="btnDiv">
      <button class="addItemBtn" @click="sendToAddItem">Add new item</button>
    </div>
    <div class="test">
      <!-- Rendera en lista med varor -->
      <ul>
        <li class="card" v-for="item in userItems" :key="item.id">
          <p class="item-title">{{ item.title }}</p>
          <br />
          <div class="img-container">
            <img
              v-for="(image, index) in item.images || []"
              :key="index"
              :src="image"
              :alt="'Bild på item ' + (index + 1)"
              class="itemImage"
              @error="handleImageError"
            />
          </div>
          <br />
          <div>
            <p>{{ item.description }}</p>
            <p>
              <b>{{ item.price }} kr</b>
            </p>
          </div>
          <!-- Länk till redigera-sidan för varan -->
          <RouterLink
            :to="{ name: 'editItem', params: { id: item.id } }"
            aria-label="Edit this item"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    <h3>You don't have any items 🐨</h3>
    <p>Click the button above to add your first item!</p>
  </div>
</template>

<style scoped>
  .test {
    width: 100%;
  }

  /* PAULINAS CSS */
  .img-container {
    display: flex;
    flex-shrink: 0;
    align-self: start;
    width: clamp(2rem, 80%, 7rem);
    aspect-ratio: 1 / 1;

    display: grid;
    place-items: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }
  /* PAULINAS CSS */

  h2 {
    margin-top: 1rem;
    text-align: center;
  }
  svg {
    color: var(--color-primary-variation);
    width: 2rem;
    padding: 0.2em;
    border-radius: 4px;
    background-color: var(--color-primary);
  }

  svg:hover {
    background-color: var(--color-primary-variation);
    color: var(--color-primary);
  }

  ul {
    text-decoration: none;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem;
  }

  .card {
    width: 90%;
    border: 2px solid var(--color-border);
    border-radius: 0.25rem;
    border-radius: 10px;
    margin-bottom: 0.5em;
    padding: 1rem;
    list-style-type: none;
  }

  p {
    font-size: 1rem;
  }

  .addItemBtn {
    width: 60%;
  }

  .btnDiv {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .item-title {
    font-size: 1.25rem;
    font-weight: 500;
  }
</style>
