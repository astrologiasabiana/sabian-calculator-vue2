import Vue from 'vue'
import VueRouter from 'vue-router'
//import CommonHeader from '@/components/CommonHeader.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: window.lang_prefix + "/",
    name: 'home',
    component:() => import('@/views/Home.vue'),
  },
  {
    path: window.lang_prefix + '/calculator',
    component:() => import('@/views/Calculator.vue'),
    children: [
      {
        name: 'calculator',
        path: '/',
        component:() => import('@/views/CalculatorSimple.vue')
      },
      {
        name: 'calculator_midpoint',
        path: 'midpoint',
        component:() => import('@/views/CalculatorMidpoint.vue')
      },
      {
        name: 'calculator_midpoint_planet',
        path: 'midpoint/:planet',
        component:() => import('@/views/CalculatorMidpoint.vue')
      },
      {
        name: 'calculator_harmonics',
        path: 'harmonics',
        component:() => import('@/views/CalculatorHarmonics.vue')
      },
      {
        name: 'calculator_progression',
        path: 'progression',
        component:() => import('@/views/CalculatorProgression.vue')
      },
      {
        name: 'calculator_solar_arc',
        path: 'solar_arc',
        component:() => import('@/views/CalculatorSolarArc.vue')
      },
      {
        name: 'calculator_composite',
        path: 'composite',
        component:() => import('@/views/CalculatorComposite.vue')
      },
      {
        name: 'calculator_setting',
        path: 'setting',
        component:() => import('@/views/CalculatorSetting.vue')
      },
    ]
  },
  {
    path: window.lang_prefix + '/symbols',
    component:() => import('@/views/Symbols.vue'),
    children: [
      {
        path:  "/",
        name: 'symbols',
        component:() => import('@/views/SymbolsSigns.vue'),
      },
      {
        path: ":sign",
        name: 'symbols_sign',
        component:() => import('@/views/SymbolsDegrees.vue'),
      },
      {
        path: ":sign/:degree",
        name: 'symbols_degree',
        component:() => import('@/views/SymbolsSignDegree.vue'),
      },
      {
        path: ":sign/:degree/:minute",
        name: 'symbols_degree_minute',
        component:() => import('@/views/SymbolsSignDegree.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
