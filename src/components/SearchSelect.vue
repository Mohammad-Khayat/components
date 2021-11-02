<template>
  <div>
    <div class="search-parent">
      <div class="search-field py-1 my-2">
        <b-form-input
          :class="inputClass"
          v-model="keyword"
          @input="$emit('search', keyword)"
          placeholder="Search For Something"
          class="p-2"
        ></b-form-input>
      </div>

      <transition name="drd">
        <div class="w-100 drop-down rounded text-right" v-if="keyword">
          <small
            v-if="items.length == 0"
            class="d-inline-block px-1 py-1 m-0 text-secondary"
            >no results found !</small
          >
          <transition-group
            name="list"
            class="rounded"
            tag="ul"
            :class="listClass"
          >
            <li
              class="list-item rounded"
              :class="itemClass"
              v-for="(item, index) in items"
              :key="index"
              @click="closeModal(item)"
            >
              <slot name="item" v-bind:listItem="item">
                {{ item }}
              </slot>
            </li>
          </transition-group>
        </div>
      </transition>
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
<style lang="scss">
.modal-parent {
  opacity: 0;
  visibility: hidden;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: fixed;
  transition: 0.9s linear;
  
  .search-parent {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 50vh;
    width: 500px !important;
    max-width: 80vw;
  }

  .closeBtn {
    transition: 0.8s linear;
    background-color: #777;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    padding: 0;
    position: absolute;
    top: 34px;
    left: 46px !important;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.9);
  }
  .drop-down {
  position: relative;
  ul {
    position: absolute;
    width: 100%;
    list-style: none !important;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow: auto;
    background-color: transparent;
    padding-right: 10px;
    li {
      text-align: left;
      cursor: pointer;
      margin: 10px 0;
      padding: 10px;
      background-color: #fff;
    }


    &::-webkit-scrollbar {
  width: 7px;
}
 
&::-webkit-scrollbar-track {
  background-color: #fff;
    border-radius: 3px 3px;
    transition: 1s;

} 
&::-webkit-scrollbar-thumb {
  background-color: transparentize($color: #777, $amount: 0.2);
    border-radius: 5px 5px;

}
  }
}
}

/*Vue Transitions */
.modal-parent.active {
  opacity: 1;
  visibility: visible;
  .closeBtn {
    box-shadow: 0 0 0 250vw rgba(0, 0, 0, 0.9);
    left: 204px;
  }
}
.drd-enter-active,.drd-leave-active{
  transition: .3s linear;

}
.drd-enter-from,.drd-leave-to{
  opacity: 0;
  transform: translateY(-50px);
}
.drd-enter-to,.drd-leave-from{
  opacity: 1;
  transform: translateY(0px);

}
.list-item {
  transition: all 0.5s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
