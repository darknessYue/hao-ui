import { mapValues, without } from "lodash-es"

export interface commonDefaultProp {
  actionTypes?: string;
  url?: string;
  height?: string;
  lineHeight?: string|number;
  width?: string;
  minWidth?: string;
  minHidth?: string;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  borderStyle?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: number|string;
  position?: string;
  left?: string;
  top?: string;
  right?: string;
  backgroundColor?: string;
  isEditing?: boolean;
}

export interface textDefaultProp extends /* @vue-ignore */ commonDefaultProp {
  text: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  color?: string;
}

export interface buttonDefaultProp extends /* @vue-ignore */ commonDefaultProp {
  
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  color?: string;
  type?: 'primary' | 'danger' | 'success'  | 'info' | 'warning' | 'default';
  round?: boolean;
  plain?: boolean;
}

export interface imageCommponentsProp extends /* @vue-ignore */ commonDefaultProp {
  src: string;
}

export const commonDefaultProps = {
  // action
  actionTypes: '',
  url: '',
  // size
  height: '',
  width: '100%',
  minWidth: '0',
  minHeight: '0',
  padding: '0px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  margin: '0',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  marginBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
  backgroundColor: ''
}

export const textDefaultProps: textDefaultProp = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  ...commonDefaultProps
}

export const buttonDefaultProps: buttonDefaultProp = {
  // basic props - font styles
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  type: 'primary',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  ...commonDefaultProps
}

export const imageDefaultProps: imageCommponentsProp =  {
  src: '',
  ...commonDefaultProps
}

export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false
  }
}

export const textStylesProps = without(Object.keys(textDefaultProps), 'actionTypes', 'text', 'url' )
export const imageStylesProps = without(Object.keys(imageDefaultProps), 'src' )
export const buttonStylesProps = without(Object.keys(imageDefaultProps), 'plain', 'round', 'type', 'actionTypes' )

export const transformToComponentProps = <T extends {[key:string]:any}>(props: T) => {
  return {
    ...mapValues(props, item => {
      return {
        type: item.constructor,
        default: item
      }
    }),
    ...isEditingProp
  }
}