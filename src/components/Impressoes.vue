  <template>
  <div class="container">
    <div class="row justify-content-between">
      <div class="col-2">
        <h5 style="display:inline-block" class="mt-1">Impressões</h5>
        <button
          class="btn btn-primary ml-2"
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <b>+</b>
        </button>
      </div>
      <br>
      <br>
      <br>
      <div class="col-12">
        <div style="float:right" class="form-inline my-lg-0">
          <label for="bday" class="mr-1">Data início:</label>
          <input v-model="startDate" class="form-control mr-sm-2" type="date" name="bday">
          
          <label for="bday" class="mr-1">Data Final:</label>
          <input v-model="endDate" class="form-control mr-sm-2" type="date" name="bday">
          <label for="bday" class="mr-1">Nome:</label>
          <input v-model="search" type="text" class="form-control mr-sm-2">
          
          <button class="btn btn-secondary my-2 my-sm-0" type="submit" v-on:click="fetchSearch()">
            <i class="material-icons" style="font-size: 18px;padding-top:3px;">search</i>
          </button>
        </div>
      </div>
    </div>
    <table class="table table-striped mt-4">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Quem imprimiu</th>
          <th scope="col">Nº de Cópias corretas</th>
          <th scope="col">Nº de Cópias incorretas</th>
          <th>Nº total de cópias</th>
          <th>Data e hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in history" v-bind:key="key+'show'">
          <th scope="row">{{item.pedidoid}}</th>
          <td>{{item.nome}}</td>
          <td>{{item.copiacorreta}}</td>
          <td>{{item.copiaerrada}}</td>
          <td>{{item.copiacorreta+item.copiaerrada}}</td>
          <td>{{dateParse(item.datahora)}}</td>
        </tr>
      </tbody>
    </table>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nova impressão</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
          <div class="modal-body">
            Nº de Cópias corretas
            <input v-model="correctCopies" class="form-control" type="number">
            Nº de Cópias incorretas
            <input
              v-model="wrongCopies"
              class="form-control"
              type="number"
            >
            <div class="custom-control custom-checkbox mt-3 mb-3">
            <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="retroativeCheckBox">
            <label class="custom-control-label" for="customCheck1">Data retroativa</label>
          </div>
          <div v-if="retroativeCheckBox">
            <label>Data: </label>
            <input required v-model="formDate" class="form-control mr-sm-2" type="date" name="bday">
        <label for="appt">Hora: </label>
      <input class="form-control" v-model="formTime" type="time" id="appt" name="appt"
       min="0:00" max="24:00" required>
          </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-warning"
              v-on:click="submitForm(correctCopies, wrongCopies)"
            >Cadastrar</button>
            
          </div>
          </form>
        </div>
      </div>
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
        if (!_this.search) {
          axios({
            method: "get",
            url: "https://dce-ifc.herokuapp.com/api/pedidos/",
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(function(response) {
              if (response.data.length) {
                _this.history = response.data;
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
          axios({
            method: "get",
            url:
              "https://dce-ifc.herokuapp.com/api/pedidos/search?search=" +
              _this.search,
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(function(response) {
              if (response.data.length) {
                _this.history = response.data;
              }
            })
            .catch(function(error) {
             _this.mountContent()
            });
        }
      } else {
        this.$router.push("/login");
        return false;
      }
    },
    fetchSearch() {
      this.mountContent();
    },
    submitForm(correct, wrong) {
      var _this = this;
      if (localStorage.getItem("token")) {
        var token = localStorage.getItem("token");
        if(_this.retroativeCheckBox) {
          normalizeDate(_this.formDate, _this.formTime)
          return false;
        }
        axios({
          method: "post",
          url: "https://dce-ifc.herokuapp.com/api/pedidos/",
          headers: { Authorization: `Bearer ${token}` },
          data: {
            copiaCorreta: correct,
            copiaErrada: wrong
          }
        })
          .then(function(response) {
            _this.mountContent();
          })
          .catch(function(errror) {
            _this.$router.push("/login");
            return false;
          });
      }
    },
    normalizeDate(date, hour) {
      console.log(date);
      console.log(hour);
    },
    dateParse(date) {
      var d = new Date(date);
      var ano = d.getFullYear();
      var mes = d.getMonth();
      var dia = d.getDate();
      var hora = d.getHours();
      var minuto = d.getMinutes();
      // var segundo = d.getSeconds();
      switch (mes) {
        case 0:
          mes = "01";
          break;
        case 1:
          mes = "02";
          break;
        default:
        case 2:
          mes = "03";
          break;
        case 3:
          mes = "04";
          break;
        case 4:
          mes = "05";
          break;
        case 5:
          mes = "06";
          break;
        case 6:
          mes = "07";
          break;
        case 7:
          mes = "08";
          break;
        case 8:
          mes = "09";
          break;
        case 9:
          mes = "10";
          break;
        case 10:
          mes = "11";
          break;
        case 11:
          mes = "12";
          break;
      }

      return (
        dia + "/" + mes + "/" + ano + "  " + hora + ":" + minuto
        // + ":" + segundo
      );
    }
  },
  data() {
    return {
      history: "",
      search: "",
      correctCopies: "",
      wrongCopies: "",
      startDate: "",
      endDate: "",
      retroativeCheckBox: "",
      formDate: "",
      formTime: "",
    };
  },
  mounted() {
    this.mountContent();
  }
};
</script>

  <style scoped>
#search {
  float: right;
}
.nav-pills .nav-link {
  border-radius: 0.25rem;
  color: black;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: gray;
}
</style>
