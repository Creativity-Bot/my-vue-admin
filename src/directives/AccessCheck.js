import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
export default{
    mounted(el, binding) {
        const authStore = useAuthStore();
        const { roles } = storeToRefs(authStore);
        if(!roles.value.includes(binding.value)) {
            el.style.display = 'none';
        }
    },
}