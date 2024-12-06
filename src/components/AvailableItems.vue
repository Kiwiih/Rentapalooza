<script setup>
import { useItems } from "@/shared/useItems.js";
import { onMounted } from 'vue'


// Anropa `useItems` för att få tillgång till `items` och `getItems`
const { items, getItems } = useItems();


</script>

<template>
    <div>
        funktion hör: {{ getItems() }}
        <br>
        Variabel här: {{ items }}
    </div>

    <div>
        Detta är en lista med tillgängliga items
    </div>

    <div>
    </div>
</template>