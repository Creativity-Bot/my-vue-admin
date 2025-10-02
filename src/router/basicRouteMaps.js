const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/layouts/DefaultLayout.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/Dashboard.vue')
            },
            {
                path: '/chargingstation/monitor',
                name: 'monitor',
                component: () => import('@/views/chargingstation/Monitor.vue')
            },
            {
                path: '/chargingstation/revenue',
                name: 'revenue',
                component: () => import('@/views/chargingstation/Revenue.vue')
            },
            {
                path: '/chargingstation/alert',
                name: 'alert',
                component: () => import('@/views/chargingstation/Alert.vue')
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('@/views/map/DigitalMap.vue')
            },
            {
                path: '/operations/orders',
                name: 'orders',
                component: () => import('@/views/operations/Orders.vue')
            },
            {
                path: '/operations/detail',
                name: 'detail',
                component: () => import('@/views/operations/Detail.vue')
            },
            {
                path: '/operations/fees',
                name: 'fees',
                component: () => import('@/views/operations/Fees.vue')
            },
            {
                path: '/alarm',
                name: 'alarm',
                component: () => import('@/views/alarm/Alarm.vue')
            },
            {
                path: '/membership',
                name: 'membership',
                component: () => import('@/views/membership/Membership.vue')
            },
            {
                path: '/quote',
                name: 'quote',
                component: () => import('@/views/quote/Quote.vue')
            },
            {
                path: '/system',
                name: 'system',
                component: () => import('@/views/system/System.vue')
            },
            {
                path: '/personal',
                name: 'personal',
                component: () => import('@/views/personal/Personal.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    },

]

export default routes