<template>
  <div id="geo_mandala">
    <div class="Uranus" @click="$scrollTo('#Uranus')"><img :src="result.Uranus.img"></div>
    <div class="Pluto" @click="$scrollTo('#Pluto')"><img :src="result.Pluto.img"></div>
    <div class="Neptune" @click="$scrollTo('#Neptune')"><img :src="result.Neptune.img"></div>
    <div class="Mars" @click="$scrollTo('#Mars')"><img :src="result.Mars.img"></div>
    <div class="Saturn" @click="$scrollTo('#Saturn')"><img :src="result.Saturn.img"></div>
    <div class="Jupiter" @click="$scrollTo('#Jupiter')"><img :src="result.Jupiter.img"></div>
    <div class="Mercury" @click="$scrollTo('#Mercury')"><img :src="result.Mercury.img"></div>
    <div class="Sun" @click="$scrollTo('#Sun')"><img :src="result.Sun.img"></div>
    <div class="Venus" @click="$scrollTo('#Venus')"><img :src="result.Venus.img"></div>
    <div class="Moon" @click="$scrollTo('#Moon')"><img :src="result.Moon.img"></div>
  </div>
</template>

<script>
export default {
  name: 'MandalaGeocentric',
  props: {
    result: Object,
  },
  data(){
    return {
    }
  },
  methods:{

  }
}
</script>