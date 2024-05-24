<template>
  <component :is="tagCustomName" class="l-text-component" :style="styleProps" @click="handleClick">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import useComponentCommon from '../../hooks/useComponentCommon'
import { textDefaultProp, textStylesProps } from '../../defaultProps';


export interface LTextProps extends  /* @vue-ignore */ textDefaultProp {
  tagCustomName?: string;
}

const props = withDefaults(defineProps<LTextProps>(), {
  fontSize: '12px',
  text: '',
  tagCustomName: 'div',
})

const {styleProps, handleClick} = useComponentCommon(props, textStylesProps)

</script>

<style scoped>
@import "./style.css";
</style>