<template>
  <div class="container">
    <div class="card">
      <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >Cívil</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >Previdenciário</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >Direito do Consumidor</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-extra-tab"
            data-toggle="pill"
            href="#pills-extra"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >Direito Comercial</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="container">
            <div v-if="admin===true&&!page1Content">
              <button v-on:click="startContent('sub1')" class="btn btn-primary">Inicia conteúdo</button>
            </div>
            <br>
            <br>

            <p v-if="admin===false" style="text-align:center">{{this.page1Title}}</p>

            <input
              v-if="admin===true"
              v-on:keyup="changeTitle(page1Title, '', '', 'sub1Title')"
              class="form-control"
              type="text"
              v-model="page1Title"
            >
            <div class="row">
              <div
                v-for="(item, index) in page1Content"
                v-bind:key="index+'civil'"
                class="col col-lg-4 mt-3 mb-2 text-center"
              >
                <h5 v-if="admin===false">{{item.title}}</h5>
                <p v-if="admin===false">{{item.text}}</p>
                <br>
                <div v-if="admin===true" class="card p-2">
                  <div class="row">
                    <div class="col-sm-5">
                      <label for>
                        <b>Título</b>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub1')"
                        v-model="item.title"
                      >
                      <br>
                    </div>
                    <div class="col-sm-7">
                      <label for>
                        <b>Texto</b>
                      </label>
                      <textarea
                        rows="8"
                        cols="5"
                        v-model="item.text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub1')"
                        class="form-control"
                        type="textarea"
                      ></textarea>

                      <br>
                    </div>
                  </div>
                </div>
                <div v-if="admin===true">
                  <button
                    v-on:click="handleAddition(item.text, item.title, 'sub1')"
                    style="float:right;margin-bottom:5px; margin-left:3px;"
                    class="btn btn-primary"
                  >
                    Novo Bloco
                    <b>+</b>
                  </button>
                  <button
                    style="float:right;margin-bottom:5px;"
                    v-on:click="handleDelete(index, 'sub1')"
                    class="btn btn-danger"
                  >
                    Remover Bloco
                    <b>-</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div class="container">
            <div v-if="admin===true&&!page2Content">
              <button v-on:click="startContent('sub2')" class="btn btn-primary">Inicia conteúdo</button>
            </div>
            <br>
            <br>
            <div class="row">
              <div
                v-for="(item, index) in page2Content"
                v-bind:key="index+'civil'"
                class="col col-lg-4 mt-3 mb-2 text-center"
              >
                <h5 v-if="admin===false">{{item.title}}</h5>
                <p v-if="admin===false">{{item.text}}</p>
                <br>
                <div v-if="admin===true" class="card p-2">
                  <div class="row">
                    <div class="col-sm-5">
                      <label for>
                        <b>Título</b>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub2')"
                        v-model="item.title"
                      >
                      <br>
                    </div>
                    <div class="col-sm-7">
                      <label for>
                        <b>Texto</b>
                      </label>
                      <textarea
                        rows="8"
                        cols="5"
                        v-model="item.text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub2')"
                        class="form-control"
                        type="textarea"
                      ></textarea>

                      <br>
                    </div>
                  </div>
                </div>
                <div v-if="admin===true">
                  <button
                    v-on:click="handleAddition(item.text, item.title, 'sub2')"
                    style="float:right;margin-bottom:5px; margin-left:3px;"
                    class="btn btn-primary"
                  >
                    Novo Bloco
                    <b>+</b>
                  </button>
                  <button
                    style="float:right;margin-bottom:5px;"
                    v-on:click="handleDelete(index, 'sub2')"
                    class="btn btn-danger"
                  >
                    Remover Bloco
                    <b>-</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          <div class="container">
            <div v-if="admin===true&&!page3Content">
              <button v-on:click="startContent('sub3')" class="btn btn-primary">Inicia conteúdo</button>
            </div>
            <br>
            <br>
            <div class="row justify-content-md-center">
              <div
                v-for="(item, index) in page3Content"
                v-bind:key="index+'civil'"
                class="col col-lg-12 mt-3 mb-2 text-center"
              >
                <h5 v-if="admin===false">{{item.title}}</h5>
                <p v-if="admin===false">{{item.text}}</p>
                <br>
                <div v-if="admin===true" class="card p-2">
                  <div class="row">
                    <div class="col-sm-5">
                      <label for>
                        <b>Título</b>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub3')"
                        v-model="item.title"
                      >
                      <br>
                    </div>
                    <div class="col-sm-7">
                      <label for>
                        <b>Texto</b>
                      </label>
                      <textarea
                        rows="8"
                        cols="5"
                        v-model="item.text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub3')"
                        class="form-control"
                        type="textarea"
                      ></textarea>

                      <br>
                    </div>
                  </div>
                </div>
                <div v-if="admin===true">
                  <button
                    v-on:click="handleAddition(item.text, item.title, 'sub3')"
                    style="float:right;margin-bottom:5px; margin-left:3px;"
                    class="btn btn-primary"
                  >
                    Novo Bloco
                    <b>+</b>
                  </button>
                  <button
                    style="float:right;margin-bottom:5px;"
                    v-on:click="handleDelete(index, 'sub3')"
                    class="btn btn-danger"
                  >
                    Remover Bloco
                    <b>-</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-extra"
          role="tabpanel"
          aria-labelledby="pills-extra-tab"
        >
          <div class="container">
            <div v-if="admin===true&&!page4Content">
              <button v-on:click="startContent('sub4')" class="btn btn-primary">Inicia conteúdo</button>
            </div>
            <br>
            <br>
            <div class="row justify-content-md-center">
              <div
                v-for="(item, index) in page4Content"
                v-bind:key="index+'civil'"
                class="col col-lg-12 mt-3 mb-2 text-center"
              >
                <h5 v-if="admin===false">{{item.title}}</h5>
                <p v-if="admin===false">{{item.text}}</p>
                <br>
                <div v-if="admin===true" class="card p-2">
                  <div class="row">
                    <div class="col-sm-5">
                      <label for>
                        <b>Título</b>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub4')"
                        v-model="item.title"
                      >
                      <br>
                    </div>
                    <div class="col-sm-7">
                      <label for>
                        <b>Texto</b>
                      </label>
                      <textarea
                        rows="8"
                        cols="5"
                        v-model="item.text"
                        v-on:keyup="changeTitle(item.text, index, item.title, 'sub4')"
                        class="form-control"
                        type="textarea"
                      ></textarea>

                      <br>
                    </div>
                  </div>
                </div>
                <div v-if="admin===true">
                  <button
                    v-on:click="handleAddition(item.text, item.title, 'sub4')"
                    style="float:right;margin-bottom:5px; margin-left:3px;"
                    class="btn btn-primary"
                  >
                    Novo Bloco
                    <b>+</b>
                  </button>
                  <button
                    style="float:right;margin-bottom:5px;"
                    v-on:click="handleDelete(index, 'sub4')"
                    class="btn btn-danger"
                  >
                    Remover Bloco
                    <b>-</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseConfigured.js";
