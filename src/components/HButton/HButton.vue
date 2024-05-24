<template>
  <button
    :class="{
      'h-button': true,
      [`h-button-${type}`]: true,
      'h-button-round': round,
      'is-plain': plain,
    }"
    :style="styleProps"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import useComponentCommon from '../../hooks/useComponentCommon'
import type { buttonDefaultProp } from '../../defaultProps'
import { buttonStylesProps } from '../../defaultProps';

export interface buttonProps extends  /* @vue-ignore */ buttonDefaultProp {}

const props = withDefaults(defineProps<buttonProps>(), {
  fontSize: '14px',
  text: '',
  type: 'default',
  round: false,
  plain: false,
})

const {styleProps, handleClick} = useComponentCommon(props, buttonStylesProps)

</script>

<style scoped>
@import './style.css';
</style>