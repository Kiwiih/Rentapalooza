<script setup>
  import { useItems } from '@/shared/useItems'
  import { useAuth } from '@/shared/useAuth'
  import { reactive } from 'vue'

  const { currentUser } = useAuth()

  const { items, updateItems } = useItems()

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
    inputData.id = generateId()
    console.log('New item:', inputData)

    const updatedItems = [...items.value, { ...inputData }]

    try {
      await updateItems(updatedItems)
      console.log('Item added successfully:', inputData)
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
        <label for="category" class="categoryLabel">{{ c }}</label>
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
    <button type="submit" @click="handleSubmit">Add item</button>
  </div>
</template>

<style scoped>
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
</style>
