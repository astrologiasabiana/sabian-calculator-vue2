<template>
  <nav id="calculator_nav">
    <div class="title sp-none">{{ $t('common.left_nav.calculators') }}</div>
    <div id="calculator_nav_links">
      <router-link v-for="(c, i) in calculators.find_yourself.list" :key="i" :to="{name: c.url, query: $route.query }">{{ $t('calculator.menu.find_yourself.list.'+i+'.title') }}</router-link>
      <router-link v-for="(c, i) in calculators.forecast.list" :key="i" :to="{name: c.url, query: $route.query }">{{ $t('calculator.menu.forecast.list.'+i+'.title') }}</router-link>
      <router-link v-for="(c, i) in calculators.relationship.list" :key="i" :to="{name: c.url, query: $route.query }">{{ $t('calculator.menu.relationship.list.'+i+'.title') }}</router-link>
    </div>
  </nav>
</template>

<script>
import calculators from '@/assets/yml/calculator.yml'
export default {
  name: 'CalculatorNav',
  data(){
    return {
      calculators: calculators
    }
  }
}
</script>

