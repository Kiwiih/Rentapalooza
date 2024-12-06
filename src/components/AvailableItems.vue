<script setup>
import { useItems } from "@/shared/useItems.js";
import { onBeforeMount } from 'vue'

import ItemListCard from "./ItemListCard.vue";

// Hämta variabel och funktion från useItems
const { items, getItems } = useItems();



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
            "isAvailable": true,
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
</script>

<template>



    <div>
        <!-- Rendera hela items -->
        <!-- TODO: rendera bara om avalible är true -->
        <hr>
        <ul>
            <li v-for="(item) in items" :key="item.id">

                <ItemListCard :item="item"></ItemListCard>
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
