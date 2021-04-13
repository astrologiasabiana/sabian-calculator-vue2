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

    if(window.innerWidth <=767){
      window.addEventListener('scroll', this.onScroll);
    }
  },
  mounted(){

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
    onScroll(){

      if(this.scrollY && window.scrollY > 200){
        if(window.scrollY > this.scrollY){
          if(this.$$('header')) this.$$('header').style.display = 'none'
          //if(this.$$('#page_nav')) this.$$('#page_nav').style.display = 'none'
          if(this.$$('#res_date_time')) this.$$('#res_date_time').style.display = 'none'
          if(this.$$('#res_date_time_f')) this.$$('#res_date_time_f').style.display = 'none'
          if(this.$$('#res_date_time_p')) this.$$('#res_date_time_p').style.display = 'none'
          if(this.$$('#res_mode')) this.$$('#res_mode').style.display = 'none'
        }
        else{
          if(this.$$('header')) this.$$('header').style.display = 'block'
          //if(this.$$('#page_nav')) this.$$('#page_nav').style.display = 'block'
          if(this.$$('#res_date_time')) this.$$('#res_date_time').style.display = 'block'
          if(this.$$('#res_date_time_f')) this.$$('#res_date_time_f').style.display = 'block'
          if(this.$$('#res_date_time_p')) this.$$('#res_date_time_p').style.display = 'block'
          if(this.$$('#res_mode')) this.$$('#res_mode').style.display = 'block'
        }
      }
      else{
        if(this.$$('header')) this.$$('header').style.display = 'block'
        //if(this.$$('#page_nav')) this.$$('#page_nav').style.display = 'block'
        if(this.$$('#res_date_time')) this.$$('#res_date_time').style.display = 'block'
        if(this.$$('#res_date_time_f')) this.$$('#res_date_time_f').style.display = 'block'
        if(this.$$('#res_date_time_p')) this.$$('#res_date_time_p').style.display = 'block'
        if(this.$$('#res_mode')) this.$$('#res_mode').style.display = 'block'
      }

      this.scrollY = window.scrollY
    },
  }
}
</script>

<style scoped lang="scss">
@import url("assets/css/common.scss");
</style>
