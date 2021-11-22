<template>
  <div class="bg">
    <div
      id="bg_fancy"
    ></div>

  </div>
</template>

<script>
export default {
  computed: {

  },
};
</script>

<style lang="scss">
.bg {
  pointer-events: none;
  position: fixed;
  top: 0%;
  left: 0;
  width: 120%;
  height: 100vh;
  .hideImage {
    border-radius: 50% !important;
    height: 0% !important;
    width: 0% !important;
  }
  #bg_fancy {
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    border-radius: 0%;
    position: fixed;
    top: 0%;
    width: 100%;
    height: 100%;
    filter: blur(50px);
    opacity: 0.3;
  }
}
</style>
