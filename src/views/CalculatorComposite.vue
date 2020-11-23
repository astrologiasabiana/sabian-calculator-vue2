<template>
  <div>
    <section id="title">
      <h1>Composite Calculator</h1>
      <img src="/img/geometry/composite_01.svg" style="width: 120px; margin-bottom: 30px;">
    </section>
    <section id="result">
      <MandalaHeliocentric v-if="r.helio" :result="r.composite"></MandalaHeliocentric>
      <MandalaGeocentric v-if="!r.helio" :result="r.composite"></MandalaGeocentric>

      <div id="res_wrap">
        <div v-for="(p, i) in r.current_planet_list" :key="i">
          <ResultNormal :r="r.composite[p]"></ResultNormal>
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
  name: 'CalculatorComposite',
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
    this.set_composite()
  },
  mounted(){
    this.set_composite()
  },
  watch:{
    '$route': function(){
      this.set_composite()
    }
  },
  methods:{
    set_composite(){
      //いったんパートナー設定
      this.set_partner()

      let composite = {}
      this.r.current_planet_list.forEach(p=>{
        if(p === 'Asc' || p === 'Mc') return

        const longitude = this.getVectorAverage([this.r.n.pl.getPlanets()[p].longitude, this.r.p.pl.getPlanets()[p].longitude])

        composite[p] = {}
        composite[p].longitude = longitude
        composite[p] = Object.assign(composite[p], this.getPlanetInfo(p))
        composite[p] = Object.assign(composite[p], this.getDegreeInfo(longitude))
      })

      this.r.composite = {}
      this.r.composite = composite

      this.setImgCookie(composite[this.r.main_planet_list[0]].longitude)
    },

    set_partner(){
      if(!this.r.p) this.r.p = {}
      if(!this.r.p.pl) this.r.p.pl = new window.Pluto()
      this.r.p.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.p, 'array'))

      if(this.r.helio){
        this.r.p.pl.setHeliocentric();
      }
    },
  }
}


</script>

<style>
</style>