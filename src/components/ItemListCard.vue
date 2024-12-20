<script setup>
  import { useAuth } from '@/shared/useAuth'
  import { ref, watch } from 'vue'
  import { RouterLink } from 'vue-router'
  import BookingButton from './BookingButton.vue'
  import router from '@/router'
  const props = defineProps(['item', 'ownerName'])
  const { currentUser, users } = useAuth()
  const owner = ref(null)

  watch(
    () => [users.value, props.item.ownerId],
    () => {
      if (users.value && props.item.ownerId) {
        owner.value =
          users.value.find((user) => user.id === props.item.ownerId) || null
      }
    },
    { immediate: true }
  )

  const redirectToProfilePage = () => {
    if (owner.value) {
      router.push({ name: 'profile', params: { id: owner.value.id } })
    } else {
      console.error('Owner not found')
    }
  }

  const redirectToDetailView = () => {
    router.push({ name: 'itemDetails', params: { id: props.item.id } })
  }
  const imageError = (event) => {
    event.target.src = '/images/noImage.jpg' // Ange här din fallback-bild
  }
</script>
<template>
  <article>
    <div class="img-container">
      <img
        @click="redirectToDetailView"
        :src="props.item.images[0]"
        alt="Item Image"
        v-if="props.item.images?.length > 0"
        @error="imageError"
      />
    </div>

    <div class="card-content-container">
      <div class="card-body">
        <div class="card-body-main">
          <h4 @click="redirectToDetailView" class="item-title">
            {{ item.title }}
          </h4>
          <p class="item-desc">{{ item.description }}</p>
        </div>

        <div class="card-body-sidebar">
          <small class="renter-information">
            <p class="owner-text">Owner: <br /></p>
            <b v-if="owner">
              <button class="profile-button" @click="redirectToProfilePage">
                {{ owner.username }}
              </button>
            </b>
            <span v-else>Loading owner...</span>
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
                  ? 'You are currently renting this'
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
          <button @click="redirectToDetailView" class="button-secondary">
            Read More
          </button>
          <BookingButton :item="item" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
  .owner-text {
    padding-right: 1.5rem;
  }

  .profile-button {
    font-size: 1rem;
    font-weight: 600;
    background-color: var(--color-secondary-light);
    border: 1px solid var(--color-secondary);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s;
  }

  .profile-button:hover {
    background-color: var(--color-secondary-dark);
    color: var(--color-bg);
  }

  article {
    border: 3px solid transparent;
    border-radius: 4px;
    padding: 0.75rem;
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0rem;
    overflow: auto;

    &:hover {
      border: 3px solid var(--color-border);
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

    .item-title {
      cursor: pointer;
      &:hover {
        color: var(--color-accent-light);
      }
    }

    .img-container {
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
        cursor: pointer;
        width: 100%;
        height: 100%;

        object-fit: cover;

        transition: 500ms;
        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .card-content-container {
      flex-grow: 1;

      display: flex;
      gap: 0.5rem;
      flex-direction: column;

      .card-body {
        flex-grow: 1;

        display: flex;
        gap: 0.5rem;

        .card-body-main {
          flex-grow: 1;
        }

        .card-body-sidebar {
          width: 14rem;
          flex-shrink: 0;
          text-align: right;
          line-height: 1rem;

          display: flex;
          gap: 0.5rem;
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

    h4 {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 500px) {
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
        font-size: small;
      }

      .card-content-container {
        display: unset;

        .card-body {
          display: unset;

          .card-body-sidebar {
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
          flex-direction: column;
        }
      }

      .pricetag {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      button {
        font-size: .8rem;
        margin-left: unset;
        padding: .5rem;
      }

      .item-title{
        font-size: 1.2rem;
      }

      .item-desc{
        font-size: .9rem;
      }


    }
  }
</style>
