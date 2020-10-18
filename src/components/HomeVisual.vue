<template>
  <div>
    <section id="home_background" v-bind:style="{ 'background-image':home.top.img }"></section>
    <section id="home_before_top"></section>
    <section id="home_top">
      <div class="text">
        <p>{{ home.top.current_sun_position }}</p>
        <p>{{ home.top.current_sabian_symbol }}</p>
        <p class="sabian">{{ home.top.sabian }}</p>
        <p>{{ home.top.until_next }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeVisual',
}
</script>