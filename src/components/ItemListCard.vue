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
          <h2 class="item-title">{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>

        <div class="card-body-sidebar">
          <small class="renter-information">
            Outhyres by: <br />
            <b>
              <a href="#" style="text-decoration: none" aria-label="Visit profile page for user">{{
                props.ownerName
              }}</a>
            </b>
            (Todo: länka profil)
          </small>
          <p
            :class="
              item.isAvailable
                ? 'badge available-badge'
                : currentUser && currentUser.id == item.renterId
                  ? 'badge cyurrently-renter-badge'
                  : 'badge unavailable-badge'
            "
          >
            {{
              item.isAvailable
                ? 'Available for rent'
                : currentUser && currentUser.id == item.renterId
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
          <router-link :to="{ name: 'itemDetails', params: { id: item.id } }">
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
    overflow: auto;

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
        gap: 0.5rem;

        .card-body-main {
          /* background-color: blueviolet; */
          flex-grow: 1;
        }

        .card-body-sidebar {
          /* background-color: blue; */
          width: 14rem;
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

  @media screen and (max-width: 600px) {
    article {
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
        -webkit-line-clamp: 1;
        /* Begränsar till EEEEEN rad */
        overflow: hidden;
        text-overflow: ellipsis;
        /* Visar "..." om texten är för lång */
        line-height: normal;
      }

      .item-title {
        font-size: medium;
      }

      .card-content-container {
        display: unset;

        .card-body {
          /* background-color: red; */
          display: unset;

          .card-body-sidebar {
            /* background-color: blue; */
            display: flex;
            width: 100%;
            text-align: unset;
            justify-items: left;
            align-items: start;

            /* döljer renter information för små skärmar */
            .renter-information {
              display: none;
            }
          }
        }

        /* utrymme för badge att andas */
        .badge {
          margin: 0.5rem 0 0.5rem 0;
        }

        .card-footer {
          /* background-color: antiquewhite; */
          flex-direction: column;
        }
      }

      .pricetag {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      button {
        font-size: smaller;
        margin-left: unset;
      }
    }
  }
</style>
