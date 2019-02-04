<template>
  <div class="col-sm-5 container">
    <div class="card">
      <div class="card-header">
        <h4 class="mt-3">Login</h4>
      </div>
      <div class="card-body">
        <div v-if="error" class="alert alert-danger">
          {{error}}
          </div>
        <form v-on:submit.prevent="loginRequest()">
          <div class="form-signin">
            <div class="form-label-group">
              <input
                type="text"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required
                autofocus
                v-model="login"
              >
              <label class="ml-1" for="inputEmail">Email address</label>
            </div>
            <div class="form-label-group">
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
                v-model="senha"
              >
              <label class="ml-1" for="inputPassword">Password</label>
            </div>
            <button style="float:right" class="btn btn-primary" value="Submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  watch: {
  },
  methods: {
    mountContent() {
      if(localStorage.getItem('token')) {
        this.$router.push('historico')
      }else { this.$router.push('/login')
      }
    },
    loginRequest() {
      var _this = this;
      console.log("login test");

      // ROTA PARA PRODUÇÃ0 ../../login/in
      axios
        .post("https://dce-ifc.herokuapp.com/login/in", {
          login: this.login,
          senha: this.senha
        })
        .then(function(response) {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            _this.$router.push({ path: "/historico" });
          } else {
            _this.error = 'Não foi possível logar'

            return false;
          }
        }).catch(function(eror) {
            _this.error = 'Não foi possível logar'
            return false;

        });
    }
  },
  data() {
    return {
      login: "",
      senha: "",
      error: ""
    };
  },
  mounted() {
    this.mountContent();
  }
};
</script>

<style scoped>
.form-control {
  height: calc(3.2rem + 2px);
}
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>
