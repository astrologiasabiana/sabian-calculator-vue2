<template>
  <div id="setting_article">

    <section>
      <h2>{{ $t('setting.orb.title') }}</h2>
      <table>
        <tr>
          <td>{{ $t('setting.orb.midpoint.title') }}</td>
          <td>
            <select id="orb_midpoint" @change="change_orb_midpoint" v-model="orb_midpoint">
              <option v-for="i of 20" :key="i" :value="i/2">{{i/2}}</option>
            </select>
          </td>
          <td class="description">{{ $t('setting.orb.midpoint.description') }}</td>
        </tr>
        <tr>
          <td>{{ $t('setting.orb.harmonics.title') }}</td>
          <td>
            <select id="orb_harmonics" @change="change_orb_harmonics" v-model="orb_harmonics">
              <option v-for="i of 20" :key="i" :value="i/2">{{i/2}}</option>
            </select>
          </td>
          <td class="description">{{ $t('setting.orb.harmonics.description') }}</td>
        </tr>
      </table>

      <h2>{{ $t('setting.true_mean.title') }}</h2>
      <div>
        <nobr>
          <input type="radio" value="0" class="" name="true_mean_node" id="true_node" v-model="true_mean_node" checked @change="change_true_mean_node(0)">
          <span class="">{{ $t('setting.true_mean.true_node') }}</span>
        </nobr>
        <nobr>
          <input type="radio" value="1" class="" name="true_mean_node" id="mean_node" v-model="true_mean_node" @change="change_true_mean_node(1)">
          <span class="">{{ $t('setting.true_mean.mean_node') }}</span>
        </nobr>
      </div>
      <div>
        <nobr>
          <input type="radio" value="0" class="" name="true_mean_lilith" id="true_lilith" v-model="true_mean_lilith" checked @change="change_true_mean_lilith(0)">
          <span class="">{{ $t('setting.true_mean.true_lilith') }}</span>
        </nobr>
        <nobr>
          <input type="radio" value="1" class="" name="true_mean_lilith" id="mean_lilith" v-model="true_mean_lilith" @change="change_true_mean_lilith(1)">
          <span class="">{{ $t('setting.true_mean.mean_lilith') }}</span>
        </nobr>
      </div>

      <h2>{{ $t('setting.astronomical_model.title') }}</h2>
      <div>
        <nobr>
          <input type="radio" value="" class="" name="astronomical_model" id="astronomical_model_geocentric" checked @change="change_astronomical_model">
          <span class="">{{ $t('setting.astronomical_model.geocentric') }}</span>
        </nobr>
        <br class="pc-none">
        <nobr>
          <input type="radio" value="helio" class="" name="astronomical_model" id="astronomical_model_heliocentric" v-model="m"  @change="change_astronomical_model">
          <span class="">{{ $t('setting.astronomical_model.heliocentric') }}</span>
        </nobr>
        <br>
        <nobr>
          <input type="radio" value="asc_aries" class="" name="astronomical_model" id="astronomical_model_heliocentric" v-model="m"  @change="change_astronomical_model">
          <span class="">{{ $t('setting.astronomical_model.house_sabian_asc_aries') }}</span>
        </nobr>
        <br class="pc-none">
        <nobr>
          <input type="radio" value="mc_capricorn" class="" name="astronomical_model" id="astronomical_model_heliocentric" v-model="m"  @change="change_astronomical_model">
          <span class="">{{ $t('setting.astronomical_model.house_sabian_mc_capricorn') }}</span>
        </nobr>
      </div>

      <h2>{{ $t('setting.language.title') }}</h2>

      <ComponentLang></ComponentLang>
    </section>

    <!-- calculatorのナビを動かせないので、重複して記述しているから消したい -->
    <div id="res_mode_wrap" v-if="$route.query.m">
      <p class="title sp-none">{{ $t('common.left_nav.mode') }}</p>
      <router-link :to="{name:'calculator_setting', query: $route.query}">
        <p id="res_mode" v-if="$route.query.m === 'helio'">
          <span class="pc-none">HELIO</span>
          <span class="sp-none">{{ $t('setting.astronomical_model.heliocentric') }}</span>
        </p>
        <p id="res_mode" v-if="$route.query.m === 'asc_aries'">
          <span class="pc-none">ASC=Ari.0˚</span>
          <span class="sp-none">{{ $t('setting.astronomical_model.house_sabian_asc_aries_short') }}</span>
        </p>
        <p id="res_mode" v-if="$route.query.m === 'mc_capricorn'">
          <span class="pc-none">MC=Cap.0˚</span>
          <span class="sp-none">{{ $t('setting.astronomical_model.house_sabian_mc_capricorn_short') }}</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import ComponentLang from '@/components/ComponentLang'
export default {
  name: 'CalculatorSetting',
  mixins:[Mixin],
  props: {
    r: Object,
  },
  components: {
    ComponentLang,
  },
  data(){
    return {
      orb_midpoint: this.$cookies.get('orb_midpoint'),
      orb_harmonics: this.$cookies.get('orb_harmonics'),
      true_mean_node: this.$cookies.get('true_mean_node'),
      true_mean_lilith: this.$cookies.get('true_mean_lilith'),
      m: this.$route.query.m ? this.$route.query.m : null,
    }
  },
  created(){
   //this.set_solar_arc()
  },
  mounted(){
    //this.set_solar_arc()
  },
  watch:{
    '$route': function(){
      //this.set_solar_arc()
    }
  },
  methods:{
/*
    set_solar_arc(){
      //いったんパートナー設定
      this.set_partner()

      let composite = {}
      this.r.current_planet_list.forEach(p=>{
        composite[p] = {longitude: this.r.n.pl.getPlanets()[p].longitude + this.r.p.pl.getPlanets()[p].longitude}
      })

      composite = this.addPlanetsInfo(composite)

      this.r.composite = {}
      this.r.composite.planets = composite
    },

    set_partner(){
      if(!this.r.p) this.r.p = {}
      if(!this.r.p.pl) this.r.p.pl = new window.Pluto()
      this.r.p.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.p, 'array'))

      if(this.r.m === 'helio'){
        this.r.p.pl.setHeliocentric();
      }
    },
*/
    change_orb_midpoint(e){
      this.$cookies.set('orb_midpoint', e.target.value)
    },

    change_orb_harmonics(e){
      this.$cookies.set('orb_harmonics', e.target.value)
    },

    change_true_mean_node(e){
      this.$cookies.set('true_mean_node', e)
      this.setAstronomicalModel()
    },

    change_true_mean_lilith(e){
      this.$cookies.set('true_mean_lilith', e)
      this.setAstronomicalModel()
    },

    change_astronomical_model(e){
      let query = this.$route.query
      if(e.target.value){
        query.m = e.target.value
      }
      else{
        delete(query.m)
      }

      //this.$route.query.m = query.m
      this.$router.replace({ name:'calculator_setting', query:this.$route.query })

      this.setAstronomicalModel()

      if(query.m === 'asc_aries' || query.m === 'mc_capricorn'){
        this.$$("#unknown_time").checked = false
        this.$$("#unknown_time").disabled = true
        this.$$('#time').disabled = false
        this.$$('#input_location').style.display = 'block'
      }
      else{
        this.$$("#unknown_time").disabled = false
      }
    },
  }
}


</script>

<style>
</style>