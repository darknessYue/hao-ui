import { pick } from "lodash-es"
import { computed } from "vue"
import { textDefaultProp } from "@/defaultProps"


// const useComponentCommon = <T extends {[key: string]: any}>(props: T, picks: string[]) => {
const useComponentCommon = (props: Readonly<Partial<textDefaultProp>>, picks: string[]) => {
  
  const styleProps = computed(() => pick(props, picks) as string)
  const handleClick = () => {
    if(props.actionTypes === 'url' && props.url && !props.isEditing) {
      window.location.href = props.url
    }
  }
  
  return {
    styleProps,
    handleClick
  }
}

export default useComponentCommon;
