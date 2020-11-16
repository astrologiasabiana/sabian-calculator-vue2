<template>
  <div>
    <a onclick="toLang('')">English</a> |
    <a onclick="toLang('/ja')">日本語</a> |
    <a onclick="toLang('/fr')">français</a>
  </div>
</template>

<script>
export default {
  name: 'ComponentLang',
}
</script>
