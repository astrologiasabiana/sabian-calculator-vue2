<template>
  <div id="helio_mandala">
    <div class="Uranus" @click="$scrollTo('#Uranus')"><img :src="result.Uranus.img" :alt="result.Uranus.alt"></div>
    <div class="Pluto" @click="$scrollTo('#Pluto')"><img :src="result.Pluto.img" :alt="result.Pluto.alt"></div>
    <div class="Neptune" @click="$scrollTo('#Neptune')"><img :src="result.Neptune.img" :alt="result.Neptune.alt"></div>
    <div class="Mars" @click="$scrollTo('#Mars')"><img :src="result.Mars.img" :alt="result.Mars.alt"></div>
    <div class="Saturn" @click="$scrollTo('#Saturn')"><img :src="result.Saturn.img" :alt="result.Saturn.alt"></div>
    <div class="Jupiter" @click="$scrollTo('#Jupiter')"><img :src="result.Jupiter.img" :alt="result.Jupiter.alt"></div>
    <div class="Mercury" @click="$scrollTo('#Mercury')"><img :src="result.Mercury.img" :alt="result.Mercury.alt"></div>
    <div class="Earth" @click="$scrollTo('#Earth')"><img :src="result.Earth.img" :alt="result.Earth.alt"></div>
    <div class="Venus" @click="$scrollTo('#Venus')"><img :src="result.Venus.img" :alt="result.Venus.alt"></div>
  </div>
</template>

<script>
export default {
  name: 'MandalaHeliocentric',
  props: {
    result: Object,
  },
  data(){
    return {
    }
  },
}
</script>