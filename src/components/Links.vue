<template>
  <div class="container">
   <h1></h1>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  /* computed: {
    rowCount:function(){     
      return Math.ceil(this.pageImages.length / this.itemsPerRow);
    },
  }, */
  watch: {
  },
  methods: {
    mountContent() {
      console.log('hey');
    }
  },
  data() {
    return {
    };
  },
  mounted() {

    this.mountContent();
  }
};
</script>

<style scoped>

</style>
