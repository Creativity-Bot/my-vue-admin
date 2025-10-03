import { defineStore } from "pinia";
import { ref } from "vue";
import { sendLogin } from '@/api/login';
export const useAuthStore = defineStore("auth", ()=>{
    const token = ref(sessionStorage.getItem('token') || '');
    const userName = ref(sessionStorage.getItem('userName') || '');
    const roles = ref(sessionStorage.getItem('roles') ? JSON.parse(sessionStorage.getItem('roles')) : []);
    const menu = ref(sessionStorage.getItem('menu') ? JSON.parse(sessionStorage.getItem('menu')) : []);
    const avatar = ref(sessionStorage.getItem('avatar') || '');

    const login = async (data) => {
        try{
            const res = await sendLogin(data);
            let {data: {token: tokenValue, user:{username, roles, avatar: avatarValue}, menus}} = res;
            token.value = tokenValue;
            userName.value = username;
            roles.value = roles;
            menu.value = menus;
            avatar.value = avatarValue;
            // save just in case of page refresh
            sessionStorage.setItem('token', tokenValue);
            sessionStorage.setItem('userName', username);
            sessionStorage.setItem('roles', JSON.stringify(roles));
            sessionStorage.setItem('menu', JSON.stringify(menus));
            sessionStorage.setItem('avatar', avatarValue);
        }catch(error){
            console.log(error);
        }
    }

    const logout = () => {
        token.value = '';
        userName.value = '';
        roles.value = [];
        menu.value = [];
        avatar.value = '';
        sessionStorage.clear();
    }

    return { token, userName, roles, menu, login, avatar, logout };
});