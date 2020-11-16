<template>
  <nav id="page_nav" :class="hideNav">
    <div id="page_nav_links">
      <router-link :to="{name:'calculator', query: $route.query}">{{$t('common.page_nav.calculator')}}</router-link>
      <router-link :to="{name:'symbols', query: $route.query}">{{$t('common.page_nav.symbols')}}</router-link>
      <router-link :to="{name:'calculator_setting', query: $route.query}">{{$t('common.page_nav.setting')}}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ComponentPageNav',
  props: [],
  

  data(){
    return {
      hideNav: '',
    }
  },
  mounted(){

  },
  watch: {
    '$route': function(to){
      this.hideNav = (to.name === 'home') ? 'hide' : ''

    },
  }
}
</script>

