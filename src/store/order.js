import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useOrderStore = defineStore('order', () => {
    const lastOrderId = ref(null);
    const setLastOrderId = (orderId) => {   lastOrderId.value = orderId; }
    return { lastOrderId, setLastOrderId };
});