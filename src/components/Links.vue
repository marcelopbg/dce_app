<template>
  <div>
    <div v-if="admin===true&&!pageContent">
      <button v-on:click="startContent('sub2')" class="btn btn-primary">Inicia conteúdo</button>
    </div>
    <div class="row justify-content-center">
      <div v-for="(item, index) in pageContent" v-bind:key="index+'civil'" class="ml-4 mt-3 mb-2">
        <a
          class="btn btn-success btn-lg customLinkColor"
          v-if="admin===false"
          :href="item.link"
        >{{item.title}}</a>
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
                v-on:keyup="changeTitle(item.link, index, item.title)"
                v-model="item.title"
              >
              <br>
            </div>
            <div class="col-sm-7">
              <label for>
                <b>Link</b>
              </label>
              <input
                v-model="item.link"
                v-on:keyup="changeTitle(item.link, index, item.title)"
                class="form-control"
              >
              <div v-if="admin===true">
                <button
                  v-on:click="handleAddition(item.link, item.title)"
                  style="float:right;margin-bottom:5px; margin-left:3px;"
                  class="btn btn-primary"
                >
                  Novo Bloco
                  <b>+</b>
                </button>
                <button
                  style="float:right;margin-bottom:5px;"
                  v-on:click="handleDelete(index    )"
                  class="btn btn-danger"
                >
                  Remover Bloco
                  <b>-</b>
                </button>
              </div>
              <br>
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
let sitesRef = db.ref("site1").child("page3");

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
      sitesRef
        .push({ title: "titulo", link: "https://facebook.com" })
        .then(function() {
          _this.mountContent();
        });
    },
    mountContent() {
      var _this = this;
      sitesRef.once("value", snap => {
        _this.pageContent = snap.val();
      });
    },
    changeTitle(text, index, title) {
      sitesRef
        .child(index)
        .update({ link: text, title: title })
        .then(function(result) {
          console.log(result);
        });
    },
    handleAddition(text, title, context) {
      var _this = this;
      sitesRef.push({ link: text, title: title }).then(function(response) {
        _this.mountContent();
      });
    },
    handleDelete(index, context) {
      var _this = this;
      sitesRef
        .child(index)
        .remove()
        .then(function(response) {
          _this.mountContent();
        });
    }
  },
  data() {
    return {
      admin: false,
      pageContent: "",
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
#customLinkColor {
  background-color: rgb(56, 193, 114);
}
</style>
