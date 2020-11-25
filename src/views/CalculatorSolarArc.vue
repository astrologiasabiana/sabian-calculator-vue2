<template>
  <div>
    <section id="title">
      <h1>Solar Arc Calculator</h1>
      <img src="/img/geometry/solar_arc_01.svg" style="width: 120px; margin-bottom: 30px;">
    </section>
    <section id="result">
      <MandalaHeliocentric v-if="r.helio" :result="r.solar_arc.planets"></MandalaHeliocentric>
      <MandalaGeocentric v-if="!r.helio" :result="r.solar_arc.planets"></MandalaGeocentric>

      <div id="res_wrap">
        <div v-for="(p, i) in r.current_planet_list" :key="i">
          <ResultNormal :r="r.solar_arc.planets[p]" v-if="!(p === 'Asc' || p === 'Mc')"></ResultNormal>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import MandalaHeliocentric from '@/components/MandalaHeliocentric.vue'
import MandalaGeocentric from '@/components/MandalaGeocentric.vue'
import ResultNormal from '@/components/ResultNormal.vue'
export default {
  name: 'CalculatorSolarArc',
  mixins:[Mixin],
  props: {
    r: Object,
  },
  components: {
    MandalaHeliocentric,
    MandalaGeocentric,
    ResultNormal,
  },
  data(){
    return {
    }
  },
  created(){
    this.set_solar_arc()
  },
  mounted(){
    this.set_solar_arc()
  },
  watch:{
    '$route': function(){
      this.set_solar_arc()
    }
  },
  methods:{
    set_solar_arc(){
      //いったんnatal
      this.set_natal()

      //いったんProgress
      this.set_progression()

      const natal_sun_longitude = this.r.n.pl.getPlanets().Sun.longitude
      const progression_sun_longitude = this.r.progression.pl.getPlanets().Sun.longitude
      const diff = progression_sun_longitude - natal_sun_longitude

      let solar_arc = {}
      this.r.current_planet_list.forEach(p=>{
        if(p === 'Asc' || p === 'Mc') return
        solar_arc[p] = {longitude: this.r.n.pl.getPlanets()[p].longitude + diff}
      })

      solar_arc = this.addPlanetsInfo(solar_arc)

      this.r.solar_arc = {}
      this.r.solar_arc.planets = solar_arc

      this.setImgCookie(solar_arc[this.r.main_planet_list[0]].longitude)
    },

    set_natal(){
      this.r.n.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.n, 'array'))
    },

    set_progression(){
      //時間の差を計算
      const diff_year = this.getDiffYear()

      if(!this.r.progression) this.r.progression = {}
      if(!this.r.progression.pl) this.r.progression.pl = new window.Pluto()
      this.r.progression.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.n, 'array'))
      this.r.progression.pl.addJulDay(diff_year);

      if(this.r.helio){
        this.r.progression.pl.setHeliocentric();
      }
    },
  }
}


</script>

<style>
</style>