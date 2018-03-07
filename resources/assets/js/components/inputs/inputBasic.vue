<template lang="html">
    <div class="field">
      <label  class="control-label mb-10">{{ label }}</label>
      <input type="text" :id="name" :name="name"
                          v-model="value[name]"
                          />
      
      <small class="helper" v-if="value.errors.has(name)" v-text="value.errors.get(name)"></small>
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
