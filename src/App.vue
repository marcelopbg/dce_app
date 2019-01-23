<template>
  <div id="content">
    <div id="topBar">
<!--       <div style="float:left;margin-left:2%;">OAB/SP 418.342</div>
 -->      <div id="topIcons">
        <a href="">
        <img src="./img/fb.png" class=" m-2" style="width:30px;">
        </a>
        <a href="">
        <img src="./img/wpp.png" class=" m-2" style="width:30px;">
        </a>
        OAB/SP 418.342
      </div>
      <img src="./img/LOGO.png" class="img-fluid" id="logo">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mx-auto">
            <router-link :class="bindLinkClass('/')" to="/">Escritório</router-link>
            <router-link :class="bindLinkClass('/areasdeatuacao')" to="/areasdeatuacao">Área de Atuação</router-link>
            <router-link :class="bindLinkClass('/links')" to="/links">Links Úteis</router-link>
            <router-link :class="bindLinkClass('/equipe')" to="/equipe">Atualizações jurídicas</router-link>
          </div>
        </div>
      </nav>
    </div>
    <div class="container-fluid mt-5" id="mainContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  methods: {
    bindLinkClass(value) {
      if(value==this.$route.path) {
      return 'nav-item nav-link active'
      }else {
      return 'nav-item nav-link'
      }
      
    }
  },
  data() {
    return {
      //
    };
  },
  mounted() {},
};
</script>
<style>
#topIcons {
  margin-right: 5%;
  text-align: right;
}
#topBar {
  text-align: center;
}
#logo {
  height: 130px;
}
#mainContent {
}
nav {
  margin-top: 1%;
}
</style>
