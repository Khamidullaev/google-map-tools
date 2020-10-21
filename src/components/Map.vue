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
                    strokeColor: '#000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                }"
            />
            
        </GmapMap>
        
        
        <div class="measureArea" v-if="distance.length > 0">
            <div class="numberOfMarker">1</div>
            <div v-for="(item, index) in distance" class="distance">-- {{item}}km --<div class="numberOfMarker">{{index+2}}</div></div>

        </div>


    </div>
</template>

<script>
import Icon from '@/assets/icons/speech-bubble.png'
import ToolBar from '@/components/ToolBar.vue';

export default {
    name: 'Map',
    data() {
        return {
            polygonCor: [],
            polylineCor: [],
            markerOptions: [],
            distance: []
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
                this.distance = [];
            }
        },
        polylineCor:function() { 
            if(this.polylineCor.length > 1) {
                let cordinatesA = this.polylineCor[this.polylineCor.length - 1]
                let cordinatesB = this.polylineCor[this.polylineCor.length - 2]
                this.distance.push(this.calculateDistance(cordinatesA, cordinatesB))
                console.log(this.distance)
            }
            // let cordinatesA = this.polylineCor[0];
            // console.log(cordinatesA);
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
            }
        },

        addPolylinePoint: function(e) {
            if(this.rulerActive) {
                this.polylineCor.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
                this.markerOptions.push({
                    label: this.polylineCor.length + '',
                    icon: Icon
                })
            }
        },

        calculateDistance: function(cordinatesA, cordinatesB) {
             let gps1 = new google.maps.LatLng(cordinatesA.lat, cordinatesA.lng);
             let gps2 = new google.maps.LatLng(cordinatesB.lat, cordinatesB.lng);

            let distanceinMetre = 
            google.maps.geometry.spherical.
            computeDistanceBetween(gps1, gps2);

            return Math.floor(distanceinMetre)/1000;
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

    .measureArea {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border: 1px solid silver;
        font-size: 20px;
        font-family: sans-serif;
        display: flex;
        box-shadow: 9px -9px 5px 0px rgba(50, 50, 50, 0.75);
        flex-wrap: wrap;
    }

    .measureArea .numberOfMarker{
        background-color: #fff;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        flex-wrap: wrap;
        border: 2px solid black;
        box-sizing: border-box;
    }
    
    .distance {
        display: flex;
    }

</style>