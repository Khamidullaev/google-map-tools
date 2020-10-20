import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    polygonActive: false,
    rulerActive: false,
    polygonCor: [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
    ]
  },
  mutations: {
    setPolygonActive(state, payload) {
      state.polygonActive = !state.polygonActive;
    },

    setRulerActive(state, payload) {
      state.rulerActive = !state.rulerActive;
    },

    addPoint(state, payload) {
      
    }
  },

  actions: {
  },
  getters: {
    polygonActive(state) {
      return state.polygonActive
    },

    rulerActive(state) {
      return state.rulerActive
    },

    polygonCor(state) {
      return state.polygonCor
    }
  }
});
