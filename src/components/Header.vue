<template>
    <div class="container">
        <a class='link' v-on:click="home" href="#">Home</a>
        <a v-on:click="addfriends" href="#">Add friends</a>
        <a v-on:click="addworkout" href="#">Add workout</a>
        <a v-on:click='logout' href="#">Logout</a>
        <div>Id:{{ userId }}</div>
    </div>
</template>
<script>
export default
    {

        name: 'Header_temp',
        data() {
            return {
                userId: ''
            }
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
        methods:
        {
            logout() {
                localStorage.clear();
                this.$router.push('/signup');
            },
            addfriends() {
                this.$router.push('/friends');
            },
            home() {
                this.$router.push('/')
            },
            addworkout() {
                this.$router.push('/workout')
            },
        },

    }
</script>
<style src="./css/Header.css"></style>