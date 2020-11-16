<template>
  <div class="res_pair_wrap">

    <div class="res_item">
      <router-link :to="{name:'symbols_degree', query: this.$route.query, params: {sign: p.param.sign, degree: p.param.degree, minute: p.param.minute }}">
        <img :src="p.img" :data-minute="p.symbol_minute">
      </router-link>
      <div class="after_img_area">
        <p>{{p.name}}<img class="planet_icon" :src="p.icon">{{p.sign_degree}} ({{p.degree_minute}})</p>
        <p class="symbol_name">{{p.sabian}}</p>
        <p class="word">{{p.sabian_description}}</p>
      </div>
    </div>

    <div class="res_item">
      <router-link :to="{name:'symbols_degree', query: $route.query, params: {sign: pp.param.sign, degree: pp.param.degree, minute: pp.param.minute }}">
        <img :src="pp.img" :data-minute="pp.symbol_minute">
      </router-link>
      <div class="after_img_area">
        <p>{{pp.name}}<img class="planet_icon" :src="pp.icon">{{pp.sign_degree}} ({{pp.degree_minute}})</p>
        <p class="symbol_name">{{pp.sabian}}</p>
        <p class="word">{{pp.sabian_description}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ResultPair',
  props: {
    p: Object,
    pp: Object,
  },
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>