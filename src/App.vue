<template>
  <div id="content">
    <div id="topBar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Sistema de Repografia - DCE</a>
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
          <ul class="navbar-nav mr-auto" v-if="admin===true">
            <router-link :class="bindLinkClass('/historico')" to="/historico">Impressões</router-link>
            <router-link
              :class="bindLinkClass('/usuarios')"
              to="/usuarios"
            >Usuários</router-link>
<!--             <router-link :class="bindLinkClass('/links')" to="/links">Links Úteis</router-link>
            <router-link :class="bindLinkClass('/equipe')" to="/equipe">Atualizações jurídicas</router-link> -->
          </ul>
          <div v-if="admin===true" class="my-2 my-lg-0">
      <button class="btn btn-outline-danger my-2 my-sm-0" v-on:click="logoff()" >Logout </button>
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
  watch: {
    '$route' (to, from) {      
      if(!from.path)
 {
   this.$router.push('/login')
 }      // react to route changes...
      if(to.path=='/login') {
        this.admin=false
      }else {
        this.admin=true
      }
      
    }
  },
  methods: {
    bindLinkClass(value) {
      if (value == this.$route.path) {
        return "nav-item nav-link active";
      } else {
        return "nav-item nav-link";
      }
    },
    mountContent() {
      
      if(localStorage.getItem('token')) {
        this.admin=true;
        this.$router.push('historico')
      }else { this.$router.push('/login')
      }
    },
    logoff() {
      localStorage.removeItem('token');
      this.$router.push('/login')
    }
  },
  data() {
    return {
      admin: false,
      //
    };
  },
  mounted() {
    this.mountContent();
  }
};
</script>
<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>
