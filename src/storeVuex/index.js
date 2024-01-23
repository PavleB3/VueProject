import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
    state: {
        postData: { userId: '', title: '', body: ''},
        fetchedPosts: [],
    },
    getters:{
        getFetchedPosts: state => state.fetchedPosts 
    },
    mutations:{
        setFetchedPosts: (state, posts) => {
            state.fetchedPosts = posts;
        }
    },
    actions: {
        post: context => {
            axios.post('https://jsonplaceholder.typicode.com/posts', context.state.postData)
                .then(response => console.log(response))
        },
        get: ({ commit }) => {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response =>{
                    const dataObject = response.data[0]
                    commit('setFetchedPosts', [dataObject])
                    console.log(response)
                })
        },
        put: () =>{
            axios.put('https://jsonplaceholder.typicode.com/posts/1',{
                id: '1',
                userId: '1',
                title: 'Example',
                body: 'Example'
            })
            .then(response => console.log(response))
        },
        deletePost: () =>{
            axios.delete('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => console.log(response))
        }
    }
})
export default store