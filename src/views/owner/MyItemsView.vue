<script setup>
  //*____________________________________________________________*//
  //* JUST NU KAN MAN SE ALLAS ITEMS, INTE FÖR SPECIFIKA ÄGARE   *//
  //*____________________________________________________________*//

  import { RouterLink } from 'vue-router'
  import { onMounted } from 'vue'
  import { useAuth } from '@/shared/useAuth.js'
  import { computed, ref } from 'vue'

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
</script>
<template>
  <div v-if="userItems">
    <h2>Alla mina saker för uthyrning</h2>

    <!-- Rendera en lista med varor -->
    <ul>
      <li v-for="item in userItems" :key="item.id">
        <b>{{ item.title }} </b> <br />
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
          {{ item.description }} <b>Pris: {{ item.price }}</b>
        </div>
        <!-- Länk till redigera-sidan för varan -->
        <RouterLink :to="{ name: 'editItem', params: { id: item.id } }">
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

  <div v-else>
    <h3>Du har inga items🐨</h3>
  </div>
</template>

<style scoped>
  /* PAULINAS CSS */
  .img-container {
    /* background-color: purple; */
    display: flex;
    flex-shrink: 0;
    align-self: start;
    width: clamp(2rem, 20%, 7rem);
    aspect-ratio: 1 / 1;

    border: 2px solid var(--color-border);
    border-radius: 0.25rem;

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
    margin: 1em;
  }
  svg {
    color: black;
    width: 2.5em;
    padding: 0.2em;
    border-radius: 25px;
    background-color: rgb(117, 207, 207);
  }
  li {
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 0.5em;
    padding: 1em;
    margin: 1em;

    font-size: larger;
  }
  ul {
    text-decoration: none;
  }
</style>
