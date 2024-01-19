<template>
    <div id="wrapper">
        <h1 id="headerOne">Axios Post Example</h1>
        <div id="post">
            <div>
                <label for="userId">userId:</label>
                <input type="text" id="userId" v-model="postData.userId">
            </div>
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="postData.title">
            </div>
            <div>
                <label for="body">Body:</label>
                <input type="text" id="body" v-model="postData.body">
            </div>
            <button @click="post">Post</button>
        </div>
        <div id="get">
            <h1 id="headerTwo">Axios Get Example</h1>
            <label for="getButton" id="getLabel">Click here for Get request:</label>
            <button id="getButton" @click="getPosts">Get</button>
            <div v-if="getFetchedPosts.length>0" id="getPosts">
            <h2>Get posts:</h2>
            <ul>
                <li v-for="post in getFetchedPosts" :key="post">
                    <p>userId: {{ post.userId }}</p>
                    <p>id: {{ post.id }}</p>
                    <p>title: {{ post.title }}</p>
                </li>
            </ul>
            </div>
        </div>
        <h1>Axios Put Example</h1>
        <label for="putButton" id="putLabel">Click here for Put request:</label>
        <button id="putButton" @click="put">Put</button>
        <h1>Axios Delete Example</h1>
        <label for="deleteButton" id="deleteLabel">Click here for Delete request:</label>
        <button id="deleteButton" @click="deletePost">Delete</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'getFetchedPosts'
        ]),
        postData() {
            return this.$store.state.postData
        },
    },
    methods: {
        ...mapActions([
            'post',
            'get',
            'put',
            'deletePost'
        ]),
        getPosts(){
            this.get()
        }
    }
}
</script>
<style scoped>
#post {
    margin-left: 10px;
    height: 80px;
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

#post label {
    margin-right: 10px;
    margin-left: 5px;
}

#post button {
    background: rgba(24, 28, 32, 0.68);
    width: 100px;
    height: 20px;
    margin-top: 27px;
    border-radius: 5px;
    border: none;
}

#post button:hover {
    background: darkgray;
    border: none;
}
h1{
    margin-left: 10px;
    color: white;
}
#getLabel {
    margin-left: 10px;
    font-size: 17px;
}

#getButton {
    background: rgba(24, 28, 32, 0.68);
    margin-left: 10px;
    width: 100px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom:20px;
}

#getButton:hover {
    background: darkgrey;
}
#putButton{
    background: rgba(24, 28, 32, 0.68);
    margin-left: 10px;
    width: 100px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom:20px;
}
#putButton:hover{
    background:darkgrey;
}
#putLabel{
    margin-left:10px;
    font-size:17px;
}
h2{
    color:white;
    margin-left:10px;
}
p{
    font-size:15px;
}
#deleteButton{
    background: rgba(24, 28, 32, 0.68);
    margin-left: 10px;
    width: 100px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom:20px;
}
#deleteButton:hover{
    background:darkgrey;
}
#deleteLabel{
    margin-left:10px;
    font-size:17px;
}
</style>