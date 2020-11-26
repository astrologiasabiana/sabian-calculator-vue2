<template>
  <div id="midpoint">
    <section id="title">
      <h1>Midpoint Calculator</h1>
      <img src="/img/geometry/midpoint_red_01.svg">
    </section>
    <section id="result">
      <div class="anchor">
        <p>For the target planet</p>
        <router-link v-for="(p, i) in r.current_planet_list" :key="i" class="planet_anchor" :data-planet="p" :to="{name:'calculator_midpoint_planet', params:{planet:p}, query:$route.query, hash:'#res_wraps'}">
          <img class="planet_icon" :src="r.n.planets[p].icon" :data-planet="p">{{ $t('planet_list.'+p+'.name') }}
        </router-link>
      </div>

      <div id="res_wrap">
        <div class="great_title_area">
          <h2 class="great_title">{{ $t('calculator.midpoint.midpoint_with').replace('{planet}', r.base_planet_info.name) }}</h2>
        </div>
        <div v-for="(p, i) in r.midpoints" :key="i">

          <div class="res_item">
            <div class="title_area">
              <h2 class="great_title"><img class="planet_icon large" :src="r.base_planet_info.icon">{{r.base_planet_info.name}} / {{p.name}}<img class="planet_icon large" :src="p.icon"></h2>
              <p class="title_description">{{p.midpoint_description}}</p>
            </div>
            <div class="before_img_area">
              <p class="sign_degree">{{p.sign_degree}} ({{p.degree_minute}})</p>
              <p class="symbol_name title">{{p.sabian}}</p>
              <p class="word">{{p.sabian_description}}</p>
            </div>
            <router-link :to="{name:'symbols_degree_minute', query: $route.query, params: {sign: p.param.sign, degree: p.param.degree, minute: p.param.minute }}">
              <img :src="p.img" :data-minute="p.symbol_minute" :alt="p.alt">
            </router-link>

            <div class="after_img_area" v-if="p.aspects.length > 0">
              <p>Aspect</p>
              <table>
                <tr v-for="(aspect, ii) in p.aspects" :key="ii">
                  <td>{{aspect.planet.name}}<img class="planet_icon" :src="aspect.planet.icon"></td>
                  <td><img class="planet_icon" :src="aspect.aspect_icon"> orb: {{aspect.orb}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="anchor calculator_footer">
        <p>For the target planet</p>
        <router-link v-for="(p, i) in r.current_planet_list" :key="i" class="planet_anchor" :data-planet="p" :to="{name:'calculator_midpoint_planet', params:{planet:p}, query:$route.query, hash:'#res_wraps'}">
          <img class="planet_icon" :src="r.n.planets[p].icon" :data-planet="p">{{ $t('planet_list.'+p+'.name') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
export default {
  name: 'CalculatorMidpoint',
  mixins:[Mixin],
  props: {
    r: Object,
  },
  components: {

  },
  data(){
    return {
    }
  },
  created(){
    this.getMidpoints()
  },
  mounted(){
  },
  watch:{
    '$route': function(){
      this.getMidpoints()
    }
  },
  methods:{

    getMidpoints(){
      let planets = this.r.n.planets

      this.r.base_planet = this.getBasePlanet()
      this.r.base_planet_info = Object.assign(planets, this.getPlanetInfo(this.r.base_planet))

      let midpoints = [];
      let accepted_orb = parseFloat(this.$cookies.get('orb_midpoint'))

      this.r.current_planet_list.forEach(p=>{
        let planet_key = this.r.planet_define_list[p].key
        if(p === this.r.base_planet) return

        var midpoint = this.getVectorAverage([planets[this.r.base_planet_info.key].longitude, planets[planet_key].longitude]);
        var aspects = [];

        //for(var ii=0; ii<planets.length; ii++){
        this.r.current_planet_list.forEach(aspect_planet=>{
          var aspect_planet_key = this.r.planet_define_list[aspect_planet].key
          var aspect = this.getAspect(midpoint, planets[aspect_planet_key].longitude, accepted_orb);

          if(!aspect) return

          switch(aspect.aspect.key){
            case "Conjunction":
            case "SemiSquare":
            case "Square":
            case "Sesquiquadrate":
            case "Opposition":
              
              aspects.push({
                aspect_name: this.$t('aspect_list.'+aspect.aspect.key+'.name'),
                aspect_icon: aspect.aspect.key.getAspectIcon(),
                orb: aspect.orb.getDegreeMinute(),
              });
              aspects[aspects.length-1].planet = this.getPlanetInfo(aspect_planet)
              break;
          }
        })

        var midpoint_description = '';
        if(this.$t('midpoint_meaning.'+this.r.base_planet+'.'+p) !== 'midpoint_meaning.'+this.r.base_planet+'.'+p){
          midpoint_description = this.$t('midpoint_meaning.'+this.r.base_planet+'.'+p);
        }
        else if(this.$t('midpoint_meaning.'+p+'.'+this.r.base_planet) !== 'midpoint_meaning.'+p+'.'+this.r.base_planet){
          midpoint_description = this.$t('midpoint_meaning.'+p+'.'+this.r.base_planet);
        }

        midpoints.push({
          key: planet_key,
          name: this.$t('planet_list.'+p+'.name'),
          icon: this.getPlanetIcon(p),
          midpoint_description: midpoint_description,
          longitude: midpoint,
          aspects: aspects,
        });

        var midpoint_num = midpoints.length - 1;
        midpoints[midpoint_num] = Object.assign(midpoints[midpoint_num], this.getDegreeInfo(midpoints[midpoint_num].longitude))
      })

      this.r.midpoints = midpoints

      //image cookie
      if(this.r.main_planet_list[0] === 'Sun'){
        this.setImgCookie(midpoints[0].longitude)
      }
      else{
        this.setImgCookie(midpoints.slice(-1)[0].longitude)
      }
    },

    getBasePlanet(){
      if(this.$route.params &&
        this.$route.params.planet &&
        this.r.current_planet_list.indexOf(this.$route.params.planet) >= 0){
        return this.$route.params.planet
      }

      //ヘリオの場合
      if(this.$route.query.m === 'helio'){
        return 'Earth';
      }
      //ジオの場合
      else{
        return 'Sun';
      }
    },
  }
}


</script>

<style>
</style>