let db = firebase.database();
let sitesRef = db.ref("site1").child("page2");
let sub1 = db
  .ref("site1")
  .child("page2")
  .child("subPage1");
let sub2 = db
  .ref("site1")
  .child("page2")
  .child("subPage2");
let sub3 = db
  .ref("site1")
  .child("page2")
  .child("subPage3");
let sub4 = db
  .ref("site1")
  .child("page2")
  .child("subPage4");

export default {
  name: "App",
  components: {},
  /* computed: {
    rowCount:function(){     
      return Math.ceil(this.pageImages.length / this.itemsPerRow);
    },
  }, */
  watch: {
    "$route.query.password"() {
      if (this.$route.query.password == 23457 && this.admin == false) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    }
  },
  methods: {
    startContent(page) {
      var _this = this;
      switch (page) {
        case "sub1":
          sub1.push({ title: "titulo", text: "texto" }).then(function() {
            _this.mountContent();
          });
          break;
        case "sub2":
          sub2.push({ title: "titulo", text: "texto" }).then(function() {
            _this.mountContent();
          });
          break;
        case "sub3":
          sub3.push({ title: "titulo", text: "texto" }).then(function() {
            _this.mountContent();
          });
          break;
        case "sub4":
          sub4.push({ title: "titulo", text: "texto" }).then(function() {
            _this.mountContent();
          });
          break;
        default:
          break;
      }
    },

    mountContent() {
      var _this = this;
      sub1.once("value", snap => {
        _this.page1Content = snap.val();
      });
      sitesRef.child("subPage1Title").once("value", snap => {
        _this.page1Title = snap.val();
      });
      sub2.once("value", snap => {
        _this.page2Content = snap.val();
      });
      sub3.once("value", snap => {
        _this.page3Content = snap.val();
      });
      sub4.once("value", snap => {
        _this.page4Content = snap.val();
      });
    },
    changeTitle(text, index, title, context) {
      switch (context) {
        case "sub1":
          sub1
            .child(index)
            .update({ text: text, title: title })
            .then(function(result) {
              console.log(result);
            });
          break;
        case "sub2":
          sub2
            .child(index)
            .update({ text: text, title: title })
            .then(function(result) {
              console.log(result);
            });
          break;
        case "sub3":
          sub3
            .child(index)
            .update({ text: text, title: title })
            .then(function(result) {
              console.log(result);
            });
          break;
        case "sub4":
          sub4
            .child(index)
            .update({ text: text, title: title })
            .then(function(result) {
              console.log(result);
            });
          break;
        case "sub1Title":
          console.log("here", title);

          sitesRef.update({ subPage1Title: text });
          break;

        default:
          break;
      }
    },
    handleAddition(text, title, context) {
      var _this = this;
      switch (context) {
        case "sub1":
          sub1.push({ text: text, title: title }).then(function(response) {
            _this.mountContent();
          });
          break;
        case "sub2":
          sub2.push({ text: text, title: title }).then(function(response) {
            _this.mountContent();
          });
          break;
        case "sub3":
          sub3.push({ text: text, title: title }).then(function(response) {
            _this.mountContent();
          });
          break;
        case "sub4":
          sub4.push({ text: text, title: title }).then(function(response) {
            _this.mountContent();
          });
          break;
        default:
          break;
      }
    },
    handleDelete(index, context) {
      var _this = this;
      switch (context) {
        case "sub1":
          sub1
            .child(index)
            .remove()
            .then(function(response) {
              _this.mountContent();
            });
          break;
        case "sub2":
          sub2
            .child(index)
            .remove()
            .then(function(response) {
              _this.mountContent();
            });
          break;
        case "sub3":
          sub3
            .child(index)
            .remove()
            .then(function(response) {
              _this.mountContent();
            });
          break;
        case "sub4":
          sub4
            .child(index)
            .remove()
            .then(function(response) {
              _this.mountContent();
            });
          break;
        default:
          break;
      }
    }
  },
  data() {
    return {
      admin: false,
      page1Title: "",
      page1Content: "",
      page2Content: "",
      page3Content: "",
      page4Content: "",
      itemKey: "",
      itemsPerRow: 6,
      loading: true,
      imageUrl: "",
      picNumber: 0,
      image: null,
      newFileName: "",
      fileName: "",
      pageImages: []
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
