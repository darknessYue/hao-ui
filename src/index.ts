import { Plugin } from "vue";
import HText from "./components/HText";
import HUploader from "./components/HUploader";
import HButton from "./components/HButton";
import { makeInstaller } from "./utils/helper";
export type { commonDefaultProp, textDefaultProp, imageCommponentsProp, buttonDefaultProp } from "./defaultProps"
export { commonDefaultProps, textDefaultProps, imageDefaultProps, isEditingProp, textStylesProps, imageStylesProps, transformToComponentProps, buttonDefaultProps, buttonStylesProps } from "./defaultProps"

const components = [
  HText,
  HUploader,
  HButton
] as Plugin[]

const installer = makeInstaller(components)

export { 
  HText,
  HUploader,
  HButton
}

export default installer

export * from  "./components"