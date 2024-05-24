// import { App } from 'vue';
import { withInstall } from '../../utils/helper';
import Text from './HText.vue';

// HText.install = (app: App) => {
//   app.component(HText.name as string, HText);
// };
const HText = withInstall(Text);

export default HText;