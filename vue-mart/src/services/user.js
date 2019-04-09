export default {
    login(user) {
        return axios.get('/api/login', { params: user });
    },
    getuserInfo() {
        return axios.get('/api/userinfo')
    }
}