import us from '@/services/user'

export default {
    state: {
        isLogin: localStorage.getItem('token') ? true : false
    },
    mutations: {
        setLoginState(state, b) {
            state.isLogin = b;
        }
    },
    actions: {
        login({ commit }, user) {
            return us.login(user).then(res => {
                const { code, token } = res.data;
                if (code == 1) {
                    commit("setLoginState", true);
                    localStorage.setItem("token", token);
                }
                return code;
            })
        },
        logout({ commit }) {
            localStorage.removeItem("token");
            commit("setLoginState", false);
        }
    }
}