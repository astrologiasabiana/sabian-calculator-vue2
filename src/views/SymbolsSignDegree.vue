<template>
  <article id="symbols_degree_article" class="symbols_article">
    <section id="title">
      <p class="degree_name">
        <span class="sign">{{r.sign_degree.sign_degree}}</span>
        <span v-if="r.sign_degree.is_int"><br>({{r.sign_degree.param.degree - 1}}˚ - {{r.sign_degree.param.degree}}˚)</span>
        <span v-if="!r.sign_degree.is_int"><br>({{r.sign_degree.degree_minute}})</span>
      </p>
      <h1><span class="sabian">{{r.sign_degree.sabian}}</span></h1>
<!--      <p class="word">{{symbols.degree.this_degree.sabian_description}}</p>-->
      <img class="sabian_img" :src="r.sign_degree.img">
    </section>

    <section id="five_degrees_group">
      <h2>{{ $t('symbol_list.five_degrees_group.title') }}</h2>
      <p class="title_description">{{ $t('symbol_list.five_degrees_group.description') }}</p>
      <div class="res_img_wrap">
        <router-link v-for="(symbol, i) in r.five_degrees_group" :key="i" :to="{name:'symbols_degree', query: $route.query, params: {sign: symbol.param.sign, degree: symbol.param.degree }}" class="res_img" :class="'res_img'+(i+1)">
          <img :src="symbol.img">
        </router-link>
      </div>
      <div class="res_text_wrap">
        <router-link v-for="(symbol, i) in r.five_degrees_group" :key="i" :to="{name:'symbols_degree', query: $route.query, params: {sign: symbol.param.sign, degree: symbol.param.degree }}">
          <p :class="symbol.param.sign">{{symbol.sign_degree}}<br><span class="symbol_name">{{symbol.sabian}}</span></p>
        </router-link>
      </div>
    </section>

    <section v-for="(pol, key) in polygon_list" :key="key" :id="key" class="polygon">
      <h2>{{ $t('polygon_list.'+key+'.name') }}</h2>
      <p class="title_description">{{ $t('polygon_list.'+key+'.description') }}</p>
      <div class="res_img_wrap_wrap">
        <img class="bg_img" :src="pol.bg_img">
        <div class="res_img_wrap">
          <router-link v-for="(symbol, i) in polygon_sign_degree[key]" :key="i" :to="{name:'symbols_degree', query: $route.query, params: {sign: symbol.param.sign, degree: symbol.param.degree }}" class="res_img" :class="'res_img'+(i+1)">
            <img :src="symbol.img">
          </router-link>
        </div>
      </div>
      <div class="res_text_wrap">
        <router-link v-for="(symbol, i) in polygon_sign_degree[key]" :key="i" :to="{name:'symbols_degree', query: $route.query, params: {sign: symbol.param.sign, degree: symbol.param.degree }}">
          <p :class="symbol.param.sign">{{symbol.sign_degree}}<br><span class="symbol_name">{{symbol.sabian}}</span></p>
        </router-link>
      </div>
    </section>
  </article>
</template>

<script>
import Mixin from '@/components/Common'
import define from '@/assets/js/define'
import polygon_list from '@/assets/yml/polygon.yml'
export default {
  name: 'SymbolsSignDegree',
  mixins:[Mixin],
  created(){
    this.setSignDegree()
    this.addPolygonSymbols()
  },
  data(){
    return {
      r: {
        sign_list: define.SIGN_LIST,
        sign_degree: null,
        longitude: null,
      },
      polygon_list: polygon_list,
      polygon_sign_degree: this.polygon_sign_degree,
    }
  },
  watch:{
    '$route': function(){
      this.setSignDegree()
      this.addPolygonSymbols()
    }
  },
  methods:{
    addPolygonSymbols(){
      this.polygon_sign_degree = this.polygon_sign_degree ? this.polygon_sign_degree : {}

      Object.keys(polygon_list).forEach((polygon_id)=>{

        const polygon = polygon_list[polygon_id]
        const number = polygon.number
        this.polygon_sign_degree[polygon_id] = []
        for(var n=0; n<number; n++){
          var this_all_degree = (this.r.longitude + 360 / number * n) % 360

          this.polygon_sign_degree[polygon_id][n] = this.getDegreeInfo(this_all_degree, this.r.sign_degree.is_int)
        }
      })
    },
    setSignDegree(){

      if(this.$route.params.sign.getSignNumber() === null ||
        this.$route.params.degree.int() < 1 ||
        this.$route.params.degree.int() > 30){
        this.$router.push({name: 'symbols'})
      }

      const longitude_int = this.$route.params.sign.getSignNumber() * 30 + this.$route.params.degree.int() - 1
      this.r.longitude = longitude_int
      let is_int = true

      if(this.$route.params.minute && 
         this.$route.params.minute.int() >= 0 &&
         this.$route.params.minute.int() <= 59){
        is_int = false
        this.r.longitude += this.$route.params.minute.int() / 60
      }

      this.r.sign_degree = this.getDegreeInfo(this.r.longitude, is_int)

      //5 degrees group
      this.r.five_degrees_group = []
      const five_degrees_first = (longitude_int / 5).int() * 5
      for(var n=0; n<5; n++){
        this.r.five_degrees_group.push(this.getDegreeInfo(five_degrees_first + n, true))
      }
    },
  }
}
</script>