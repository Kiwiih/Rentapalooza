<script setup>
import { useItems } from "@/shared/useItems.js";
import { onBeforeMount, defineProps, computed, ref, watch } from 'vue'

import ItemListCard from "./ItemListCard.vue";
import ItemListCardSkeleton from "./ItemListCardSkeleton.vue";

// Hämta variabel och funktion från useItems
const { items, getItems } = useItems();

const props = defineProps(["selectedFilter"])

//variabel som reglerar om meddelande om INGA ITEMS ska visas:
const showNoItemsMessage = ref(false)

// Laddar in items från databasen:
// getItems()

// OBBSS TODO: Ta bort
// OBS!!!! Hela den här asynkrona funktionen är bara för att testa med egen data utöver det som fins i databasen
onBeforeMount(async () => {
    // Vänta på att hämta data från API
    await getItems();

    /// ---  DUMMYITEMS START--- ///
    // Pusha in nya items när data är hämtad
    items.value.push(
        {
            "id": "2",
            "title": "GoPro HERO 11 Black",
            "description": "En actionkamera för att fånga äventyr och sportaktiviteter i hög kvalitet.",
            "price": 200,
            "category": ["Elektronik", "Kameror", "Sport"],
            "images": [
                "https://picsum.photos/id/45/200/300",
                "https://picsum.photos/id/112/200/300",
                "https://picsum.photos/id/89/200/300"
            ],
            "isAvailable": false,
            "ownerId": "u11223abc",
            "currentRentalId": null,
            "renterId": null
        },
        {
            "id": "3",
            "title": "Canon EOS R5 Kamera DETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXT",
            "description": "En professionell spegellös kamera perfekt för foto- och videoprojekt. DETTA ÄR EN JÄTTELÅNG TEXT DETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXTDETTA ÄR EN JÄTTELÅNG TEXT",
            "price": 500,
            "category": ["Elektronik", "Kameror"],
            "images": [
                "https://picsum.photos/id/56/200/300",
                "https://picsum.photos/id/78/200/300",
                "https://picsum.photos/id/103/200/300"
            ],
            "isAvailable": true,
            "ownerId": "u56789abc",
            "currentRentalId": null,
            "renterId": null
        },
        {
            "id": "4",
            "title": "Mountainbike Specialized Rockhopper",
            "description": "En robust mountainbike som passar för tuff terräng och långa cykelturer.",
            "price": 300,
            "category": ["Sport & Fritid", "Cyklar"],
            "images": [
                "https://picsum.photos/id/91/200/300",
                "https://picsum.photos/id/133/200/300",
                "https://picsum.photos/id/150/200/300"
            ],
            "isAvailable": false,
            "ownerId": "u98765xyz",
            "currentRentalId": "r12345",
            "renterId": "u67890ghi"
        },
        {
            "id": "5",
            "title": "Makita Slagborrmaskin",
            "description": "En kraftfull slagborrmaskin för hemmafixare och byggprojekt.",
            "price": 150,
            "category": ["Verktyg", "Bygg & Renovering"],
            "images": [
                "https://picsum.photos/id/201/200/300",
                "https://picsum.photos/id/199/200/300",
                "https://picsum.photos/id/170/200/300"
            ],
            "isAvailable": true,
            "ownerId": "u45678klm",
            "currentRentalId": null,
            "renterId": null
        },
        {
            "id": "6",
            "title": "Festtält 5x10 meter",
            "description": "Ett rymligt tält perfekt för bröllop, fester och evenemang.",
            "price": 1000,
            "category": ["Event", "Uthyrning"],
            "images": [
                "https://picsum.photos/id/88/200/300",
                "https://picsum.photos/id/120/200/300",
                "https://picsum.photos/id/145/200/300"
            ],
            "isAvailable": false,
            "ownerId": "u12345def",
            "currentRentalId": "r67890",
            "renterId": "u23456nop"
        },
        {
            "id": "7",
            "title": "Sony PlayStation 5",
            "description": "Spelkonsolen som ger dig nästa generations gamingupplevelse.",
            "price": 250,
            "category": ["Elektronik", "Gaming"],
            "images": [
                "https://picsum.photos/id/34/200/300",
                "https://picsum.photos/id/215/200/300",
                "https://picsum.photos/id/275/200/300"
            ],
            "isAvailable": true,
            "ownerId": "u34567qrs",
            "currentRentalId": null,
            "renterId": null
        }
    );
    /// ---  DUMMYITEMS END--- ///

});


// Filtrera items baserat på selectedFilter
const filteredItems = computed(() => {
    if (props.selectedFilter === 'available') {
        return items.value.filter(item => item.isAvailable);
    } else if (props.selectedFilter === 'unavailable') {
        return items.value.filter(item => !item.isAvailable);
    } else {
        return items.value;
    }
});

//lyssnar på filteritems.... 
// om de gått 5 sekunder efter förändring och det fortfarade inte finns något i arrayen så sätts showNoItemsMessage till true. så jag kan visa det i domen :) 
watch(filteredItems, (newFilteredItems) => {
    //direkt vid förändring ska meddelandet döljas...
    showNoItemsMessage.value = false;
    //..sen börjar timern....
    if (newFilteredItems.length === 0) {
        setTimeout(() => {
            showNoItemsMessage.value = true;
        }, 5000);
    }
});

</script>

<template>
    <!-- jsut  en bekräftande utskrift :)  -->
    <!-- {{ props.selectedFilter }} -->

    <div>
        <!-- Rendera Items -->
        <hr>
        <ul v-if="showNoItemsMessage === true">
            <li>
                <br>
                <h3>Nothing to see here! 😅</h3>
            </li>
        </ul>
        <ul v-else-if="filteredItems && filteredItems.length > 0">
            <li v-for="(item) in filteredItems" :key="item.id">

                <ItemListCard :item="item"></ItemListCard>
                <hr>
            </li>
        </ul>
        <ul v-else>
            loading...
            <li v-for="index in 3" :key="index">
                <ItemListCardSkeleton />
                <hr>
            </li>
        </ul>


    </div>


</template>

<style scoped>
hr {
    border: none;
    border-top: 1px solid var(--color-border);
    height: 1px;
    background: none;
}


ul {
    list-style-type: none;
}
</style>
