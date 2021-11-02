<template>
  <div>
    <div
      class="modal-parent d-flex align-items-center justify-content-center"
      :class="{ active: visible }"
    >
      <b-button variant="transparent" class="closeBtn" @click="closeModal()">
          <b-icon icon='dash-circle'></b-icon>
      </b-button>

        <div class="search-parent">
            <div class="search-field py-1 my-2">

          <b-form-input :class="inputClass" v-model="keyword" @input="$emit('search',keyword)" placeholder='Search For Something' class="p-2"></b-form-input>
            </div>
        
        <transition name="drd">
          <div class="w-100 drop-down rounded text-right" v-if="keyword">
            <small
              v-if="items.length == 0"
              class="d-inline-block px-1 py-1 m-0 text-secondary"
              >no results found !</small
            >
            <transition-group name="list" class="rounded" tag="ul" :class="listClass">
              <li
                class="list-item rounded"
                :class="itemClass"
                v-for="(item,index) in items"
                :key="index"
                @click="closeModal(item)"
              >
                <slot name='item' v-bind:listItem="item">
                    {{item}}
                </slot>
              </li>
            </transition-group>
          </div>
        </transition>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        items:Array,
        listClass:String,
        itemClass:String,
        inputClass:String
    },
  data: () => ({
    keyword: "",
    visible: true,
  }),
  computed: {

  },
  methods: {
    closeModal(item) {
      this.$emit('select',item)
      this.visible = false;
      this.keyword = "";
    },

  },
};
</script>
<style lang="scss" scoped>
::v-deep .navbar-toggler-icon {
  width: 1em !important;
  height: 1em !important;
}
.navbar {
  .serch-form {
    display: none;
  }
  .invisible {
    visibility: hidden;
  }
  background: dodgerblue;
  a.link {
    color: #fff;
    opacity: 0.6;
  }
  a.link.active {
    opacity: 1;
  }
}
.modal-parent {
  opacity: 0;
  visibility: hidden;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: fixed;
  z-index: 2;
  transition: 0.9s linear;
  
  .search-parent {
    display: flex;
    flex-direction: column;
    height: 50vh;
    width: 500px !important;
    max-width: 80vw;
    ::v-deep .form-control {
      padding: 20px;
      position: relative;
      z-index: 6;
    }
      z-index: 2;
  }
  .search-ok {
    position: relative;
    z-index: 5;
    left: 20px;
    top: 54px;
  }
  .closeBtn {
    transition: 0.8s linear;
    background-color: dodgerblue;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    padding: 0;
    position: absolute;
    left: 184px;
    top: 34px;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.9);
  }
}

.modal-parent.active {
  opacity: 1;
  visibility: visible;
  .closeBtn {
    box-shadow: 0 0 0 250vw rgba(0, 0, 0, 0.9);
    left: 204px;
  }
}
.drop-down {
  direction: rtl;
  position: relative;
  ul {
    list-style: none;
    padding: 0;
    padding-left: 10px;
    margin: 0;
    max-height: 300px;
    overflow: auto;
    background-color: transparent;
    li {
      font-size: 18px;
      cursor: pointer;
      border-bottom: 1px #ccc solid;
      background-color: #fff;
    }


    &::-webkit-scrollbar {
  width: 7px;
  z-index:0;
}
 
&::-webkit-scrollbar-track {
  background-color: #fff;
    border-radius: 3px 3px;
    transition: 1s;

}
 
&::-webkit-scrollbar-thumb {
  background-color: transparentize($color: dodgerblue, $amount: 0.2);
    border-radius: 5px 5px;

}
  }
}

@media (max-width: 767px) {
  .logo-search {
    flex-direction: row-reverse;
  }
  .nav-head {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
  }
  .container {
    display: flex;
    justify-content: flex-start !important;
  }
  #nav-collapse {
    margin: auto;
    height: 100%;
  }
  .navbar-nav {
    height: calc(100vh - 75px);
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    li {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin: 15px 0;
    }
  }
  .loggle {
    border: none !important;
    padding: 0;
    &:focus {
      border: none;
      outline: none;
    }
  }
  #search {
    display: none;
  }
  .search-form {
    display: flex;
  }
  .search-btn {
    position: relative;
    background-color: rgba(0, 0, 0, 0.055) !important;
    border: none;
    height: 25px;
    width: 25px;
    z-index: 1;
    left: 35px;
    &:focus {
      border: #777 1px !important;
    }
    &:active {
      border: #777 1px !important;
    }
  }

  .modal-parent {
    .closeBtn {
      left: 46px !important;
    }
  }
}

@keyframes slideDown {
  from{
    opacity: 0;
    transform: translateY(-50px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
}
.drd-enter-active{
  animation: slideDown .3s linear;
}

.drd-leave-active{
  animation: slideDown .3s linear reverse;

}
.list-item {
  transition: all 0.5s;
}
.list-enter, .list-leave-to
/* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}


</style>
