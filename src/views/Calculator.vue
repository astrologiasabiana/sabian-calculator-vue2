<template>
  <div>
    <div v-if="$route.name.match(/^calculator/)" id="res_date_time_wrap">
      <p class="title sp-none">{{ $t('common.left_nav.data') }}</p>
      <div id="res_date_time_wrap_sp">
        <a id="res_date_time" class="res_date_time" @click="click_res_date_time">{{datetime_view.n}}</a>
        <a id="res_date_time_p" class="res_date_time" @click="click_res_date_time" v-if="is_partner">{{ datetime_view.p}}</a>
        <a id="res_date_time_f" class="res_date_time" @click="click_res_date_time" v-if="is_forecast">{{datetime_view.f}}</a>
      </div>

      <div id="res_mode_wrap" v-if="$route.query.m && $route.name !== 'calculator_setting'">
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

    <article id="calculator_article" class="calculator" @click="click_article">
      <router-view :r="result"></router-view>
    </article>

    <dl v-if="$route.name.match(/^calculator/)" id="set_datetime" class="set_param none" @click="click_close_input_modal">
      <div id="set_datetime_inner">
        <button id="close" @click="click_close">
          <div></div>
          <div></div>
        </button>

        <dt>{{ $t('calculator.set_datetime.year_month_day') }}</dt>
        <dd><input id="date" type="date" v-model="input.date"></dd>

        <dt>{{ $t('calculator.set_datetime.hour_minute') }}</dt>
        <dd>
          <input id="time" type="time" v-model="input.time" onblur="onBlurTime('time')"><br>
          <span><input type="checkbox" id="unknown_time" class="unknown_time" v-model="input.unknown" @change="change_unknown_time">{{ $t('calculator.set_datetime.unknown_time') }}</span>
        </dd>

        <dt>{{ $t('calculator.set_datetime.timezone') }}</dt>
        <dd>
          <select id="timezone" class="timezone" v-model="input.timezone">
            <option v-for="(list, l) in timezone_list" :key="l" :value="list.val">{{list.timezone}}{{list.city}}</option>
          </select>
        </dd>

        <dt>{{ $t('calculator.set_datetime.summertime') }}</dt>
        <dd class="radio_wrap">
          <div><input type="radio" value="1" class="summertime" name="summertime" id="summertime_yes" v-model="input.summertime"><span class="summertime">{{ $t('calculator.set_datetime.yes') }}</span></div>
          <div><input type="radio" value="0" class="summertime" name="summertime" id="summertime_no" v-model="input.summertime"><span class="summertime">{{ $t('calculator.set_datetime.no') }}</span></div>
        </dd>

        <div id="input_location">
          <dt>{{ $t('calculator.set_location.country_city') }}</dt>

          <dd>
            <div><input type="radio" value="input_city_name" class="how_to_input_city" name="how_to_input_city" id="how_to_input_city_by_city_name" @change="change_how_to_input_city" checked><span class="how_to_input_city">{{ $t('calculator.how_to_input_city.input_city_name') }}</span></div>
            <div><input type="radio" value="select_area" class="how_to_input_city" name="how_to_input_city" id="how_to_input_city_by_select_area" @change="change_how_to_input_city"><span class="how_to_input_city">{{ $t('calculator.how_to_input_city.select_area') }}</span></div>

            <div id="input_city_name_container">
              <input id="input_city" @keyup="keyup_input_city" v-model="input_city" placeholder="City name">
              <div id="input_city_list" v-if="input_cities && input_cities.length > 0">
                <ul>
                  <li
                    v-for="(city, i) in input_cities"
                    :key="i"
                    @click="click_input_city"
                    :data-city_ascii="city.city_ascii"
                    :data-lat="city.lat"
                    :data-lon="city.lon">
                    {{city.city_name}} ({{city.country_name}} / {{city.region_name}})
                  </li>
                </ul>
              </div>
            </div>

            <div id="select_area_container" style="display:none">
              <select id="country" class="country" v-model="input.country" @change="change_country">
                <option v-for="(list, l) in countries" :key="l" :value="list.iso2">{{list.country_name}}</option>
              </select>

              <select id="region" class="region" v-model="input.region" v-if="regions" @change="change_regions">
                <option v-for="(list, l) in regions" :key="l" :value="l">{{list.region_name}}</option>
              </select>

              <select id="city" class="city" v-model="input.city" v-if="cities" @change="change_cities">
                <option v-for="(list, l) in cities" :key="l" :value="l">{{list.city_name}}</option>
              </select>
            </div>
          </dd>

          <dt>{{ $t('calculator.set_location.lat_lon') }}</dt>
          <dd>
            <nobr>
              <select id="lat_ns" v-model="input.lat_ns" @change="change_lat_lon">
                <option value="N">{{ $t('calculator.set_location.north') }}</option>
                <option value="S">{{ $t('calculator.set_location.south') }}</option>
              </select>

              <select id="lat_degree" v-model="input.lat_degree" @change="change_lat_lon">
                <option v-for="n of 90" :key="n-1" :value="n-1">{{n-1}}</option>
              </select>
              <span>˚</span>

              <select id="lat_minute" v-model="input.lat_minute" @change="change_lat_lon">
                <option v-for="n of 60" :key="n-1" :value="n-1">{{n-1}}</option>
              </select>
              <span>′</span>
            </nobr>
            <br>
            <nobr>
              <select id="lon_ew" v-model="input.lon_ew" @change="change_lat_lon">
                <option value="E">{{ $t('calculator.set_location.east') }}</option>
                <option value="W">{{ $t('calculator.set_location.west') }}</option>
              </select>

              <select id="lon_degree" v-model="input.lon_degree" @change="change_lat_lon">
                <option v-for="n of 180" :key="n-1" :value="n-1">{{n-1}}</option>
              </select>
              <span>˚</span>

              <select id="lon_minute" v-model="input.lon_minute" @change="change_lat_lon">
                <option v-for="n of 60" :key="n-1" :value="n-1">{{n-1}}</option>
              </select>
              <span>′</span>
            </nobr>
          </dd>
        </div>

        <!-- パートナー -->
        <div class="input_wrap" id="set_datetime_partner">
          <h2 class="title">{{ $t('calculator.set_datetime.partner') }}</h2>

          <dt>{{ $t('calculator.set_datetime.year_month_day') }}</dt>
          <dd><input id="date_p" type="date" v-model="input.date_p"></dd>

          <dt>{{ $t('calculator.set_datetime.hour_minute') }}</dt>
          <dd>
          <input id="time_p" type="time" v-model="input.time_p"><br>
          <span><input type="checkbox" id="unknown_time_p" class="unknown_time" v-model="input.unknown_p" @change="change_unknown_time">{{ $t('calculator.set_datetime.unknown_time') }}</span>
          </dd>

          <dt>{{ $t('calculator.set_datetime.timezone') }}</dt>
          <dd>
          <select id="timezone_p" class="timezone" v-model="input.timezone_p">
            <option v-for="(list, l) in timezone_list" :key="l" :value="list.val">{{list.timezone}}{{list.city}}</option>
          </select>
          </dd>

          <dt>{{ $t('calculator.set_datetime.summertime') }}</dt>
          <dd class="radio_wrap">
            <div><input type="radio" value="1" class="summertime_p" name="summertime_p" id="summertime_yes_p" v-model="input.summertime_p"><span class="summertime">{{ $t('calculator.set_datetime.yes') }}</span></div>
            <div><input type="radio" value="0" class="summertime_p" name="summertime_p" id="summertime_no_p" v-model="input.summertime_p"><span class="summertime">{{ $t('calculator.set_datetime.no') }}</span></div>
          </dd>
        </div>

        <!-- トランジットー -->
        <div class="input_wrap" id="set_datetime_forecast">
          <h2 class="title">{{ $t('calculator.set_datetime.forecast') }}</h2>
          <p>{{ $t('calculator.set_datetime.forecast_text') }}</p>

          <dt>{{ $t('calculator.set_datetime.year_month_day') }}</dt>
          <dd><input id="date_f" type="date" v-model="input.date_f"></dd>
        </div>

        <button id="get_planet_position" @click="click_get_planet_position">{{ $t('calculator.set_datetime.calculate') }}</button>
        <!--<button id="replace_main_parnter" @click="click_replace_main_partner" v-if="is_partner">{{ $t('calculator.set_datetime.replace') }}</button>-->
      </div>
    </dl>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import define from '@/assets/js/define'
