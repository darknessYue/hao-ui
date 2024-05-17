import { App } from "vue";
import LText from "./components/LText";
import LUploader from "./components/LUploader";
import HButton from "./components/HButton";
export type { commonDefaultProp, textDefaultProp, imageCommponentsProp, buttonDefaultProp } from "./defaultProps"
export { commonDefaultProps, textDefaultProps, imageDefaultProps, isEditingProp, textStylesProps, imageStylesProps, transformToComponentProps, buttonDefaultProps, buttonStylesProps } from "./defaultProps"

const components = [
  LText,
  LUploader,
  HButton
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name!, component)
  })
}

export { 
  LText,
  LUploader,
  install,
  HButton
}

export default {
  install
}