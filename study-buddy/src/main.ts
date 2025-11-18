import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import Profile from "./components/ProfileView.vue"
import Courses from "./components/CoursesView.vue"
import GroupView from './components/GroupView.vue'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from "pinia";
import GroupChatView from './components/GroupChatView.vue'
import LoginView from './components/LoginView.vue'


const pinia = createPinia();

const vuetify = createVuetify({ components, directives })

const myComponentRoutes = [
  {path: '/profile', component: Profile},
  {path: '/courses', component: Courses},
  { path: '/groups/:id', name: 'Group', component: GroupView, props: true },
  {path: '/group/:id', name: 'GroupChat', component: GroupChatView},
  {path: "/", name:'Login', component:LoginView}
];

const myRouter = createRouter({
  history: createWebHashHistory(),
  routes: myComponentRoutes,
})

createApp(App).use(myRouter)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
