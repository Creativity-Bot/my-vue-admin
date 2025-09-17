<template>
    <h1>Not Found {{ wrongPath }}</h1>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const wrongPath = computed(() => route.params.pathMatch);
</script>
<style scoped>
</style>