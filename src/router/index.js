import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/login.vue'
import profile from '../views/profile.vue'
import EditProfile from '../views/EditProfile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    },
    {
      path: '/edit',
      name: 'edit profile',
      component: EditProfile,
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(),
        resolve(user)
      },
      reject
    )
  })
}


router.beforeEach(async(to, from, next) =>{
  const isAuthenticated = await getCurrentUser()
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth)

  if (!isAuthenticated && isAuthRequired) next({ name: 'login'})

  else next()
})


export default router
