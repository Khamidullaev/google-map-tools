<template>
    <div class="toolBar">
        <button class="polygonButton" :class="{active: polygonActive}" @click="setPolygonActive"><img src="@/assets/icons/trapeze.svg"></button>
        <button class="measureButton" :class="{active: rulerActive}" @click="setRulerActive"><img src="@/assets/icons/triangular-ruler.svg"></button>
    </div>
</template>

<script>
export default {
    name: 'ToolBar',
    data() {
        return {

        }
    },
    computed: {
        polygonActive() {
            return this.$store.getters.polygonActive;
        },
        rulerActive() {
            return this.$store.getters.rulerActive;
        }
    },
    methods: {
        setPolygonActive() {
            this.$store.commit('setPolygonActive');
        },
         setRulerActive() {
            this.$store.commit('setRulerActive');
        }
    }
}
</script>

<style scoped>
    .toolBar {
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 1;
    }

    /* button {
        width: 50px;
        height: 50px;
        display: inline-block;
        padding: 15px 25px;
        cursor: pointer;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
    } */

    button {
        width: 50px;
        height: 50px;
        margin: 0 10px;
        background-color: rgb(224, 224, 224);
        outline: 0;
        /* box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.77); */
        box-shadow: 7px 7px #000;
        border: none;
        cursor: pointer;
        transition-duration: 0.5s;
    }

    button:active {
        box-shadow: 3px 3px #000;
        transform: translateY(4px);
        transform: translateX(4px);
        outline: 0;
    }

    .active {
        background-color: rgb(61, 190, 61); 
        box-shadow: 3px 3px #000;
        transform: translateY(4px);
        transform: translateX(4px);
    }
    
    img {
        width: 80%;
        height: 80%;
    }
</style>