import planet_list from '@/assets/yml/planet.yml'
import axios from 'axios'
export default {
  name: 'Calculator',
  mixins:[Mixin],
  components: {
    //HomeHeader
  },
  data(){
    this.$route.query.n = this.adjustDatetimeQuery(this.$route.query.n)
    this.$route.query.p = this.adjustDatetimeQuery(this.$route.query.p)
    this.$route.query.f = this.adjustDatetimeQuery(this.$route.query.f)
    this.$route.query.nl = this.adjustLocationQuery(this.$route.query.nl)

    this.set_dateitime_to_pluto()

    return {
      result: this.get_result(),
      is_partner: null,
      is_forecast: null,

      datetime_view: this.get_datetime_view(this.$route),
      input: this.get_input(this.$route),
      countries: this.countries,
      regions: this.regions,
      cities: this.cities,
      input_city: this.input_city,
      input_cities: this.input_cities,
      timezone_list : [
        {val:-12, timezone:'UTC -12:00', city:''},
        {val:-11.5, timezone:'UTC -11:30', city:''},
        {val:-11, timezone:'UTC -11:00', city:''},
        {val:-10.5, timezone:'UTC -10:30', city:''},
        {val:-10, timezone:'UTC -10:00', city:' (Honolulu)'},
        {val:-9.5, timezone:'UTC -09:30', city:''},
        {val:-9, timezone:'UTC -09:00', city:' (Anchorage)'},
        {val:-8.5, timezone:'UTC -08:30', city:''},
        {val:-8, timezone:'UTC -08:00', city:' (Los Angeles, Vancouver)'},
        {val:-7.5, timezone:'UTC -07:30', city:''},
        {val:-7, timezone:'UTC -07:00', city:' (Denver, Calgary)'},
        {val:-6.5, timezone:'UTC -06:30', city:''},
        {val:-6, timezone:'UTC -06:00', city:' (Chicago, Mexico City)'},
        {val:-5.5, timezone:'UTC -05:30', city:''},
        {val:-5, timezone:'UTC -05:00', city:' (New York, Detroit)'},
        {val:-4.5, timezone:'UTC -04:30', city:''},
        {val:-4, timezone:'UTC -04:00', city:''},
        {val:-3.5, timezone:'UTC -03:30', city:''},
        {val:-3, timezone:'UTC -03:00', city:' (Rio)'},
        {val:-2.5, timezone:'UTC -02:30', city:''},
        {val:-2, timezone:'UTC -02:00', city:''},
        {val:-1.5, timezone:'UTC -01:30', city:''},
        {val:-1, timezone:'UTC -01:00', city:''},
        {val:-0.5, timezone:'UTC +00:30', city:''},
        {val:0, timezone:'UTC +00:00', city:' (London)'},
        {val:0.5, timezone:'UTC +00:30', city:''},
        {val:1, timezone:'UTC +01:00', city:' (Berlin, Paris, Rome)'},
        {val:1.5, timezone:'UTC +01:30', city:''},
        {val:2, timezone:'UTC +02:00', city:' (Cape Town, Athens, Jerusalem)'},
        {val:2.5, timezone:'UTC +02:30', city:''},
        {val:3, timezone:'UTC +03:00', city:' (Moscow)'},
        {val:3.5, timezone:'UTC +03:30', city:''},
        {val:4, timezone:'UTC +04:00', city:' (Dubai)'},
        {val:4.5, timezone:'UTC +04:30', city:''},
        {val:5, timezone:'UTC +05:00', city:''},
        {val:5.5, timezone:'UTC +05:30', city:' (Mumbai, New Delhi)'},
        {val:6, timezone:'UTC +06:00', city:''},
        {val:6.5, timezone:'UTC +06:30', city:''},
        {val:7, timezone:'UTC +07:00', city:''},
        {val:7.5, timezone:'UTC +07:30', city:''},
        {val:8, timezone:'UTC +08:00', city:' (Perth, Singapore, Beijing)'},
        {val:8.5, timezone:'UTC +08:30', city:''},
        {val:9, timezone:'UTC +09:00', city:' (Tokyo)'},
        {val:9.5, timezone:'UTC +09:30', city:' (Darwin, Adelaide)'},
        {val:10, timezone:'UTC +10:00', city:' (Sydney, Brisbane, Hobart)'},
        {val:10.5, timezone:'UTC +10:30', city:''},
        {val:11, timezone:'UTC +11:00', city:''},
        {val:11.5, timezone:'UTC +11:30', city:''},
        {val:12, timezone:'UTC +12:00', city:' (Auckland)'},
        {val:12.5, timezone:'UTC +12:30', city:''},
        {val:13, timezone:'UTC +13:00', city:''},
        {val:13.5, timezone:'UTC +13:30', city:''},
        {val:14, timezone:'UTC +14:00', city:''},
      ],


    }
  },
  created(){
    //this.setAstronomicalModel()
    this.set_default_cookie()
    this.set_result()
    this.set_countries()
  },
  mounted(){
    const to = this.$route
    this.input = this.get_input(to)

    this.set_partner(to)
    this.set_forecast(to)
    this.change_unknown_time()

  },
  watch:{
    '$route': function(to){
      this.set_partner(to)
      this.set_forecast(to)
      this.set_datetime_view(to, this.datetime_view)
      this.set_result()
    }
  },
  methods:{
    adjustDatetimeQuery(datetime_query){
      if(this.checkDatetimeQuery(datetime_query)) return datetime_query

      const current_dt = new Date()
      return current_dt.toStr('yyyyMMddHHmm') + current_dt.getTimezoneStr() + current_dt.getSummerWinter()
    },

    adjustLocationQuery(location_query){
      if(this.checkLocationQuery(location_query)) return location_query

      return 'N4500E09000'
    },

    click_article: function(){
      this.hide_set_datetime()
    },

    click_close(){
      this.hide_set_datetime()
    },

    click_close_input_modal(){
      this.input_cities = []
    },

    click_get_planet_position(){
      this.hide_set_datetime()

      const query = this.get_new_query_from_inputbox()

      this.set_datetime_view(this.$route, this.datetime_view)

      this.$router.push({query: query})

      this.set_dateitime_to_pluto()

      this.set_result()
    },

    click_input_city(e){
      this.input_city = e.target.dataset.city_ascii

      const lat = e.target.dataset.lat
      const lon = e.target.dataset.lon
      this.set_lat_lon(lat, lon)
    },

    click_replace_main_partner(){
      let _date = this.$$('#date').value;
      let _time = this.$$('#time').value;
      let _unknown = this.$$('#unknown_time').checked;
      let _timezone = this.$$('#timezone').value;
      let _summertime = this.$$('#summertime_yes').checked;
      this.$$('#date').value = this.$$('#date_p').value;
      this.$$('#time').value = this.$$('#time_p').value;
      this.$$('#unknown_time').checked = this.$$('#unknown_time_p').checked;
      this.$$('#timezone').value = this.$$('#timezone_p').value;
      if(this.$$('#summertime_yes_p').checked) this.$$('#summertime_yes').checked = true;
      else this.$$('#summertime_no').checked = true;
      this.$$('#summertime_yes').value = this.$$('#summertime_yes_p').value;
      this.$$('#date_p').value = _date;
      this.$$('#time_p').value = _time;
      this.$$('#unknown_time_p').checked = _unknown;
      this.$$('#timezone_p').value = _timezone;
      if(_summertime) this.$$('#summertime_yes_p').checked = true;
      else this.$$('#summertime_no_p').checked = true;
    },

    click_res_date_time(){
      this.toggle_set_datetime()
    },

    change_country: function(){
      this.cities = null
      const country_code = this.$$('#country').value

      this.set_regions(country_code)
      this.delete_lat_lon()
    },

    change_how_to_input_city: function(e){
      if(e.target.value === 'input_city_name'){
        this.$$('#input_city_name_container').style.display = 'block'
        this.$$('#select_area_container').style.display = 'none'
      }
      else{
        this.$$('#input_city_name_container').style.display = 'none'
        this.$$('#select_area_container').style.display = 'block'
      }
    },

    change_regions: function(){
      const region_code = this.$$('#region').value
      this.set_region(region_code)
    },

    change_cities: function(){
      const city_code = this.$$('#city').value
      this.set_city(city_code)
    },

    change_lat_lon: function(){
      this.input.region = null
      this.cities = null
    },

    change_unknown_time: function(){
      if(this.$$("#unknown_time")){
        if(this.$$("#unknown_time").checked){
          this.$$('#time').disabled = true

          this.$$('#input_location').style.display = 'none'
        }
        else{
          this.$$('#time').disabled = false

          this.$$('#input_location').style.display = 'block'
        }
      }

      if(this.$$("#unknown_time_p")){
        if(this.$$("#unknown_time_p").checked){
          this.$$('#time_p').disabled = true
        }
        else{
          this.$$('#time_p').disabled = false
        }
      }
    },

    delete_lat_lon(){
      this.input.lat_degree = 0
      this.input.lat_minute = 0
      this.input.lon_degree = 0
      this.input.lon_minute = 0
    },

    get_datetime_view(to){
      if(!to) return
      return {
        n: this.changeDatetimeQueryFormat(to.query.n, "TEXT"),
        p: this.changeDatetimeQueryFormat(to.query.p, "TEXT"),
        f: this.changeDatetimeQueryFormat(to.query.f, "TEXT_DATE"),
        //nl: this.changeLocationQueryFormat(to.query.nl, "TEXT"),
      }
    },

    get_input(to){
      let country_code = ''
      if(window.lang === 'ja'){
        country_code = 'JP'
        this.set_regions(country_code)
      }

      return {
        date: this.changeDatetimeQueryFormat(to.query.n, "yyyy-MM-dd"),
        time: this.changeDatetimeQueryFormat(to.query.n, "HH:mm"),
        timezone: this.changeDatetimeQueryFormat(to.query.n, "timezone"),
        summertime: this.changeDatetimeQueryFormat(to.query.n, "summertime_flg"),
        unknown: this.changeDatetimeQueryFormat(to.query.n, "unknown_flg"),
        date_p: this.changeDatetimeQueryFormat(to.query.p, "yyyy-MM-dd"),
        time_p: this.changeDatetimeQueryFormat(to.query.p, "HH:mm"),
        timezone_p: this.changeDatetimeQueryFormat(to.query.p, "timezone"),
        summertime_p: this.changeDatetimeQueryFormat(to.query.p, "summertime_flg"),
        unknown_p: this.changeDatetimeQueryFormat(to.query.p, "unknown_flg"),
        date_f: this.changeDatetimeQueryFormat(to.query.f, "yyyy-MM-dd"),
        lat_ns: this.changeLocationQueryFormat(to.query.nl, "NS"),
        lat_degree: this.changeLocationQueryFormat(to.query.nl, "lat_degree"),
        lat_minute: this.changeLocationQueryFormat(to.query.nl, "lat_minute"),
        lon_ew: this.changeLocationQueryFormat(to.query.nl, "EW"),
        lon_degree: this.changeLocationQueryFormat(to.query.nl, "lon_degree"),
        lon_minute: this.changeLocationQueryFormat(to.query.nl, "lon_minute"),
        country: country_code,
      }
    },


    get_new_query_from_inputbox(){
      let query = {}
      query.n = this.changeDatetimeToQuery(
        this.$$('#date').value,
        this.$$('#time').value,
        this.$$('#timezone').value,
        this.$$('#summertime_yes').checked,
        this.$$("#unknown_time").checked
      )
      if(this.$$('#date_p')){
        query.p = this.changeDatetimeToQuery(
          this.$$('#date_p').value,
          this.$$('#time_p').value,
          this.$$('#timezone_p').value,
          this.$$('#summertime_yes_p').checked,
          this.$$("#unknown_time_p").checked
        )
      }
      if(this.$$('#date_f')){
        query.f = this.changeDatetimeToQuery(
          this.$$('#date_f').value,
          '00:00',
          0,
          false,
          0
        )
      }
      query.nl = this.changeLocationToQuery(
        this.$$('#lat_ns').value,
        this.$$('#lat_degree').value,
        this.$$('#lat_minute').value,
        this.$$('#lon_ew').value,
        this.$$('#lon_degree').value,
        this.$$('#lon_minute').value,
      )
      query.m = this.$route.query.m
      return query
    },

    get_result(){
      //cookie
      if(this.n.pl.getPlanets() && this.main_planet_list){
        this.setImgCookie(this.n.pl.getPlanets()[this.main_planet_list[0]].longitude)

        if(this.$route.query.nl){
          const lat = this.changeLocationQueryFormat(this.$route.query.nl, 'lat_num')
          const lon = this.changeLocationQueryFormat(this.$route.query.nl, 'lon_num')
          this.n.pl.setGeoPosition(lat, lon)
        }
      }
      
      return {
        n:{
          pl: this.n.pl,
          query: this.$route.query.n,
          planets: this.addPlanetsInfo( this.n.pl.getPlanets(), this.n.pl.getHouses()),
          is_unknown: this.changeDatetimeQueryFormat(this.$route.query.n, 'unknown_flg'),
        },
        p:{
          query: this.$route.query.p,
        },
        f:{
          query: this.$route.query.f,
        },
        nl:{
          query: this.$route.query.nl,
        },
        current_planet_list: this.current_planet_list,
        main_planet_list: this.main_planet_list,
        planet_define_list: planet_list,
        m: this.$route.query.m ? this.$route.query.m : null,
      }
    },

    keyup_input_city: function(e){
      const val = e.target.value
      const key = val.toLowerCase().replace(/[^a-z]/g, '')

      if(key.length < 3){
        this.input_cities = []
        return
      }

      const alphabet_key = key.slice(0,3)

      if(this.alphabet_key === alphabet_key){
        this.set_input_cities(key)
      }
      else{
        this.alphabet_key = alphabet_key

        axios
        .get('https://search-city-json.s3-ap-northeast-1.amazonaws.com/v2/alphabets/'+alphabet_key+'.json')
        .then(response => {
          this.input_all_cities = response.data
          this.set_input_cities(key)
        })
        .catch(function(error){
          console.error(error)
        })
      }
    },

    set_city(city_code){
      const city_info = this.cities[city_code]
      const lat = parseFloat(city_info.lat)
      const lon = parseFloat(city_info.lon)

      this.input.city = city_code
      this.set_lat_lon(lat, lon)
    },

    set_countries(){
      axios
      .get('https://search-city-json.s3-ap-northeast-1.amazonaws.com/v2/countries/index.json')
      .then(response => (this.countries = response.data))
      .catch(function(error){
        console.error(error)
      })
    },

    set_datetime_view(to, view){
      if(!to) return
      return Object.assign(view, this.get_datetime_view(to))
    },

    set_dateitime_to_pluto(){
      if(!this.n) this.n = {}
      if(!this.p) this.p = {}
      if(!this.f) this.f = {}
      if(!this.nl) this.nl = {}

      if(!this.n.pl) this.n.pl = new window.Pluto()

      this.n.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.n, 'array'))
    },

    set_default_cookie(){
      this.$cookies.config(60 * 60 * 24 * 365, '')
      if(!this.$cookies.get('orb_midpoint')) this.$cookies.set('orb_midpoint', define.cookie.orb_midpoint)
      if(!this.$cookies.get('orb_harmonics')) this.$cookies.set('orb_harmonics', define.cookie.orb_harmonics)
      if(!this.$cookies.get('true_mean_node')) this.$cookies.set('true_mean_node', define.cookie.true_mean_node)
      if(!this.$cookies.get('true_mean_lilith')) this.$cookies.set('true_mean_lilith', define.cookie.true_mean_lilith)
      if(!this.$cookies.get('harmonics_range')) this.$cookies.set('harmonics_range', 0)
    },

    set_forecast(to){
      const service = to.name.replace('calculator_', '')

      if(service.isForecast()){
        this.is_forecast = true
        this.$$('html').classList.add('forecast');
      }
      else{
        this.is_forecast = false
        this.$$('html').classList.remove('forecast');
      }
    },

    set_input_cities(key){
      let input_cities = []
      this.input_all_cities.forEach((city)=>{
        if(city['city_key'].match(key)){
          input_cities.push(city)
        }
      })
      this.input_cities = input_cities
    },

    set_lat_lon(lat, lon){
      this.input.lat_ns = lat >= 0 ? 'N' : 'S'
      this.input.lat_degree = lat.intAbs()
      this.input.lat_minute = (lat.abs() % 1 * 60).int()
      this.input.lon_ew = lon >= 0 ? 'E' : 'W'
      this.input.lon_degree = lon.intAbs()
      this.input.lon_minute = (lon.abs() % 1 * 60).int()
    },

    set_partner(to){
      const service = to.name.replace('calculator_', '')

      if(service.isPartner()){
        this.is_partner = true
        this.$$('html').classList.add('partner');
      }
      else{
        this.is_partner = false
        this.$$('html').classList.remove('partner');
      }
    },

    set_planets(to, view){
      if(!to) return
      view.n = this.changeDatetimeQueryFormat(to.query.n, "TEXT")
      view.p = this.changeDatetimeQueryFormat(to.query.p, "TEXT")
      view.f = this.changeDatetimeQueryFormat(to.query.f, "TEXT_DATE")
    },

    set_region: function(region_code){
      this.input.region = region_code
      this.cities = this.regions[region_code].cities
      this.delete_lat_lon()

      if(Object.keys(this.cities).length === 1){
        const city_code = Object.keys(this.cities)[0]
        this.set_city(city_code)
      }
    },

    set_regions: function(country_code){
      this.cities = null

      axios
      .get('https://search-city-json.s3-ap-northeast-1.amazonaws.com/v2/countries/'+country_code+'.json')
      //.then(response => (this.regions = response.data))
      .then(response => {
        this.regions = response.data
        
        if(Object.keys(response.data).length === 1){
          const region_code = Object.keys(this.regions)[0]
          this.set_region(region_code)
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    set_cities: function(){

    },

    set_result(){
      this.setAstronomicalModel()
      this.result = this.get_result()
    }
  }
}
</script>

<style scoped lang="scss">
@import url("../assets/css/calculator.scss");
</style>