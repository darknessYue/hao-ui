import { App } from 'vue';
import HButton from './HButton.vue';

HButton.install = (app: App) => {
  app.component(HButton.name as string, HButton);
};

export default HButton;