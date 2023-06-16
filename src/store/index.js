import { createStore } from 'vuex'
import { login, register,logout } from '@/api/user';
import { setToken, getToken, removeToken } from '@/api/token';
import {getSongList,getGenreList} from '@/api/song'
import {showToast} from 'vant'

const store = createStore({
    state: {
        token: '',
        userInfo:{},
        audio: new Audio(),
        songList: [
        ],
        genreList:[],

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
       
        SET_GENRE_LIST(state,genreList){
            state.genreList = genreList
        },
        // SET_FAVORITE_LIST(state, favoriteList) {
        //     state.favoriteList = favoriteList
        // },
    },
    actions: {
        async login({ commit }, loginParam) {
            await login(loginParam.account, loginParam.password).then((res) => {
                // 登入成功
                if (res.code === 20000) {
                    commit('SET_TOKEN', res.data.token)
                    setToken(res.data.token)
                    commit('SET_USER_INFO',res.data)
                    // window.location.href='/'
                    showToast('登入成功')
                }
            }).catch(error => {
                showToast('登入失败')
            })
        },
        async register({ commit }, registerParam) {
            await register(registerParam.account, registerParam.verfyCode, registerParam.password).then((res) => {
                // 注册成功
                if (res.code === 20000) {
                    commit('SET_TOKEN', res.data)
                    setToken(res.data)
                    showToast('登入失败')
                }
            }).catch(error => {
                showToast('注册失败')
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
        async getGenreList({commit}){
            getGenreList().then(res=>{
                commit('SET_GENRE_LIST',res.data)
            })
        },
        async logout({commit},userId){
            console.log(userId)
            await logout(userId).then(res=>{
                if(res.code === 20000){
                    commit('SET_TOKEN','')
                    commit('SET_SONG_LIST',null)
                    commit('SET_USER_INFO',null)
                    removeToken()
                    showToast('登出成功')
                }
            }).catch(error=>{
                showToast('登出失败')
            })
        }
        ,
        setAudio({ commit }, audio) {
            commit('SET_AUDIO', audio);
        },
        setSongList({ commit }, songList) {
            commit('SET_SONG_LIST', songList)
        },
        // setFavoriteList({ commit }, favoriteList) {
        //     commit('SET_FAVORITE_LIST', favoriteList)
        // }
    }
})

export default store