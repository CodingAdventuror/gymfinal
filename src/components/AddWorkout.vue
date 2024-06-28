<template>
  <Header_temp />
  <h1>Add a workout</h1>
  <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
      <a @click="exercisename = 'Barbell Bench Press'; isexercise = 1" href="#">Barbell bench press</a>
      <a @click="exercisename = 'Machine Chest Fly'; isexercise = 1" href="#">Machine Chest Fly</a>
      <a @click="exercisename = 'Dumbell Inclined Press'; isexercise = 1" href="#">Dumbell Inclined Press</a>
      
    </div>
  </div>
  <div v-if:="isexercise === 1" class="workout-container">
    <p>{{ exercisename }}</p>
    <div class="sub-workout-container">
      <p>Number of sets </p> <input class="number-input" v-model="setsnumber">
    </div>
    <div class="sub-workout-container">
      <p>Number of Reps </p> <input class="number-input" v-model="repsnumber">
    </div>
    <div class="sub-workout-container">
      <p>Weight </p> <input class="number-input" v-model="weight">
      <div>kgs</div>
    </div>
    <div><a v-on:click="addexercice" href="#">Add</a>
    </div>
  </div>



  <div v-for="(exercise, index) in workout.exercises" :key="index" class="dynamic-div">
    <div>{{ exercise.exercisename }}</div>
    <div>{{ exercise.setsnumber }} sets</div>
    <div>{{ exercise.repsnumber }} reps</div>
    <div>{{ exercise.weight }}Kgs</div>
  </div>


  <div class="button-container">
    <button v-on:click="submitworkout" v-if:="isworkout === 1">Save Workout</button>
  </div>
</template>

<script>
import Header_temp from './Header.vue';
import { ref } from 'vue';
import axios from 'axios';
export default {
  data() {
    return {
      userId: '',
      isexercise: ref(0),
      isworkout: ref(0),
      exercisename: '',
      setsnumber: '',
      repsnumber: '',
      weight: '',
      workout:
      {
        userid: this.userId,
        exercises: []

      },
      showdivs : []
    }
  },
  name: 'AddWorkout',
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
  methods:
  {
    addexercice() {
      const exercise =
      {
        exercisename: this.exercisename,
        weight: this.weight,
        setsnumber: this.setsnumber,
        repsnumber: this.repsnumber
      };
      this.workout.exercises.push(exercise);
      this.isexercise = 0;
      this.setsnumber = '';
      this.repsnumber = '';
      this.weight = '';
      this.isworkout = 1;
      this.showdivs.push({});
    },
    async submitworkout() {
      const response = await axios.post('https://backendtest-g6xy.onrender.com/workouts', this.workout);
      if (response.status === 201 || response.status === 200) {
        alert("succesfully posted workout");
      }
    }

  }
}
</script>
<style src="./css/AddWorkout.css"></style>