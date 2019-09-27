import request from 'utils/http'


const Login = (data) => {
    return request({
        url: 'help/bottom',
        method: 'get',
        params: data
    })
}

export {
    Login
}