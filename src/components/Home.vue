<template>
  <Header_temp />
  <h2>Today's workout</h2>
    <div class="daily-div-container">
    <div v-for="(exercise, index) in dailyworkout.exercises" :key="index" class="daily-div">
      <div>{{ exercise.exercisename }}</div>
      <div>{{ exercise.setsnumber }} sets</div>
      <div>{{ exercise.repsnumber }} reps</div>
      <div>{{ exercise.weight }} Kgs</div>
    </div>
  </div>

  <!-- <router-link to="/signup">Go to Sign Up</router-link> -->
</template>

<script>
import Header_temp from './Header.vue'
import axios from 'axios'

export default {
  data() {
    return {
      show: false,
      userId: '',
      today: '',
      dailyworkout: {
        exercises: []
      }
    }
  },
  name: 'Home_1',
  components: {
    Header_temp
  },
  async mounted() {
    let user = localStorage.getItem('User-info');
    if (!user) {
      this.$router.push('/signup');
    } else {
      // Parse user object from local storage
      const userInfo = JSON.parse(user);
      // Set userId in component data
      this.userId = userInfo.id;
    }

    const today = new Date();
    this.today = today.toLocaleDateString(); // This will format the date as per the user's locale

    try {
      const response = await axios.get(`https://backendtest-g6xy.onrender.com/workouts`, {
        params: {
          userid: this.userId,
          date: this.today
        }
      });

      console.log(response.data); // Log the response data

      if (response.status === 200 && response.data.length > 0) {
        console.log("Found daily workout");
        // Use Object.assign to ensure reactivity
        Object.assign(this.dailyworkout, response.data[0]);
        this.show = true;
      }
    } catch (error) {
      console.error("Error fetching daily workout:", error);
    }
  }
}
</script>


<style src="./css/Home.css"></style>
