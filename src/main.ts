import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'
// import { setupRouter } from './router'
// import { setupStore } from './store'
// import testPlugin from './test.plugin'


// createApp(App).mount('#app')

function bootstrap() {
  const app = createApp(App)
  // setupRouter(app)
  // setupStore(app)
  // app.use(testPlugin)
  app.mount('#app')
}

bootstrap()