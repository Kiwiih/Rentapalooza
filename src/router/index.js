import HomeView from '@/views/HomeView.vue'
import ItemDetailsView from '@/views/ItemDetailsView.vue'
import ItemsView from '@/views/ItemsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const CreateItemView = () => import('@/views/owner/CreateItemView.vue')
const EditItemView = () => import('@/views/owner/EditItemView.vue')
const MyItemsView = () => import('@/views/owner/MyItemsView.vue')
const MyRentalsView = () => import('@/views/renter/MyRentalsView.vue')
const RentalHistoryView = () => import('@/views/renter/RentalHistoryView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public pages
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

    // Auth routes
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

    // Owner routes
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
      ]
    },

    // Renter routes
    {
      path: '/renter',
      children: [
        {
          path: 'my-rentals',
          name: 'myRentals',
          component: MyRentalsView
        },
        {
          path: 'rental-history',
          name: 'rentalHistory',
          component: RentalHistoryView
        }
      ]
    },

    // 404 Page
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

export default router
