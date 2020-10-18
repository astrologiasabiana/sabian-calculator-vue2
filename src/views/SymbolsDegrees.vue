<template>
  <article id="symbols_sign_article" class="symbols_article">
    <router-link :to="{name:'symbols_degree', query: $route.query, params: {sign: degree.param.sign, degree: key+1}}" v-for="(degree, key) in degrees" :key="key" :style="{'background-image':'url('+degree.img+')'}">
      <p class="sign_degree">{{degrees[key].sign_degree}}</p>
      <p class="sabian">{{degrees[key].sabian}}</p>
    </router-link>
  </article>
</template>

<script>
import Mixin from '@/components/Common'
export default {
  name: 'SymbolsDegrees',
  mixins:[Mixin],
  created(){
    this.setSignInfo()
  },
  modified(){
  },
  data(){
    return {
      degrees: this.degrees,
    }
  },
  watch:{
    '$route': function(){
      this.setSignInfo()
    }
  },
  methods:{
    setSignInfo(){
      const sign_num = this.$route.params.sign.getSignNumber()

      if(sign_num === null || sign_num === undefined) this.$router.push({name: 'symbols'})

      this.degrees = []

      for(var i=0; i<30; i++){
        this.degrees[i] = this.getDegreeInfo(sign_num * 30 + i, true)
      }
    },
  }
}
</script>