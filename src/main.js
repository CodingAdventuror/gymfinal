import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home_1 from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import LogIn from './components/Login.vue';
import AddFriends from './components/Friends.vue';
import AddWorkout from './components/AddWorkout.vue';

const app = createApp(App);

const routes = 
[
  { path: '/', component: Home_1 },
  { path: '/signup', component: SignUp },
  { path: '/login', component: LogIn},
  { path: '/friends', component: AddFriends},
  { path: '/workout', component: AddWorkout}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.mount('#app');

