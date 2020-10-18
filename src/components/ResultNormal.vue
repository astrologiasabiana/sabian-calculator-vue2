<template>
  <div class="res_item" :id="r.key">
    <div class="title_area">
      <h2 class="great_title"><img class="planet_icon large" :src="r.icon">{{r.name}}</h2>
      <p class="title_description">{{r.description}}</p>
    </div>

    <div class="before_img_area"></div>

    <router-link :to="{name:'symbols_degree_minute', query: $route.query, params: {sign: r.param.sign, degree: r.param.degree, minute: r.param.minute }}">
      <img :src="r.img" :data-minute="r.symbol_minute">
    </router-link>

    <div class="after_img_area">
      <p class="sign_degree">{{r.sign_degree}} ({{r.degree_minute}})</p>
      <p class="symbol_name">{{r.sabian}}</p>
      <p class="word">{{r.sabian_description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultNormal',
  props: {
    r: Object,
  },
  data(){
    return {
    }
  },
  methods:{
/*
    click_change_symbol_minute(e){
      //でたらめなパラメータを後でなおす
      if(e.target.dataset.minute){
        this.$route.query.symbol_minute = e.target.dataset.minute
      }
      else{
        delete this.$route.query.symbol_minute
      }
      this.$router.replace({ query: this.$route.query })
    },*/
  }
}
</script>