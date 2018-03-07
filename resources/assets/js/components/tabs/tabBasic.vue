<template>
    <div class="ui grid">
        <div class="four wide column">
            <div class="ui vertical fluid tabular labeled icon menu">
                <a :class=" active == tab.id ? 'item active':'item' " v-for="tab in tabs" @click="active = tab.id" v-html="tab.name">
                </a>
            </div>
        </div>
        <div class="twelve wide stretched column">
            <div class="ui segment" v-for="tab in tabs" v-show="active == tab.id">
                <slot :name="'tab_'+tab.id" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["tabs"],
    data(){
        return {
            loading: true,
            active: 1,
            
        }
    },

   
}
</script>

<style lang="css">
</style>
