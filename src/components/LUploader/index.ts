import { App } from 'vue';
import Uploader from './Uploader.vue';

Uploader.install = (app: App) => {
  app.component(Uploader.name as string, Uploader);
};

export default Uploader;
