import { useAuth } from '@/shared/useAuth'
import HomeView from '@/views/HomeView.vue'
import ItemDetailsView from '@/views/ItemDetailsView.vue'
import ItemsView from '@/views/ItemsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const ProfileView = () => import('@/views/ProfileView.vue')
const EditProfileView = () => import('@/views/EditProfileView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const CreateItemView = () => import('@/views/owner/CreateItemView.vue')
const EditItemView = () => import('@/views/owner/EditItemView.vue')
const MyItemsView = () => import('@/views/owner/MyItemsView.vue')
const RentalHistoryView = () => import('@/views/renter/RentalHistoryView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //* Public pages
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView
    },
    {
      path: '/items/:id',
      name: 'itemDetails',
      component: ItemDetailsView,
      props: true // För att skicka parametern som prop
    },

    {
      path: '/profile',
      children: [
        {
          path: ':id',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'edit/:id',
          name: 'editProfile',
          component: EditProfileView,
          meta: { requiresAuth: true }
        }
      ]
    },

    //* Auth routes
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        }
      ]
    },

    //* Owner routes
    {
      path: '/owner',
      children: [
        {
          path: 'create',
          name: 'createItem',
          component: CreateItemView
        },
        {
          path: 'edit/:id',
          name: 'editItem',
          component: EditItemView,
          props: true
        },
        {
          path: 'my-items',
          name: 'myItems',
          component: MyItemsView
        }
      ],
      meta: { requiresAuth: true }
    },

    //* Renter routes
    {
      path: '/renter',
      children: [
        {
          path: 'rental-history',
          name: 'rentalHistory',
          component: RentalHistoryView
        }
      ],
      meta: { requiresAuth: true }
    },

    //* 404 Page
    {
      path: '/404',
      name: 'notFoundPage',
      component: NotFoundView
    },
    // Catch-all route for 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// * ROUTE GUARD
// If user is authenticated then we show the good stuff
router.beforeEach((to, from, next) => {
  const { currentUser } = useAuth()

  if (!currentUser.value && to.meta.requiresAuth) {
    // If the user is not logged in and the route requires auth, redirect to login
    next({ name: 'login' })
  } else if (
    currentUser.value &&
    (to.name === 'login' || to.name === 'register')
  ) {
    // If the user is logged in and tries to access login or register, redirect to home
    next({ name: 'home' })
  } else {
    // In all other cases, proceed as normal
    next()
  }
})

export default router
