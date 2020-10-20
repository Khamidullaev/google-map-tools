<template>
    <div class="map">
        <ToolBar />
        <GmapMap
            @click="mapClick"
            :center="{lat: 40.774102, lng: -73.971734}"
            :zoom="15"
            style="width: 100%; height: 100%"
            :draggableCursor="'pointer'"
            :options="{
                zoomControl: true,
                draggableCursor:'pointer'
            }"
        >
            <GmapPolygon 
                :paths="polygonCor"
                :strokeColor="'#FF0000'"
                :strokeOpacity="0.8"
                :strokeWeight="2"
                :fillColor="'FF0000'"
                :editable="true"
                :fillOpacity="0.35"
                :geodesic="true"
            />
            <!-- <GmapMarker 
                :position="{lat: 40.7767644, lng: -73.9761399}"
                :options="{
                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
                    label: '1'
                }"
            /> -->
            <GmapMarker 
                v-for="(marker, index) in polylineCor"
                :position = "marker" 
                :options="markerOptions[index]"
            />

            <GmapPolyline
                :path="polylineCor"
                :editable="false"
                :options="{
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                }"
            />

        </GmapMap>
        <div class="measureArea">1 -> 2 -> 3 -> 4</div>
    </div>
</template>

<script>
import Icon from '@/assets/icons/trapeze.svg'
import ToolBar from '@/components/ToolBar.vue';

export default {
    name: 'Map',
    data() {
        return {
            polygonCor: [],
            polylineCor: [],
            markerOptions: []
        }
    },
    
    watch: {
        polygonActive:function() {
            if(!this.polygonActive) {
                this.polygonCor = [];
            }
        },
        rulerActive:function() {
            if(!this.rulerActive) {
                this.polylineCor = [];
            }
        }
    },

    components: {
        ToolBar
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
        mapClick: function(e) {
           this.addPoint(e);
            this.addPolylinePoint(e)
        },

        addPoint: function(e) {
            if(this.polygonActive) {
            this.polygonCor.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
            console.log(this.polygonCor);}
        },

        addPolylinePoint: function(e) {
            if(this.rulerActive) {
                this.polylineCor.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
                this.markerOptions.push({label: this.polylineCor.length + ''})
            }
        },

        calculateDistance: function() {
             let gps1 = new google.maps.LatLng(41.293834, 69.246102);
             let gps2 = new google.maps.LatLng(41.297850, 69.249523);

            let distanceinMetre = 
            google.maps.geometry.spherical.
            computeDistanceBetween(gps1, gps2);

             alert(distanceinMetre);
        }

    },

    // computed: {
    //     polygonCor() {
    //          return this.$store.getters.polygonCor
    //     }
    // }
}
</script>

<style scoped>
    .map {
        margin-top: 25px;
        width: 100%;
        height: 550px;
        position: relative;
    }

    

</style>