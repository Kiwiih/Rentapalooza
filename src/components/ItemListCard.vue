<script setup>
  import { useAuth } from '@/shared/useAuth'

  import BookingButton from './BookingButton.vue'

  const props = defineProps(['item', 'ownerName'])

  const { currentUser } = useAuth()

  const imageError = (event) => {
    event.target.src = '/images/noImage.jpg' // Ange här din fallback-bild
  }
</script>

<template>
  <article>
    <div class="img-container">
      <img
        :src="props.item.images[0]"
        alt="Item Image"
        v-if="props.item.images?.length > 0"
        @error="imageError"
      />
    </div>

    <div class="card-content-container">
      <div class="card-body">
        <div class="card-body-main">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>

        <div class="card-body-sidebar">
          <small>
            Outhyres by: <br />
            <b>
              <a href="#" style="text-decoration: none">{{
                props.ownerName
              }}</a>
            </b>
            (Todo: länka profil)
          </small>
          <p
            :class="
              item.isAvailable
                ? 'badge available-badge'
                : currentUser.id == item.renterId
                  ? 'badge cyurrently-renter-badge'
                  : 'badge unavailable-badge'
            "
          >
            {{
              item.isAvailable
                ? 'Available for rent'
                : currentUser.id == item.renterId
                  ? 'You are currently renting this !'
                  : 'Not available for rent'
            }}
          </p>
        </div>
      </div>

      <div class="card-footer">
        <div>
          <p class="pricetag">{{ item.price }} Kr</p>
        </div>

        <div class="button-container">
          <router-link :to="'/items/' + item.id">
            <button class="button-secondary">Read More</button>
          </router-link>

          <BookingButton :item="item" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
  article {
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0rem;

    &:hover {
      border: 1px solid var(--color-border);
      background-color: hsla(0, 0%, 50%, 0.05);
      /* 0.5 är transparensnivån */
    }

    /* TRUNCATING AV ALLA TEXTER I KORTET. */
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      /* Begränsar till 2 rader */
      overflow: hidden;
      text-overflow: ellipsis;
      /* Visar "..." om texten är för lång */
    }

    .img-container {
      /* background-color: purple; */
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

    .card-content-container {
      /* background-color: aquamarine; */
      flex-grow: 1;

      display: flex;
      gap: 0.5rem;
      flex-direction: column;

      .card-body {
        /* background-color: red; */
        flex-grow: 1;

        display: flex;
        gap: 2rem;

        .card-body-main {
          /* background-color: blueviolet; */
          flex-grow: 1;
        }

        .card-body-sidebar {
          /* background-color: blue; */
          width: clamp(5rem, 33%, 15rem);
          flex-shrink: 0;
          text-align: right;
          line-height: 1rem;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: end;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
      }
    }

    .pricetag {
      font-size: x-large;
      font-weight: bold;
      flex-grow: 1;
      width: max-content;
    }

    .button-container {
      text-align: right;
      display: flex;
      gap: 0.5rem;
    }

    button {
      margin-left: 0.5rem;
    }
  }
</style>
