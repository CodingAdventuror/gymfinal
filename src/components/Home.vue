<template>
  <Header_temp />
    <h1>Home Page</h1>
    <!-- <router-link to="/signup">Go to Sign Up</router-link> -->
</template>

<script>
    import Header_temp from './Header.vue'
    export default{
      data() {
    return {
      userId: '',
    }
  },
        name : 'Home_1',
        components:{
          Header_temp
        },
        mounted()
    {
        let user = localStorage.getItem('User-info');
    if (!user) {
      this.$router.push('/signup');
    } else {
      // Parse user object from local storage
      const userInfo = JSON.parse(user);
      // Set userId in component data
      this.userId = userInfo.id;
    }
    }
    }
</script>
<style src="./css/Home.css">
</style>