import { defineStore } from "pinia";
import { ref } from "vue";
import { sendLogin } from '@/api/login';
export const useAuthStore = defineStore("auth", ()=>{
    const token = ref(null);
    const userName = ref('');
    const roles = ref([]);
    const menu = ref([]);
    const login = async (data) => {
        try{
            const res = await sendLogin(data);
            if(res.data.code === 200){
                let data = res.data.data;
                token.value = data.token;
                userName.value = data.user.username;
                roles.value = data.user.roles;
                menu.value = data.menus;
            }else{
                console.log(res.data.message);
            }
        }catch(error){
            console.log(error);
        }
        
        
    }
    return { token, userName, roles, menu, login };
});