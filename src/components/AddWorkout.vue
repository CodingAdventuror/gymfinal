<template>
    <Header_temp />
      <h1>Add a workout</h1>
      <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a v-on:click="barbell" href="#">Barbell bench press</a>
    <a href="#">Machine chest fly</a>
    <a href="#">Tricep skull crusher</a>
  </div>
</div>
<div v-if:="isexercise === 1" class="workout-container">
    <p>Exercice Name</p>  <div class="sub-workout-container"> <p>Number of sets :</p> <input class="number-input">
    </div> <div class="sub-workout-container"><p>Number of Reps</p> <input class="number-input"></div>
</div>
<div class = "button-container">
  <button v-if:="isexercise === 1">Save Workout</button>
</div>
  </template>
  
  <script>
      import Header_temp from './Header.vue';
      import { ref } from 'vue';
      export default{
        data(){
        return{
          isexercise: ref(0),
        }},  
        name : 'AddWorkout',
          components:{
            Header_temp
          },
          mounted()
      {
        let user = localStorage.getItem('User-info');
        if (!user)
        {
          this.$router.push('/signup');
        }
      },
      methods:
      {
        barbell()
        {
          this.isexercise = 1;
        }
      }
      }
  </script>
  <style src="./css/AddWorkout.css">
  </style>