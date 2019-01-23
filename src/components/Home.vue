<template>
  <div>
    <div>
      <div v-if="admin===true&&Object.keys(content).length<=2">
        <button v-on:click="startContent()" class="btn btn-primary">Inicia conteúdo</button>
        <br>
        <br>
      </div>
      <div v-for="(item, index) in content" v-bind:key="index+'content'">
        <div v-if="index!=='pageImages'&&index!=='picNumber'">
          <h2 v-if="admin===false">{{item.title}}</h2>
          <p v-if="admin===false">{{item.text}}</p>
          <br>
          <div v-if="admin===true" class="card p-2">
            <div class="row">
              <div class="col-sm-3">
                <label for>
                  <b>Título</b>
                </label>
                <input
                  class="form-control"
                  type="text"
                  v-on:keyup="changeTitle(item.text, index, item.title)"
                  v-model="item.title"
                >
                <br>
              </div>
              <div class="col-sm-9">
                <label for>
                  <b>Texto</b>
                </label>
                <textarea
                  rows="8"
                  v-model="item.text"
                  v-on:keyup="changeTitle(item.text, index, item.title)"
                  class="form-control"
                  type="textarea"
                ></textarea>
                <br>
              </div>
            </div>
          </div>
          <div v-if="admin===true">
            <button
              v-on:click="handleAddition(item.text, item.title)"
              style="float:right;margin-bottom:5px; margin-left:3px;"
              class="btn btn-primary"
            >
              Novo Bloco
              <b>+</b>
            </button>
            <button
              style="float:right;margin-bottom:5px;"
              v-on:click="handleDelete(index)"
              class="btn btn-danger"
            >
              Remover Bloco
              <b>-</b>
            </button>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>

    <div class="galeria">
      <h3>Galeria</h3>

      <div v-if="admin===true" class="row">
        <br>
        <div class="col-sm-10">
          <input
            class="form-control"
            type="file"
            ref="fileInput"
            style
            accept="image/*"
            @change="onFilePicked"
          >
        </div>
        <div class="col-sm-2">
          <button class="btn btn-success ml-3" v-on:click="sendFile()">Enviar foto</button>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
      <div class="row" v-for="i in rowCount" v-bind:key="i+'rowcount'">
        <div
          v-for="item in itemCountInRow(i)"
          class="col-sm mb-3"
          style="width:100%;
    max-width:300px;"
        >
          <a v-if="admin===true" style="cursor:pointer" v-on:click="removeImage(item.url)">
            <span class="badge badge-pill badge-danger m-1" style="float:right">Remove X</span>
          </a>
          
          <img :src="item.url" class="img-thumbnail" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseConfigured.js";
let db = firebase.database();
let sitesRef = db.ref("site1").child("page1");

export default {
  name: "App",
  components: {},
  watch: {
    "$route.query.password"() {
      if (this.$route.query.password == 23457 && this.admin == false) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.pageImages.length / this.itemsPerRow);
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid field!");
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.fileName = files[0].name;
    },
    changeTitle(text, index, title) {
      sitesRef
        .child(index)
        .update({ text: text, title: title })
        .then(function(result) {
          console.log(result);
        });
    },
    handleAddition(text, title) {
      var _this = this;

      sitesRef.push({ text: text, title: title }).then(function(response) {
        _this.mountContent();
      });
    },
    sendFile() {
      var _this = this;
      const filename = this.fileName;
      const ext = filename.slice(filename.lastIndexOf("."));
      var picNumber = this.picNumber;
      firebase
        .storage()
        .ref("page1/" + _this.picNumber + ext)
        .put(_this.image)
        .then(function(response) {
          var responseObject = Object.values(response);
          _this.picNumber++;
          _this.updatePicCount();
          console.log(response.ref.name);

          firebase
            .storage()
            .ref("page1")
            .child(response.ref.name)
            .getDownloadURL()
            .then(function(url, id) {
              sitesRef.child("pageImages").push(url);
              _this.pageImages.push({ url: url });
            });
        });
    },
    handleDelete(index) {
      var _this = this;
      sitesRef
        .child(index)
        .remove()
        .then(function(response) {
          _this.mountContent();
        });
    },

    updatePicCount() {
      var newRef = sitesRef
        .update({ picNumber: this.picNumber })
        .then(function(response) {
          console.log(" oie", response);
        });
    },
    removeImage(url) {
      var _this = this;
      var urlToBeRemoved = url;
      firebase
        .storage()
        .refFromURL(url)
        .delete()
        .then(function(error) {
          sitesRef.child("pageImages").once("value", images => {
            images.forEach(image => {
              if (urlToBeRemoved === image.val()) {
                sitesRef
                  .child("pageImages")
                  .child(image.key)
                  .remove()
                  .then(function(response) {
                    _this.pageImages.forEach(function(item, index) {
                      if (item.url === urlToBeRemoved) {
                        _this.pageImages.splice(index);
                      }
                    });
                  });
              }
            });
          });
        });
    },
    startContent() {
      var _this = this;
      sitesRef.push({ title: "titulo", text: "texto" }).then(function() {
        _this.mountContent();
      });
    },
    mountContent() {
      sitesRef.once("value", snap => {
        var obj = Object.assign(snap.val());
        var key = Object.keys(snap.val());
        this.picNumber = obj.picNumber;
        this.itemKey = key;
        var firstKey = key[0];
        this.content = obj;
        this.newFileName = this.picNumber;
        this.loading = false;
        var _this = this;
        this.pageImages = [];
        sitesRef.child("pageImages").once("value", images => {
          var pageImages = Object.keys(images.val());
          var object = Object.values(images.val());
          object.forEach(image => {
            console.log(image);
            _this.pageImages.push({ url: image });
          });
        });
      });
    },
    itemCountInRow: function(index) {
      return this.pageImages.slice(
        (index - 1) * this.itemsPerRow,
        index * this.itemsPerRow
      );
    }
  },
  data() {
    return {
      content: "",
      itemKey: "",
      itemsPerRow: 6,
      loading: true,
      imageUrl: "",
      picNumber: 0,
      image: null,
      newFileName: "",
      fileName: "",
      pageImages: [],
      admin: false
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

<style>
</style>
