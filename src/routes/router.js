import Home from '../components/Home.vue'
import areasDeAtuacao from '../components/areasDeAtuacao.vue'
import Links from '../components/Links'
const routes = [
    { path: '', component: Home },
    {path: '/areasdeatuacao', component: areasDeAtuacao},
    {path: '/links', component: Links}
  ]
  export default routes