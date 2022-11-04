import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import App from './App'
import router from './router'

Vue.use(ElementUI);

Vue.prototype.dayjs = dayjs
Vue.prototype.echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
