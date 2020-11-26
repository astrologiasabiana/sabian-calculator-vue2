<template>
  <div>
    <section id="title">
      <h1>Progression Calculator</h1>
      <img src="/img/geometry/progress_01.svg" style="width: 120px; margin-bottom: 30px;">
    </section>

    <section id="sorry" v-if="r.m === 'asc_aries' || r.m === 'mc_capricorn'">
      <span>{{ $t('calculator.sorry_house_sabian') }}</span>
    </section>

    <section id="result" v-else>
      <MandalaHeliocentric v-if="r.m === 'helio'" :result="r.progression.planets"></MandalaHeliocentric>
      <MandalaGeocentric v-if="r.m !== 'helio'" :result="r.progression.planets"></MandalaGeocentric>

      <div id="res_wrap">
        <div v-for="(p, i) in r.current_planet_list" :key="i" >
          <ResultNormal :r="r.progression.planets[p]" v-if="!(p === 'Asc' || p === 'Mc')"></ResultNormal>
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
  name: 'CalculatorProgression',
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
    this.set_progression()
  },
  mounted(){
    this.set_progression()
  },
  watch:{
    '$route': function(){
      this.set_progression()
    }
  },
  methods:{

    set_progression(){
      //時間の差を計算
      const diff_year = this.getDiffYear()

      if(!this.r.progression) this.r.progression = {}
      if(!this.r.progression.pl) this.r.progression.pl = new window.Pluto()
      this.r.progression.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.n, 'array'))
      this.r.progression.pl.addJulDay(diff_year);
      if(this.r.m === 'helio'){
        this.r.progression.pl.setHeliocentric();
      }
      this.r.progression.planets = this.addPlanetsInfo( this.r.progression.pl.getPlanets(), this.r.n.pl.getHouses() )

      //image cookie
      this.setImgCookie(this.r.progression.pl.getPlanets()[this.r.main_planet_list[0]].longitude)
    },
  }
}


</script>

<style>
</style>