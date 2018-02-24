<template lang="html">
    <div class="ui vertical fluid menu">
        <a class="teal item" v-for="item in list" @click="filterTable(item.name)">
            {{ item.text }}
            <div class="ui teal left pointing label">{{ item.count }}</div>
        </a>
        <div class="item">
            <div class="ui transparent icon input">
            <input type="text" placeholder="Recherche..." v-model="filter">
            <i class="search icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["list"],
    data(){
        return {
            filter: ''
        }
    },
    watch:{
        filter: function (newVal,oldVal){
            Event.$emit('fill-filter', newVal);
        }
    },
    methods:{
        filterTable(param){
            Event.$emit('fill-filter', param);
        }
    }
}
</script>

<style lang="css">
</style>
