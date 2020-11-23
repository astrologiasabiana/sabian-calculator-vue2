<template>
  <div class="res_item" :id="r.key">
    <div class="title_area">
      <h2 class="great_title"><img class="planet_icon large" :src="r.icon">{{r.name}}</h2>
      <p class="title_description">{{r.description}}</p>
    </div>

    <div v-if="r.list.length>1">
      <div class="many_res_wrap">
        <div class="res_item" v-for="(item, i) in r.list" :key="i">
          <div class="before_img_area">
            <p class="just_before_img">{{item.hour_minute}}〜</p>
          </div>
          <router-link :to="{name:'symbols_degree', query: $route.query, params: {sign: item.param.sign, degree: item.param.degree }}">
            <img :src="item.img" @click="click_change_symbol_minute" :alt="item.alt">
          </router-link>

          <div class="after_img_area">
            <p class="sign_degree">{{item.sign_degree}} ({{item.param.degree - 1}}˚-{{item.param.degree}}˚)</p>
            <p class="symbol_name">{{item.sabian}}</p>
            <p class="word">{{item.sabian_description}}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="before_img_area"></div>
      <router-link :to="{name:'symbols_degree', query: $route.query, params: {sign: r.list[0].param.sign, degree: r.list[0].param.degree }}">
        <img class="" :src="r.list[0].img" :alt="r.list[0].alt">
      </router-link>
      
      <div class="after_img_area">
        <p class="sign_degree">{{r.list[0].sign_degree}} ({{r.list[0].param.degree - 1}}˚-{{r.list[0].param.degree}}˚)</p>
        <p class="symbol_name">{{r.list[0].sabian}}</p>
        <p class="word">{{r.list[0].sabian_description}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ResultUnknownTime',
  props: {
    r: Object,
  },
  data(){
    return {
    }
  },
  created(){
    //this.addUnknownTime()
  },
  methods:{
    click_change_symbol_minute(e){
      //でたらめなパラメータを後でなおす
      if(e.target.dataset.minute){
        this.$route.query.symbol_minute = e.target.dataset.minute
      }
      else{
        delete this.$route.query.symbol_minute
      }
      this.$router.replace({ query: this.$route.query })
    },


  }
}
</script>