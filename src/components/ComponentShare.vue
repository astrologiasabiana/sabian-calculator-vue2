<template>
  <section id="share">

    <div>{{ $t('common.share.normal') }}</div>
    <div>
      <a :href="'//twitter.com/share?url=https://sabian-calculator.com'+path+img_query+'&hashtags=SabianCalculator&text='" target="_blank">
        <img src="/img/icon/twitter.svg">
      </a>

      <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://sabian-calculator.com'+path+img_query" target="_blank" rel="nofollow noopener noreferrer">
        <img src="/img/icon/facebook.svg">
      </a>

<!--      <img src="/img/icon/copy.svg" v-on:click="click.click_copy">
      <textarea id="copyTarget" style="position:absolute; left:-9999px; top:0px;" readonly="readonly"> https://sabian-calculator.com{{path}}</textarea>-->
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComponentShare',
  data(){
    return {
      path: this.path,
      img_query: this.img_query,
      title: 'aaa',
    }
  },
  watch:{
    '$route': function(){
      this.path = this.$route.path
      this.img_query = this.$cookies.get('img') ? '?img='+this.$cookies.get('img') : ''
    }
  }
}
</script>

