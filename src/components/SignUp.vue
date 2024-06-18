<template>
  <!-- npx json-server db.json lal json serv
        npm run serve for project serve
        _____________________

        New :
        npm run json-server
        npm run build
        npm start
        -->
  <div>
    <router-link to="/">Go to home</router-link>
    <div v-if="StepCount === 1" class="register-s" :class="{ 'register-s2': canSignUp }">
      <div class="Steps">
        <p>Step {{ StepCount }} of 3</p>
      </div>
      <div class="Tit1">
        <p>Create your account</p>
      </div>
      <div class="input-wrapper">
        <label class="input-label-s"
          :class="{ 'active': isNameFocused, 'err': canSignUp && (isNameFocused == false) }">Name</label>
        <input type="text" v-model="name" @focus="handleNameFocus" @blur="handleNameBlur" class="name-i"
          :class="{ 'isValid': isNameFocused, 'notValid': canSignUp && (isNameFocused == false) }" />
      </div>
      <div class="input-wrapper">
        <label class="input-label-s"
          :class="{ 'active': isEmailFocused, 'err': canSignUp && ((isEmailFocused == false)||(isEmailValid == false)) }">Email</label>
        <input type="text" v-model="email" @focus="handleEmailFocus" @blur="handleEmailBlur" @input="handleEmailValidity" class="email-i"
          :class="{ 'isValid': isEmailFocused&&isEmailValid , 'notValid': canSignUp && ((isEmailFocused == false)||(isEmailValid == false))  }" />
      </div>
      <div class="login-t">
        <p class="login-redirect">
          Already have an account?
          <router-link class='login' to="/login">Log in</router-link>
        </p>
      </div>
      <div v-if="Err === 2" class='error-message'>
        <p>
          Incomplete credentials
        </p>
      </div>

      <button :class="{ 'active-button': !isEmpty&&isEmailValid }" @click="next" class="signup-b">Next</button>
    </div>


    <div v-if="StepCount === 2" class="register-s">
      <div class="Steps">
        <p>Step {{ StepCount }} of 3</p>
      </div>
      <div class="Tit1">
        <p>Create your account</p>
      </div>
      <div class="instructions">
        A code will be sent to confirm your email.
        <button class="email-API">Click here</button>
      </div>
      <div class="input-wrapper">
        <label class="input-label-s" :class="{ 'active': isCodeFocused }">Code --- ---</label>
        <input type="text" v-model="code" @focus="handleCodeFocus" @blur="handleCodeBlur" class="name-i" />
      </div>
      <div class="login-t">
        <p class="login-redirect">
          Already have an account?
          <router-link class='login' to="/login">Log in</router-link>
        </p>
      </div>

      <button :class="{ 'active-button': !isEmpty2 }" @click="next2" class="signup-b2">Next</button>
    </div>


    <div v-if="StepCount === 3" class="register-s">
      <div class="Steps">
        <p>Step {{ StepCount }} of 3</p>
      </div>
      <div class="Tit1">
        <p>Create your account</p>
      </div>
      <div class="instructions-3">
        Almost done. Enter your password now!
      </div>
      <div class="input-wrapper">
        <label class="input-label-s" :class="{ 'active': isPasswordFocused }">Password</label>
        <input type="text" v-model="password" @focus="handlePasswordFocus" @blur="handlePasswordBlur" class="name-i" />
      </div>
      <div class="login-t">
        <p class="login-redirect">
          Already have an account?
          <router-link class='login' to="/login">Log in</router-link>
        </p>
      </div>

      <button :class="{ 'active-button': !isEmpty3 }" @click="next3" class="signup-b2">Sign Up</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export default {
  name: 'SignUp',
  data() {
    return {
      StepCount: ref(1),
      Err: ref(0),
      name: '',
      email: '',
      code: '',
      password: '',
      isNameFocused: false,
      isEmailFocused: false,
      isEmailValid: false,
      isCodeFocused: false,
      isPasswordFocused: false,
      canSignUp: false,
      
    };
  },
  computed: {
    isEmpty() {
      return this.name === '' || this.email === '';
    },
    isEmpty2() {
      return this.code === '';
    },
    isEmpty3() {
      return this.password === '';
    },
  },
  methods: {
    handleEmailValidity() {

      if (emailPattern.test(this.email)) {
        this.isEmailValid = true;
      } else {
        this.isEmailValid = false;
      }
    },


    handleNameFocus() {
      this.isNameFocused = true;
    },
    handleNameBlur() {
      if (this.name === '') {
        this.isNameFocused = false;
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
    handleCodeFocus() {
      this.isCodeFocused = true;
    },
    handleCodeBlur() {
      if (this.code === '') {
        this.isCodeFocused = false;
      }
    },
    handlePasswordFocus() {
      this.isPasswordFocused = true;
    },
    handlePasswordBlur() {
      if (this.password === '') {
        this.isPasswordFocused = false;
      }
    },

    async next() {
      if (!this.isEmpty && this.isEmailValid) {
        this.StepCount++;
      }
      else {
        // Invalid email format
        this.canSignUp = true; // Show error state immediately
        await new Promise(resolve => {
            setTimeout(() => {
                this.canSignUp = false; // Hide error state after 3 seconds
                resolve();
            }, 3000);
        });
    }
    },
    async next2() {
      const correct = '123 456'
      try {
        if (this.code === correct) {
          this.StepCount++;
        }
      } catch (error) {
        console.error('Error in POST request:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    },
    async next3() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        let result = await axios.post('http://localhost:3001/posts', userData);

        console.log('Response status:', result.status);

        if (result.status === 201) {
          console.log('User created successfully:', result.data);
          localStorage.setItem('User-info', JSON.stringify(result.data));
          this.StepCount++;
          this.$router.push('/');
        } else {
          console.error('Unexpected status code:', result.status);
        }
      } catch (error) {
        console.error('Error in POST request:', error);
      }
    }
  },
  mounted() {
    let user = localStorage.getItem('User-info');
    if (user) {
      this.$router.push('/');
    }
  },
};
</script>

<style src="./css/SignUp.css"></style>