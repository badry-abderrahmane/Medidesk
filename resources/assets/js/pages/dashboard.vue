<template lang="html">
  <div>
    <div class="ui  width center aligned padded grid">
        <div class="row">
            <div class="three wide olive column">
            Olive
            </div>
            <div class="ten wide black column">
            Black
            </div>
            <div class="three wide olive column">
            Black
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:'',
    }
  },
  created(){
    axios.get('/wayway')
      .then(response => {
        this.user = response.data;
    });
  }
}
</script>

<style lang="css">
</style>
