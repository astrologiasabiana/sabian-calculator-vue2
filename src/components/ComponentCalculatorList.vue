<template>
  <div id="calculator_list">
    <div v-for="(genre, i) in calculator_list" :key="i">
      <h2>{{ $t('calculator.menu.'+i+'.title') }}</h2>
      <div class="item" v-for="(calc, ii) in genre.list" :key="ii">
        <router-link :to="{name: calc.url, query: $route.query}">
          <h3>{{ $t('calculator.menu.'+i+'.list.'+ii+'.title') }}</h3>
          <img :src="calc.img">
          <p>{{ $t('calculator.menu.'+i+'.list.'+ii+'.description') }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import define from '@/assets/js/define'
import calculator_list from '@/assets/yml/calculator.yml'
export default {
  name: 'ComponentCalculatorList',
  mixins:[Mixin],
  props: {
    query: Object,
  },
  data(){
    return{
      sign_list: define.SIGN_LIST,
      calculator_list: calculator_list,
    }
  },
  mounted(){
    //this.datetime_view = this.$route.query.n.getDateFormat("TEXT")
  },
  watch:{
    '$route': function(){
    },
  },
  methods:{
    click_symbol_search(){
      const sign = this.$$('#symbol_search_sign').value
      const degree = this.$$('#symbol_search_degree').value

      this.$router.push({name:'symbols_degree', params:{sign:sign, degree:degree}, query: this.$route.query})
    },

  },
}
</script>

