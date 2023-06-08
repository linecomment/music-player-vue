import api from '@/api';

// 获取歌曲列表
export function getSongList(pageParam) {
    return api({
        url: '/song/list',
        method: 'get',
        params: {
            currentIndex: pageParam.currentIndex,
            limit: pageParam.limit,
            userId: pageParam.userId
        },

    })
}
// 获取流派
export function getGenreList() {
    return api({
        url: '/song/genre',
        method: 'get',
    })
}

// 根据流派获取歌曲
export function getSongByGenre(genreId) {
    return api({
        url: "/song/list/" + `${genreId}`,
        method: 'get'
    })
}
// 歌曲排行排行
export function getRankSongList(rankType) {
    return api({
        url: "/song/rank/" + `${rankType}`,
        method: 'get'
    })
}

// 收藏/取消收藏
export function modifySongLike(userId,songId){
    return api({
        url:'/song/favorite',
        method:'post',
        data:{
            userId:userId,
            songId:songId
        }
    })
}