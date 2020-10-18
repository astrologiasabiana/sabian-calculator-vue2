<template>
  <article id="symbols_article" class="symbols_article">
    <router-link :to="{name:'symbols_sign', query: $route.query, params: {sign: sign.key }}" v-for="(sign, key) in define.SIGN_LIST" :key="key" :style="{'background-image':'url('+today_degree_imgs[key]+')'}">
      <span>{{ $t('sign_list['+key+']') }}</span>
    </router-link>
  </article>
</template>

<script>
import Mixin from '@/components/Common'
import define from '@/assets/js/define'
export default {
  name: 'SymbolsSigns',
  mixins:[Mixin],
  props: {
    current: Object,
  },
  created(){
    this.setTodayDegreeImgs()
  },
  modified(){
  },
  data(){
    return {
      define: define,
      today_degree_imgs: this.today_degree_imgs,
    }
  },
  watch:{
    '$route': function(){
    }
  },
  methods:{
    setTodayDegreeImgs(){
      const degree = this.current.sun_longitude % 30
      this.today_degree_imgs = []

      for(var i=0; i<12; i++){
        this.today_degree_imgs[i] = (degree + i*30).getImg()
      }
    },
  }
}
</script>