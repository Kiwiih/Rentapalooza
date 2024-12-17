<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const goToHome = () => {
    router.push("/");
  }

const goBack = () => {
    router.back();
}

</script>

<template>
    <div class="notFound">
            <h1>... Are you lost?</h1>
            <img src="../assets/images/map.png" alt="a picture of map" class="map lift">
            <div>
                <button @click="goBack">I want to go back!</button>
                <button @click="goToHome">Send me to Home page</button>
            </div>
    </div>
</template>

<style scoped>


.notFound {
width: 100%;
height: 30rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

.map {
    width: auto;
    height: 50%;
}

.lift {
  animation: lift .9s ease-in-out infinite alternate;
}

@keyframes lift {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

@media(max-width: 1400px) {
    .notFound {
    height: 40rem;
}
}
</style>
