import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NoteList from "./views/NoteList.vue";
import Project from "./views/Project.vue";
Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/note-list',
            name: 'note-list',
            component: NoteList

        },
      {
        path: '/project',
        name: 'project',
        component: Project

      },
        {
            path: '/article',
            name: 'article',
            query: { id: '' },
            component: () =>
                import ( /* webpackChunkName: "article" */ './views/Article.vue')
        }
    ]
})
