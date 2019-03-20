import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 1,
        msg: '学习vuex',
        lists: [
            { id: 1, msg: "hi1" },
            { id: 2, msg: "hi2" },
            { id: 3, msg: "hi3" },
            { id: 4, msg: "hi4" },
            { id: 5, msg: "hi5" }
        ],
        myProp: {

        }
    },
    getters: {
        lists(state) {
            return state.lists
        },
        item: (state) => (i) => {
            return state.lists[i]
        },
        myProp: (state) => {
            return state.myProp;
        }
    },
    mutations: {
        addNum(state, num) {
            state.count += num;
        },
        //在mutations中做异步，在stata中的数据可能和视图中的数值不同,payload为载荷
        addCountByasync(state, payload) {
            setTimeout(() => {
                state.count += payload.num;
            }, 1000)
        },
        addCountByasync2(state, num) {
            state.count += num;
        },
        changeStateProp(state, name) {
            // state.myProp.name = name;
            //手动
            Vue.set(state.myProp, 'name', name)
        }
    },
    //Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作
    actions: {
        addCountByasync({ commit }, payload) {
            setTimeout(() => {
                commit('addCountByasync2', payload.num)
            }, 1000)
        },
        changeStateProp({ commit }, payload) {
            commit('changeStateProp', payload.name);
        }
    }
})