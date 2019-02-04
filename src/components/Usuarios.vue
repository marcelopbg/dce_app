<template>
  <div class="container">
    <div class="row">
      <h5 class="mt-1">Impressões</h5>
      <button class="btn btn-primary ml-2">
        <b>+</b>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},

  watch: {},
  methods: {
    mountContent() {
      var _this = this;
      if (localStorage.getItem("token")) {
        var token = localStorage.getItem("token");
        /*         return axios.get(URLConstants.USER_URL, { headers: { Authorization: `Bearer ${data.token}` } });
         */
        axios({
          method: "get",
          url: "https://dce-ifc.herokuapp.com/api/usuarios",
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(function(response) {
            if (response) {
            } else {
              localStorage.removeItem("token");
              _this.$router.push("/login");
            }
          })
          .catch(function(error) {
            localStorage.removeItem("token");

            _this.$router.push("/login");
          });
      } else {
        localStorage.removeItem("token");

        this.$router.push("/login");
        return false;
      }
    }
  },
  data() {
    return {
      history: ""
    };
  },
  mounted() {
    if (this.$route.query.password == 23457) {
      this.admin = true;
    } else {
      this.admin = false;
    }
    this.mountContent();
  }
};
</script>

<style scoped>
.nav-pills .nav-link {
  border-radius: 0.25rem;
  color: black;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: gray;
}
</style>
