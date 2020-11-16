<template>
  <div id="app">
    <ComponentHeader></ComponentHeader>
    <CalculatorNav v-if="$route && $route.name && $route.name.match(/^calculator/)"></CalculatorNav>
    <router-view :current="current"></router-view>

    <ComponentPageNav></ComponentPageNav>
    <ComponentShare></ComponentShare>
    <ComponentCalculatorList></ComponentCalculatorList>
    <ComponentFooter></ComponentFooter>
  </div>
</template>

<script>
import ComponentHeader from '@/components/ComponentHeader.vue'
import CalculatorNav from '@/components/CalculatorNav.vue'
import ComponentPageNav from '@/components/ComponentPageNav.vue'
import ComponentShare from '@/components/ComponentShare.vue'
import ComponentCalculatorList from '@/components/ComponentCalculatorList.vue'
import ComponentFooter from '@/components/ComponentFooter.vue'
import Mixin from '@/components/Common'

export default {
  mixins:[Mixin],
  components: {
    ComponentHeader,
    CalculatorNav,
    ComponentPageNav,
    ComponentShare,
    ComponentCalculatorList,
    ComponentFooter,
  },

  data () {
    return {
      path: {
        en: '/',
        ja: '/ja',
        fr: '/fr',
      },
      current: this.current,
    }
  },
  created(){
    //トップの計算
    const current_dt = new Date()
    let current_pl = new window.Pluto(current_dt)
    current_pl.unsetHeliocentric()

    this.current = this.current ? this.current : {}
    this.current.planets = current_pl.getPlanets()
    this.current.sun_longitude = this.current.planets.Sun.longitude

  },
  watch: {
    '$route': function(to, from){
      this.$$('html').classList.remove(from.name)
      this.$$('html').classList.add(to.name)

      //スクロール位置
      if(!to.hash){
        window.scrollTo(0, 0)//トップへ
      }
      else{
        this.toAnchor(to.hash)
      }
    },
  },
  methods:{
    toAnchor: function(hash){
      this.$scrollTo(hash)
    },
  }
}
</script>

<style scoped lang="scss">
@import url("assets/css/common.scss");
</style>
