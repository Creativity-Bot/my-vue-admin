import router from "@/router";
import { useAuthStore } from "@/store/auth";
router.beforeEach((to, from)=>{
    const authStore = useAuthStore();
    if(authStore.token){
        // logged in
        if(to.path === '/login'){
            return { path: '/' };
        }
        if(to.meta?.roles && !to.meta.roles.some(role => authStore.roles.includes(role))){
            return { path: '/' };
        }
    }else{
        // not logged in
        if(to.path !== '/login'){
            return { path: '/login' };
        }
    }
});