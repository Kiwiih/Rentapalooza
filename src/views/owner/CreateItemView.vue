<script setup>
  import { useItems } from '@/shared/useItems'
  import { useAuth } from '@/shared/useAuth'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goToMyItems = () => {
    router.push('/owner/my-items')
  }

  const { currentUser } = useAuth()

  const { items, getItems, updateItems } = useItems()
  getItems()

  const message = ref('')
  const showMessage = ref(false)
  const isLoading = ref(false)

  const inputData = reactive({
    id: '',
    title: '',
    description: '',
    price: '',
    category: [],
    images: ['', '', ''],
    isAvailable: true,
    ownerId: currentUser.value.id,
    currentRentalId: null,
    renterId: null
  })

  const categories = [
    'Vehicles',
    'Real Estate',
    'Home & Living',
    'Electronics',
    'Leisure & Hobby',
    'Jobs',
    'Business',
    'Personal Items',
    'Other'
  ]

  const generateId = () => {
    return `item-${Date.now()}`
  }

  const handleSubmit = async () => {
    inputData.images = inputData.images.filter((image) => image.trim() !== '')
    inputData.id = generateId()

    //console.log("New item:", inputData);

    const updatedItems = [...items.value, { ...inputData }]

    try {
      await updateItems(updatedItems)
      //console.log("Item added successfully:", inputData);
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
        message.value = 'Item added successfully.'
        showMessage.value = true
      }, 1000)

      //message.value = "Item added successfully.";
      //showMessage.value = true;

      setTimeout(() => {
        showMessage.value = false
      }, 3000)

      Object.assign(inputData, {
        id: '',
        title: '',
        description: '',
        price: '',
        category: [],
        images: ['', '', ''],
        isAvailable: true,
        ownerId: currentUser.value.id,
        currentRentalId: null,
        renterId: null
      })
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }
</script>

<template>
  <div class="createItem">
    <h1>Add new item to rent out</h1>

    <div class="form">
      <label for="title">Item title</label>
      <input
        type="text"
        id="title"
        placeholder="Add a title here.."
        v-model="inputData.title"
      />

      <label for="description">Item description</label>
      <input
        type="text"
        placeholder="Add a description here.."
        id="description"
        v-model="inputData.description"
      />

      <label for="price">Item price</label>
      <input
        type="number"
        placeholder="Add a price here.."
        id="price"
        v-model="inputData.price"
      />

      <label for="category">Item category</label>
      <div v-for="c in categories" :key="c" class="categoryDiv">
        <label :for="c" class="categoryLabel">{{ c }}</label>
        <input
          type="checkbox"
          :value="c"
          :id="c"
          v-model="inputData.category"
          class="checkbox"
        />
      </div>

      <label for="images">Item images</label>
      <div v-for="(image, index) in inputData.images" :key="index">
        <input
          type="url"
          v-model="inputData.images[index]"
          :placeholder="'Image URL ' + (index + 1)"
        />
      </div>
    </div>
    <div class="bottom-container">
      <button @click="goToMyItems" class="secondary back">
        Back to my items
      </button>
      <button
        type="submit"
        @click="handleSubmit"
        :class="{ 'loading-btn': isLoading }"
      >
        Add item
      </button>
    </div>

    <div v-if="showMessage" class="message">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
  .bottom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .createItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    gap: 2rem;
  }

  .form {
    width: 50%;
  }

  .back {
    background-color: #7275d5;
  }
  .back:hover {
    background-color: #898dfe;
  }

  .categoryDiv {
    display: flex;
    flex-direction: row;
    margin: 0.4rem;
    width: 50%;
    align-items: center;
  }

  .categoryLabel {
    width: 100%;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: transparent;
    box-shadow: none;
  }

  .checkbox {
    margin: 0;
  }

  .message {
    color: var(--color-success);
  }
</style>
