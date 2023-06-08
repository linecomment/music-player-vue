import api from '@/api';

export function login(account, password) {
    return api({
        url: '/user/login',
        method: 'post',
        data: {
            account: account,
            password: password
        }
    })
}

export function register(account, verfyCode, password) {
    return api({
        url: '/user/register',
        method: 'post',
        data: {
            account: account,
            verfyCode: verfyCode,
            password: password
        }
    })
}

export function sendEmailCode(email) {
    return api({
        url: `/mail/sendEmail?email=${email}`,
        method: 'post',
    })
}

export function getFavorite(id) {
    return api({
        url: '/user/like/' + id,
        method: 'get',
    })
}

// 头像上传
export function upload(file, userId) {
    console.log(file.file,'file')
    return api({
        url: '/user/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: {
            file:file.file,
            userId:userId
        }
    })
}

// 获取用户信息
export function getUserInfo(userId){
    return api({
        url:'/user/'+ userId,
        method:'get'
    })
}

// 修改用户信息
export function updateUserInfo(data){
    return api({
        url:'/user/update',
        method:'post',
        data:data
    })
}


