import api from '@/api';

// 获取歌曲列表
export function getSongList(pageParam) {
    return api({
        url: '/song/list',
        method: 'get',
        params: {
            currentIndex:pageParam.currentIndex,
            limit:pageParam.limit,
            userId:pageParam.userId
        },

    })
}
// 获取流派
export function getGenreList(){
    return api({
        url:'song/genre',
        method:'get',
    })
}