<template>
  <div class="home">
{{filteredList}}
<search-modal @search='filter' :items="filteredList" itemClass="">
  <template slot="item" slot-scope="{listItem}">
    <h5 class="text-primary m-0 text-center">{{listItem.name}}</h5> 
  </template>

</search-modal>
  
  </div>
</template>


<script>
import SearchModal from '../components/SearchModal.vue'
// @ is an alias to /src
import {mapGetters,mapMutations} from 'vuex'
export default {
  name: 'Home',

  components: {
    SearchModal
  },

  computed:{
    ...mapGetters(['filteredList'])
  },
  methods:{
    filter(el){
      console.log(el)
      this.setKeyWord(el)
    },
    ...mapMutations(['setKeyWord'])
  }




}
</script>
