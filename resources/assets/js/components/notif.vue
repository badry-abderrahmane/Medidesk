<template>
    <div class="ui simple dropdown item">
        <i class="history icon"></i><label class="ui red small floating circular label label-notif" v-if="countNotifs > 0">{{ countNotifs }}</label>
        <div class="menu menu-notif">
           
            <div class="item" @for="notif in notifs">
                <div class="content">
                    <div class="ui blue message">
                        <p class="force-wrap"><i class="info circle icon"></i>{{ notif.message }}</p>
                    </div>
                </div>
            </div>
            <div class="ui divider"></div>
            <div class="item">
                <div class="content">
                    <button class="fluid ui button"><i class="eye icon"></i>Voir toutes les notifications</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                notifs: []
            }
        },
        created() {
            this.echoListen();
        },
        computed:{
            countNotifs: function(){
                return this.notifs.length
            }
        },
        methods: {
            echoListen() {
                Echo.channel('ClientChange')
                    .listen('ClientAdded', (data) => {
                        this.notifs.push(data)
                        Event.$emit('load-clients-list');
                    });
            }
        }
    }
</script>


<style lang="css">
    .label-notif {
        font-size: .7rem !important;
        top: .3em !important;
        left: 80% !important;
    }
    .menu-notif{
        width: 350px !important;
    }
    .force-wrap {
        white-space: pre-wrap;
        white-space: -o-pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -hp-pre-wrap;
        word-wrap: break-word;
    }
</style>
