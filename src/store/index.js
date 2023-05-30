import { createStore } from 'vuex'
import { login, register } from '@/api/user';
import { setToken, getToken, removeToken } from '@/api/token';

const store = createStore({
    state: {
        token: getToken(),
        audio: new Audio(),
        songList: [
            {
                id: "1",
                musicName: "忘情水1",
                coverUrl: "/music/cover/ldh_忘情水.jpg",
                author: "刘德华1",
                audioUrl: "/music/李翔宇-起风了.mp3",
                like:false,
            },
            {
                id: "2",
                musicName: "忘情水2",
                coverUrl: "/music/cover/ldh_忘情水.jpg",
                author: "刘德华2",
                audioUrl: "/music/李翔宇-起风了.mp3",
                like:true,

            },
        ],
        favoriteList: [
            {
                id: "1",
                musicName: "忘情水1",
                coverUrl: "/music/cover/ldh_忘情水.jpg",
                author: "刘德华1",
                audioUrl: "/music/李翔宇-起风了.mp3",
                like:true,

            },
            {
                id: "2",
                musicName: "忘情水2",
                coverUrl: "/music/cover/ldh_忘情水.jpg",
                author: "刘德华2",
                audioUrl: "/music/李翔宇-起风了.mp3",
                like:false,

            }
        ]

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_AUDIO(state, audio) {
            state.audio = audio;
        },
        SET_SONG_LIST(state, songList) {
            state.songList = songList
        },
        SET_FAVORITE_LIST(state, favoriteList) {
            state.favoriteList = favoriteList
        }
    },
    actions: {
        async login({ commit }, loginParam) {
            await login(loginParam.account, loginParam.password).then((res) => {
                console.log(res)
                // 登入成功
                if (res.code === 20000) {
                    commit('SET_TOKEN', res.data)
                    setToken(res.data)
                }
            }).catch(error => {
                console.log('登入失败')
            })
        },
        async register({ commit }, registerParam) {
            await register(registerParam.account, registerParam.verfyCode, registerParam.password).then((res) => {
                // 注册成功
                if (res.code === 20000) {
                    commit('SET_TOKEN', res.data)
                    setToken(res.data)
                }
            }).catch(error => {
                console.log('注册失败')
            })
        },
        setAudio({ commit }, audio) {
            commit('SET_AUDIO', audio);
        },
        setSongList({ commit }, songList) {
            commit('SET_SONG_LIST', songList)
        },
        setFavoriteList({ commit }, favoriteList) {
            commit('SET_FAVORITE_LIST', favoriteList)
        }
    }
})

export default store