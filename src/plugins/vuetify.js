import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
  themes: {
    light: {
      primary: "#ee44aa",
      secondary: "#424242",
      accent: "#82B1FF",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107"
    }
},
  customProperties: true
  });

const vuetify = new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    light: true
  }
});

export default vuetify
