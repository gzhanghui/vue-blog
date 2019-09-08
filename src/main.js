import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Row, Col, Icon, Dialog, Input, Link, Backtop, Message, Popover} from 'element-ui';

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Link);
Vue.use(Backtop);
Vue.use(Popover);
Vue.prototype.$message = Message;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
