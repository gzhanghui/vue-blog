import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/display.css';
import {Button, Row, Col, Icon, Dialog, Input, Link, Backtop, Message, Popover,Collapse,Container,Main,Header,Scrollbar} from 'element-ui';
import DrawerLayout from 'vue-drawer-layout'

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
Vue.use(Collapse);
Vue.use(Main);
Vue.use(Container);
Vue.use(Header);
Vue.use(Scrollbar);
Vue.use(DrawerLayout);

Vue.prototype.$message = Message;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
