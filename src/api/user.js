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
        method:'post',
        data: {
            account: account,
            verfyCode:verfyCode,
            password: password
        }
    })
}

export function sendEmailCode(email){
    return api({
        url:`/mail/sendEmail?email=${email}`,
        method:'post',
    })
}