<template>
  <footer>
    <p>
      <ComponentLang></ComponentLang>
    </p>
    <p class="sns">
      <a href="https://www.instagram.com/rubyfmzk/" target="_blank">
        <img src="/img/icon/instagram.svg">
      </a>
      <a :href="'https://twitter.com/'+$t('common.twitter')" target="_blank">
        <img src="/img/icon/twitter.svg">
      </a>

      <a href="https://www.facebook.com/rubyfumizki/" target="_blank">
        <img src="/img/icon/facebook.svg">
      </a>
    </p>
    <p class="copyright">©2020 Sabian Calculator All rights reserved.</p>
  </footer>
</template>

<script>
import ComponentLang from '@/components/ComponentLang'
export default {
  name: 'ComponentFooter',
  components: {
    ComponentLang,
  },
  data(){
    return {
    }
  }
}
</script>

