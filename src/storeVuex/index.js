import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
    state: {
        postDataPost: { userId: '', title: '', body: '' },
        postDataPut: { userId: '', title: '', body: '' },
        fetchedPosts: [],
    },
    getters: {
        getFetchedPosts: state => state.fetchedPosts
    },
    mutations: {
        setFetchedPosts: (state, posts) => {
            state.fetchedPosts = posts;
        }
    },
    actions: {
        post: context => {
            axios.post('https://jsonplaceholder.typicode.com/posts', context.state.postDataPost)
                .then(response => console.log(response))
        },
        get: ({ commit }) => {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    const dataObject = response.data[0]
                    commit('setFetchedPosts', [dataObject])
                    console.log(response)
                })
        },
        put: ({ state }) => {
            const postDataPut = state.postDataPut
            axios.put('https://jsonplaceholder.typicode.com/posts/1', postDataPut)
                .then(response => console.log(response))
                .catch(error => console.error(error))
        },
        deletePost: ({ state }) => {
            const postDataPost = state.postDataPost
            const postDataPut = state.postDataPut
            axios.delete('https://jsonplaceholder.typicode.com/posts/1', { data: { postDataPost, postDataPut } })
                .then(response => console.log(response))
        }
    }
})
export default store