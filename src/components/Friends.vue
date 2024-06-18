<template>
    <div>
        <Header_temp />
        <h1>Friends Page</h1>
        <div class="search-bar">
            <input type="text" v-model="searchQuery" @input="handleInput" placeholder="Search...">
            <button v-on:click="search">Search</button>
        </div>
        <div v-if="searchResults.length > 0">
            <h2>Search Results:</h2>
            <div v-for="result in searchResults" :key="result.id">
                <p>Name: {{ result.name }}</p>
                <p>ID: {{ result.id }}</p>
                <button v-if="isFriend == false" v-on:click="addFriend(result.id, result.name)">Add friend</button>
                <p v-if="isFriend == true">Already friends with this user</p>
            </div>
        </div>
        <div v-else-if="searchQuery !== ''">
            <p>No results found.</p>
        </div>
    </div>
</template>

<script>
import Header_temp from './Header.vue'
import axios from 'axios'

export default {
    name: 'AddFriends',
    components: {
        Header_temp
    },
    mounted() {
        let user = localStorage.getItem('User-info');
        if (!user) {
            this.$router.push('/signup');
        } else {
            // Parse user object from local storage
            const userInfo = JSON.parse(user);
            // Set userId in component data
            this.userId = userInfo.id;
        }
    },
    data() {
        return {
            searchQuery: '',
            searchResults: [],
            userId: null, // Initialize userId to null
            isFriend: false,
        };
    },
    methods: {
        handleInput() {
            // Optionally, you can perform some real-time filtering or validation here
        },
        async search() {
            this.isFriend = false; // Reset isFriend to false before performing a new search

            try {
                const result = await axios.get(`http://localhost:3000/posts`, {
                    params: {
                        id: this.searchQuery,
                    }
                });

                if (result.status === 200 && result.data.length > 0 && this.searchQuery !== '' && this.searchQuery != this.userId) {
                    this.searchResults = result.data; // Update search results
                } else {
                    console.warn('No results found.');
                    this.searchResults = []; // Clear previous search results
                }
            } catch (error) {
                console.error('An error occurred while searching:', error);
            }
        },

        async addFriend(friendId) {
            try {
                const friendCheck = await axios.get(`http://localhost:3000/friends?user_id=${this.userId}&friend_id=${friendId}`, {
                }); //`http://localhost:3000/posts?email=${this.email}&password=${this.password}`

                if (friendCheck.status === 200 && friendCheck.data.length > 0) {
                    this.isFriend = true;
                    this.searchQuery == ''
                    console.log("This person is already your friend.");
                    // Optionally, you can notify the user that the person is already a friend.
                } else {
                    const friendsData = {
                        user_id: this.userId,
                        friend_id: friendId,
                    };

                    let adding = await axios.post('http://localhost:3000/friends', friendsData);
                    if (adding.status === 200) {
                        localStorage.setItem('User-info', JSON.stringify(adding.data[0]));
                        this.searchQuery == ''
                    }
                }
            } catch (error) {
                console.error('An error occurred while adding friend:', error);
            }
        }
    }
}
</script>

<style src="./css/Friends.css"></style>
