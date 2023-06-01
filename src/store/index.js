import { createStore } from 'vuex'
import { login, register } from '@/api/user';
import { setToken, getToken, removeToken } from '@/api/token';
import {getSongList} from '@/api/song'

const store = createStore({
    state: {
        token: getToken(),
        userInfo:{},
        audio: new Audio(),
        songList: [
        ]

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER_INFO(state,userInfo){
            state.userInfo = userInfo;
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
                console.log(res.data)
                // 登入成功
                if (res.code === 20000) {
                    commit('SET_TOKEN', res.data.token)
                    commit('SET_USER_INFO',res.data)
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
        async getSongList({commit},pageParam){
            await getSongList(pageParam).then((res) => {
                if(res.code === 20000){
                    commit('SET_SONG_LIST',res.data)
                }
            }).catch(error => {
                console.log('获取歌曲列表失败')
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