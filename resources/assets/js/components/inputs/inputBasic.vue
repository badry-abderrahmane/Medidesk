<template lang="html">
  <!-- <div class="four wide column">
    <div v-bind:class="[ value.errors.get(name) ? 'error' : '', 'field']">
      <label :for="name" class="control-label mb-10">{{ label }}</label>
      <input type="text" :id="name" :name="name"
                          
                          v-model="value[name]" />
      <div class="form-control-feedback" v-if="value.errors.has(name)" v-text="value.errors.get(name)"></div>
      <small class="helper"  v-if="value.errors.has(name)" v-text="value.errors.get(name)"></small>
    </div>
  </div> -->
  
    <div class="field">
      <label  class="control-label mb-10">{{ label }}</label>
      <input type="text" :name="name"
                          
                          />
      
      <small class="helper"  >test</small>
    </div>
  
</template>

<script>
export default {
  props:["value","name","label"],
}
</script>

<style lang="css">
    .helper {
        color: #9F3A38 !important;
    }
</style>
