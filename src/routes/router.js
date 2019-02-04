import Usuarios from '../components/Usuarios.vue'
import Impressoes from '../components/Impressoes.vue'
/* import Links from '../components/Links'
 */import Login from '../components/Login'
const routes = [
    { path: '*', component: Login },
    {path: '/historico', component: Impressoes},
    {path: '/dashboard', component: Impressoes},
/*     {path: '/links', component: Links},
 */    {path: '/usuarios', component: Usuarios}
  ]
  export default routes