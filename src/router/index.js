import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/api/token'
import store from '@/store'



const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
      
        children: [
            {
                path: '',
                name: 'musicLibrary',
                component: () => import('@/views/MusicLibrary.vue'),
               
            },
            {
                path: 'rank',
                name: 'rankingList',
                component: () => import('@/views/RankingList.vue')
            },
            {
                path: 'song',
                name: 'songList',
                component: () => import('@/views/SongList.vue'),
               
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/Profile.vue'),
               
            },
            {
                path: 'genre/:id',
                name: 'genre',
                component: () => import('@/views/main/Genre.vue'),
               
            },
        ]
    },
    {
        path: '/music/:id',
        name: 'music',
        component: () => import('@/views/Music.vue'),

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    }


]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = store.state.token || ''
    if (to.path !== '/login' && !getToken() && !token) {
        next({ path: '/login' })
    } else {
        next()
    }
})


export default router