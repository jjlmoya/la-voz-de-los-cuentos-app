import InitialSetup from "../views/InitialSetup.vue";
import Splash from "../views/Splash.vue";

export default [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
      {
        path: '/setup',
        name: 'setup',
        component: InitialSetup
      },
]
