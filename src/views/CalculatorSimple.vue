<template>
  <div>
    <section id="title">
      <h1>Sabian Calculator</h1>
    <p class="description">
<span>*</span><br>
<span>You</span><br>
<span>can find</span><br>
the Sabian Symbols for yourself,<br>
friends and celebrities to<br>
discover their hidden<br>
treasures, and even special<br>
events to find the deeper meaning<br>
<span style="letter-spacing: 2px;">within</span><br>
them<br>
<span>*</span><br>
  </p>
    </section>
    <section id="result">
      <MandalaHeliocentric v-if="r.m === 'helio'" :result="r.n.planets"></MandalaHeliocentric>
      <MandalaGeocentric v-else :result="r.n.planets"></MandalaGeocentric>

      <div id="res_wrap">
        <div v-for="(p, i) in r.current_planet_list" :key="i">
          <ResultNormal v-if="!r.n.is_unknown" :r="r.n.planets[p]"></ResultNormal>
          <ResultUnknownTime v-if="r.n.is_unknown" :r="r.n.planets[p]"></ResultUnknownTime>
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
import ResultUnknownTime from '@/components/ResultUnknownTime.vue'
export default {
  name: 'CalculatorSimple',
  mixins:[Mixin],
  props: {
    r: Object,
  },
  components: {
    MandalaHeliocentric,
    MandalaGeocentric,
    ResultNormal,
    ResultUnknownTime,
  },
  data(){
    return {
      route: this.$route
    }
  },
  created(){
    this.addUnknownTime()
  },
  mounted(){
    this.addUnknownTime()
  },
  watch:{
    '$route': function(){
      this.addUnknownTime()
    }
  },
  methods:{

    addUnknownTime(){
      if(!this.r.n.is_unknown) return

      let n = this.r.n
      let pl = n.pl
      let planets = n.planets

      //始まり
      pl.addJulDay(-0.5);
      const planet_positions_start = pl.getPlanets();

      //終わり
      pl.addJulDay(1);
      const planet_positions_end = pl.getPlanets();

      //戻す
      pl.addJulDay(-0.5);

      this.r.current_planet_list.forEach(p=>{
        let list = []
        let planet = planets[p];
        let planet_key = this.r.planet_define_list[p].key;

        for(var d in ['am', 'pm']){
          var start_degree = planet_positions_start[planet_key].longitude;
          var end_degree = planet.longitude;
          var passed_minute = 0;
          var start_minute = passed_minute;
          var finish_minite = 60 * 12;

          if(['am', 'pm'][d] === 'pm'){
            start_degree = planet.longitude;
            end_degree = planet_positions_end[planet_key].longitude;
            passed_minute = 60 * 12;
            start_minute = passed_minute;
            finish_minite = 60 * 24;
          }
          
          var is_direct = (this.getDiff(start_degree, end_degree) > 0 );
          var speed = this.getDiff(start_degree, end_degree) / (60 * 12);
          var passed_degree = is_direct ? 1 - start_degree % 1 : - start_degree % 1;

          if(['am', 'pm'][d] === 'am'){
            list.push({
              longitude: start_degree,
              passed_minute: passed_minute,
              hour_minute: this.getHourMinute(passed_minute, false),
            });
            list[0] = Object.assign(list[0], this.getDegreeInfo(list[0].longitude, 'int'))
          }

          let lim=0
          while(passed_minute < finish_minite && lim<10){
            var degree = start_degree + passed_degree;
            if(is_direct) degree += 1/10000;//わずかに次の度数へ
            else degree -= 1/10000;//わずかに次の度数へ
            passed_minute = passed_degree / speed + start_minute;

            //同じ度数はスキップ
            if(passed_minute < 60 * 24 &&
              this.getDiffAbs(list[list.length-1].longitude, degree) > 1/1000){

              list.push({
                longitude: degree,
                passed_minute: passed_minute,
                hour_minute: this.getHourMinute(passed_minute, false),
              });
              list[list.length-1] = Object.assign(list[list.length-1], this.getDegreeInfo(list[list.length-1].longitude, 'int'))
            }
            
            if(is_direct) passed_degree++;
            else passed_degree--;
            lim++;
          }
        }

        this.r.n.planets[p].list = list;
      })

      this.setImgCookie(this.r.n.planets[this.r.main_planet_list[0]].list[0].longitude)
    },

    getHourMinute(minute, ceil){
      if(ceil === true) minute = Math.ceil(minute);
      else minute = Math.floor(minute);
      if(minute < 0) return "0:00";
      if(minute > 1440) return "23:59";
      return (minute / 60).int() + ":" + (minute % 60).zeroPadding(2);
    },
  }
}


</script>

<style>
</style>