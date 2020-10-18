<template>
  <div>
    <router-view :current="current"></router-view>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
export default {
  name: 'Symbols',
  mixins:[Mixin],
  props: {
    current: Object,
  },
}

</script>

<style>
@import url("../assets/css/symbols.scss");
</style>