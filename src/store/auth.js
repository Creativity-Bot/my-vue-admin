import { defineStore } from "pinia";
import { ref } from "vue";
export const useAuthStore = defineStore("auth", ()=>{
    const token = ref(null);
    const userName = ref('');
    const roles = ref([]);
    const menu = ref([]);
    return { token, userName, roles, menu };
});