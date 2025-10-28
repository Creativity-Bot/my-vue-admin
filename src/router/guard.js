import router from "@/router";
import { useAuthStore } from "@/store/auth";
import { useOrderStore } from "@/store/order";
import { storeToRefs } from "pinia";

router.beforeEach((to, from)=>{
    const authStore = useAuthStore();
    const orderStore = useOrderStore();
    if(authStore.token){
        // logged in
        if(to.path === '/login'){
            return { path: '/' };
        }
        if(to.meta?.roles && !to.meta.roles.some(role => authStore.roles.includes(role))){
            return { path: '/' };
        }
        // if the current route is /operations/detail and there is no orderId in the query, redirect to the detail page with the last orderId
        if(to.path === '/operations/detail' && !to.query.orderId){
            const { lastOrderId } = storeToRefs(orderStore);
            return { path: '/operations/detail', query: {orderId: lastOrderId.value}};
        }
    }else{
        // not logged in
        if(to.path !== '/login'){
            return { path: '/login' };
        }
    }
});