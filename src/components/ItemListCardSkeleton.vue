<script setup>

</script>

<template>

    <article>
        <div class="img-container">
        </div>

        <div class="card-content-container">
            <div class="title"></div>
            <div class="p1"></div>
            <div class="p2"></div>
            <div class="button-container"></div>
        </div>
    </article>

</template>

<style scoped>
article {
    --skeleton-color: hsla(0, 0%, 50%, 0.2);

    display: flex;
    gap: 1rem;
    margin: 1rem 0rem;

    div {
        margin: 0;
        padding: 0;
        border-radius: 0.25rem;
    }

    .img-container {
        background-color: var(--skeleton-color);
        flex-shrink: 0;
        align-self: start;
        width: clamp(2rem, 20%, 7rem);
        aspect-ratio: 1 / 1;

    }

    .card-content-container {
        flex-direction: column;
        flex-grow: 1;

        .title {
            height: 2rem;
            width: 70%;
            margin-bottom: 1rem;
            background-color: var(--skeleton-color);
        }

        .p1 {
            height: 1rem;
            margin-bottom: 0.5rem;

            width: 75%;
            background-color: var(--skeleton-color);

        }

        .p2 {
            height: 1rem;
            width: 50%;
            background-color: var(--skeleton-color);

        }

        .button-container {
            text-align: right;
            height: 2rem;
            width: 20%;
            margin-left: auto;
            background-color: var(--skeleton-color);
        }
    }

}
</style>
