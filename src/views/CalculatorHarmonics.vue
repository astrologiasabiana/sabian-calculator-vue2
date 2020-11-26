<template>
  <div>
    <section id="title">
      <h1>Harmonics Calculator</h1>
      <img src="/img/geometry/sign_red_yellow_01.svg">
    </section>
    <section id="result">
      <div class="anchor">
        <p>{{ $t('calculator.harmonics.range') }}</p>
        <select id="harmonics_range" @change="change_harmonics_range" v-model="harmonics_range">
          <option v-for="i of 13" :key="i" :value="i-1">
            <span v-if="i==1">2 〜 9</span>
            <span v-else>{{i-1}}0 〜 {{i-1}}9</span>
          </option>
        </select>
      </div>

      <div id="res_wrap" v-if="r.harmonics.length > 0">
        <div v-for="(list, l) in r.harmonics" :key="l">
          <div class="title_area"><h2 class="title">{{ $t('calculator.harmonics.harmonic') }} {{list.number}}</h2></div>
          <ResultPair v-for="(pair, ii) in list.pair_list" :key="ii" :p="pair.planet" :pp="pair.planet2"></ResultPair>
        </div>
      </div>

      <div id="res_wrap" v-else>
        {{ $t('calculator.harmonics.not_found') }}
      </div>

      <div class="anchor calculator_footer">
        <p>{{ $t('calculator.harmonics.range') }}</p>
        <select id="harmonics_range_footer" @change="change_harmonics_range" v-model="harmonics_range">
          <option v-for="i of 13" :key="i" :value="i-1">
            <span v-if="i==1">2 〜 9</span>
            <span v-else>{{i-1}}0 〜 {{i-1}}9</span>
          </option>
        </select>
      </div>
    </section>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import ResultPair from '@/components/ResultPair.vue'
export default {
  name: 'CalculatorHarmonics',
  mixins:[Mixin],
  props: {
    r: Object,
  },
  components: {
    ResultPair
  },
  data(){
    return {
      harmonics_range: this.harmonics_range
    }
  },
  created(){
    this.getHarmonics()
  },
  mounted(){
    this.getHarmonics()
  },
  watch:{
    '$route': function(){
      this.getHarmonics()
    }
  },
  methods:{
    getHarmonics(){
      let planets = this.r.n.planets
      let accepted_orb = parseFloat(this.$cookies.get('orb_harmonics'))
      let harmonics_range = parseInt(this.$cookies.get('harmonics_range'))
      this.harmonics_range = harmonics_range

      let base_degrees = []

      this.r.current_planet_list.forEach(p=>{
        const planet_key = planets[p].key
        base_degrees.push(planets[planet_key].longitude)
      })

      var res = [];
      var start_num = harmonics_range > 0 ? harmonics_range * 10 : 2;
      var end_num = harmonics_range * 10 + 9;
      for(var n=start_num; n<=end_num; n++){
        var degrees = [];
        base_degrees.forEach(v=>{
          degrees.push(v * n);
        })

        var list = [];
        this.r.current_planet_list.forEach((p,i)=>{
          this.r.current_planet_list.forEach((pp,ii)=>{

            if(i>=ii) return;

            if(!this.isAspect(degrees[i], degrees[ii], accepted_orb, 'Conjunction')) return;

            var harmonics_pair = {
              planet:{ longitude: degrees[i] },
              planet2:{ longitude: degrees[ii] },
            };


            harmonics_pair.planet = Object.assign(harmonics_pair.planet, this.getPlanetInfo(p))
            harmonics_pair.planet = Object.assign(harmonics_pair.planet, this.getDegreeInfo(harmonics_pair.planet.longitude))
            harmonics_pair.planet2 = Object.assign(harmonics_pair.planet2, this.getPlanetInfo(pp))
            harmonics_pair.planet2 = Object.assign(harmonics_pair.planet2, this.getDegreeInfo(harmonics_pair.planet2.longitude))

            list.push(harmonics_pair);
          })
        })

        if(list.length > 0){
          res.push({
            number: n,
            pair_list: list,
          });
        }
      }
      this.r.harmonics = res

      //image cookie
      if(res && res[0]){
        this.setImgCookie(res[0].pair_list[0].planet.longitude)
      }

    },
    change_harmonics_range: function(e){
      this.harmonics_range = e.target.value
      this.$cookies.set('harmonics_range', this.harmonics_range)
      this.getHarmonics()
      window.scrollTo(0, 0)//トップへ
    },
  }
}


</script>

<style>
</style>