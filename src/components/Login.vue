<template>
 <div class="login-box">
  <div class ="X">
    <button v-on:click="close1">X</button>
  </div>
        <div class="Tit2">
          <p>Log in to your account</p>
        </div>
        <div class="description">
          <p>Enter your login infos.</p>
        </div>
        <div class="input-wrapper-s">
          <label class="input-label2" :class="{ 'active2': isEmailFocused }">Email</label>
          <input type="text" v-model="email" @focus="handleEmailFocus" @blur="handleEmailBlur" class="name-i" />
        </div>
        <div class="input-wrapper-s">

            <label class="input-label2" :class="{ 'active2': isPasswordFocused }">Password</label>
            <input type="password" v-model="password" @focus="handlePasswordFocus" @blur="handlePasswordBlur" class="email-i" />
        </div>
        <button :class="{ 'active-button': !isEmpty }" v-on:click="login" class="login-b">Login</button>
      </div>
</template>

<script>
import axios from 'axios';

export default{
    name:'LogIn',
    data()
    {
      return {
        email:'',
        password:'',
        isEmailFocused: false,
        isPasswordFocused: false,
      }
    },
    computed:
    {
      isEmpty() 
      {
        return this.email === '' || this.password === '';
      }
    },
    methods:{
      handlePasswordFocus() {
      this.isPasswordFocused = true;
    },
    handlePasswordBlur() {
      if (this.password === '') {
        this.isPasswordFocused = false;
      }
    },
    handleEmailFocus() {
      this.isEmailFocused = true;
    },
    handleEmailBlur() {
      if (this.email === '') {
        this.isEmailFocused = false;
      }
    },
      async login()
      {
        if (!this.isEmpty)
        {
        let result = await axios.get(
          `http://localhost:3001/posts?email=${this.email}&password=${this.password}`
          );
          if(result.status==200 && result.data.length>0)
          {
            localStorage.setItem('User-info', JSON.stringify(result.data[0]));
            this.$router.push('/');
          }
        console.log(result)
      }
    },
      async close1()
    {
      this.$router.push('/');
    }
    },
    mounted() {
    let user = localStorage.getItem('Info1');
    if (user) {
      this.$router.push('/');
    }
  },
}
</script>
<style src="./css/Login.css"></style>