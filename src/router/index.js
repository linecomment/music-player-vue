﻿import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        children: [
            {
                path:'',
                name: 'musicLibrary',
                component: () => import('@/views/MusicLibrary.vue')
            },
            {
                path: 'rank',
                name: 'rankingList',
                component: () => import('@/views/RankingList.vue')
            },
            {
                path: 'song',
                name: 'songList',
                component: () => import('@/views/SongList.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/Profile.vue')
            },
        ]
    },
    {
        path:'/music/:id',
        name:'music',
        component:() => import('@/views/Music.vue')

    }

    
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router