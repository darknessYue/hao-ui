// import { App } from 'vue';
import Uploader from './HUploader.vue';
import { withInstall } from '../../utils/helper';

// HUploader.install = (app: App) => {
//   app.component(HUploader.name as string, HUploader);
// };

const HUploader = withInstall(Uploader)

export default HUploader;
