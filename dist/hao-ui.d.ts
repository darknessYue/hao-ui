import * as vue from 'vue';
import { defineComponent, openBlock, createBlock, resolveDynamicComponent, normalizeStyle, unref, withCtx, createTextVNode, toDisplayString, ref, computed, reactive, createElementBlock, createElementVNode, mergeProps, toHandlers, renderSlot, Fragment, renderList, normalizeClass, createCommentVNode, pushScopeId, popScopeId, App } from 'vue';
import axios from 'axios';
import { v4 } from 'uuid';
import { last } from 'lodash-es';

interface commonDefaultProp {
    actionTypes?: string;
    url?: string;
    height?: string;
    lineHeight?: string | number;
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
    opacity?: number | string;
    position?: string;
    left?: string;
    top?: string;
    right?: string;
    backgroundColor?: string;
    isEditing?: boolean;
}
interface textDefaultProp extends /* @vue-ignore */ commonDefaultProp {
    text: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
    color?: string;
}
interface buttonDefaultProp extends /* @vue-ignore */ commonDefaultProp {
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAlign?: string;
    color?: string;
    type?: 'primary' | 'danger' | 'success' | 'info' | 'warning' | 'default';
    round?: boolean;
    plain?: boolean;
}
interface imageCommponentsProp extends /* @vue-ignore */ commonDefaultProp {
    src: string;
}
declare const commonDefaultProps: {
    actionTypes: string;
    url: string;
    height: string;
    width: string;
    minWidth: string;
    minHeight: string;
    padding: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
    margin: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marginBottom: string;
    borderStyle: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
    position: string;
    left: string;
    top: string;
    right: string;
    backgroundColor: string;
};
declare const textDefaultProps: textDefaultProp;
declare const buttonDefaultProps: buttonDefaultProp;
declare const imageDefaultProps: imageCommponentsProp;
declare const isEditingProp: {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};
declare const textStylesProps: string[];
declare const imageStylesProps: string[];
declare const buttonStylesProps: string[];
declare const transformToComponentProps: <T extends {
    [key: string]: any;
}>(props: T) => { [P in keyof T]: {
    type: any;
    default: T[keyof T];
}; } & {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};

declare const useComponentCommon: (props: Readonly<Partial<textDefaultProp>>, picks: string[]) => {
    styleProps: vue.ComputedRef<string>;
    handleClick: () => void;
};

var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'LText',
    props: {
        tagCustomName: { type: String, required: false, default: 'div' }
    },
    setup(__props) {
        const props = __props;
        const { styleProps, handleClick } = useComponentCommon(props, textStylesProps);
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(resolveDynamicComponent(_ctx.tagCustomName), {
                class: "l-text-component",
                style: normalizeStyle(unref(styleProps)),
                onClick: unref(handleClick)
            }, {
                default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.text), 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["style", "onClick"]));
        };
    }
});

script$2.__scopeId = "data-v-6bf95b7a";
script$2.__file = "src/components/LText/LText.vue";

var script$1 = defineComponent({
    name: 'LUploader',
    props: {
        action: {
            type: String,
            required: true
        },
        showList: {
            type: Boolean,
            default: true
        },
        beforeUpload: {
            type: Function,
            default: () => true,
        },
        uploadSuccess: {
            type: Function,
            default: () => { }
        },
        drag: {
            type: Boolean,
            default: false
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        listType: {
            type: String,
            default: 'text'
        }
    },
    computed: {
        uploadStatusClass() {
            return (status) => {
                return status === 'uploading' ? 'uploading' : `upload-${status}`;
            };
        }
    },
    setup(props) {
        // console.log(getCurrentInstance()?.proxy?.$parent)
        const fileInput = ref(null);
        const filesList = ref([]);
        const isDragOver = ref(false);
        const isUploading = computed(() => {
            return filesList.value.some(item => item.status === 'uploading');
        });
        const lastFileData = computed(() => {
            const lastFile = last(filesList.value);
            if (lastFile) {
                return {
                    loaded: lastFile.status === 'success',
                    data: lastFile.resp
                };
            }
            return false;
        });
        const triggerUploader = () => {
            fileInput.value?.click();
        };
        const triggerUploadSuccess = () => {
            if (props.uploadSuccess) {
                if (!filesList.value.some(item => item.status !== 'success')) {
                    props.uploadSuccess(filesList.value.map(item => item.resp));
                }
            }
        };
        const postFile = (readyFile) => {
            const formData = new FormData();
            formData.append(readyFile.name, readyFile.raw);
            readyFile.status = 'uploading';
            axios.post(props.action + `?url=${readyFile.url}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(async (res) => {
                // setTimeout(() => {
                //   fileObj.status = 'success'
                // }, 2000)
                readyFile.status = 'success';
                readyFile.resp = res.data;
            }).catch(err => {
                console.log(err);
                readyFile.status = 'error';
            }).finally(() => {
                triggerUploadSuccess();
                if (fileInput.value) {
                    fileInput.value.value = '';
                }
            });
        };
        const uploadFiles = () => {
            filesList.value.filter(item => item.status === 'ready').forEach(readFile => {
                postFile(readFile);
            });
        };
        const addFileToList = (file) => {
            const fileObj = reactive({
                id: v4(),
                name: file.name,
                status: 'ready',
                size: file.size,
                raw: file
            });
            if (props.listType === 'picture') {
                try {
                    fileObj.url = URL.createObjectURL(file);
                }
                catch (error) {
                    console.log(error);
                }
                // const fileReader = new FileReader()
                // fileReader.readAsDataURL(file)
                // fileReader.addEventListener('load', () => {
                //   fileObj.url = fileReader.result as string
                // })
            }
            filesList.value.push(fileObj);
            if (props.autoUpload) {
                postFile(fileObj);
            }
        };
        const beforeUploadCheck = (files) => {
            if (files) {
                const uploadFile = files[0];
                if (props.beforeUpload) {
                    const result = props.beforeUpload(uploadFile);
                    if (result && result instanceof Promise) {
                        result.then(processFile => {
                            if (processFile instanceof File) {
                                addFileToList(processFile);
                            }
                            else {
                                throw new Error('beforeUpload return value must be File or Promise<File>');
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    else if (result === true) {
                        addFileToList(uploadFile);
                    }
                }
                else {
                    addFileToList(uploadFile);
                }
            }
        };
        const handleFileChange = async (e) => {
            const targget = e.target;
            beforeUploadCheck(targget.files);
        };
        let events = {
            'click': triggerUploader
        };
        const handleDrag = (e, over) => {
            e.preventDefault();
            isDragOver.value = over;
        };
        const handleDrop = (e) => {
            e.preventDefault();
            isDragOver.value = false;
            if (e.dataTransfer) {
                beforeUploadCheck(e.dataTransfer.files);
            }
        };
        const handleDeleteFile = (id) => {
            filesList.value = filesList.value.filter(item => item.id !== id);
        };
        if (props.drag) {
            events = {
                ...events,
                'dragleave': (e) => handleDrag(e, false),
                'dragover': (e) => handleDrag(e, true),
                'drop': handleDrop
            };
        }
        return {
            events,
            filesList,
            fileInput,
            isDragOver,
            handleDrag,
            handleDrop,
            uploadFiles,
            isUploading,
            lastFileData,
            triggerUploader,
            handleFileChange,
            handleDeleteFile
        };
    }
});

const _withScopeId = n => (pushScopeId("data-v-59dfe29a"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "file-uploader" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("button", { disabled: "" }, "正在上传", -1 /* HOISTED */));
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("button", null, "点击上传", -1 /* HOISTED */));
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("button", null, "点击上传", -1 /* HOISTED */));
const _hoisted_5 = {
  key: 0,
  class: "file-list"
};
const _hoisted_6 = {
  key: 0,
  class: "loading",
  style: {"margin-right":"10px"}
};
const _hoisted_7 = ["src"];
const _hoisted_8 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", mergeProps({ class: "uploader-area" }, toHandlers(_ctx.events, true), {
      class: {'is-dragover': _ctx.drag && _ctx.isDragOver}
    }), [
      (_ctx.isUploading)
        ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            _hoisted_2
          ])
        : (_ctx.lastFileData && _ctx.lastFileData.loaded)
          ? renderSlot(_ctx.$slots, "uploaded", {
              key: 1,
              uploadedData: _ctx.lastFileData.data
            }, () => [
              _hoisted_3
            ])
          : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
              _hoisted_4
            ])
    ], 16 /* FULL_PROPS */),
    createElementVNode("input", {
      ref: "fileInput",
      type: "file",
      style: { display: 'none' },
      onChange: _cache[0] || (_cache[0] = (...args) => (_ctx.handleFileChange && _ctx.handleFileChange(...args)))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */),
    (_ctx.showList)
      ? (openBlock(), createElementBlock("ul", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filesList, (item, index) => {
            return (openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass(_ctx.uploadStatusClass(item.status))
            }, [
              (item.status === 'uploading')
                ? (openBlock(), createElementBlock("div", _hoisted_6, "..."))
                : createCommentVNode("v-if", true),
              (item.url && _ctx.listType === 'picture')
                ? (openBlock(), createElementBlock("img", {
                    key: 1,
                    width: "100px",
                    src: item.url
                  }, null, 8 /* PROPS */, _hoisted_7))
                : createCommentVNode("v-if", true),
              createElementVNode("span", null, toDisplayString(item.name), 1 /* TEXT */),
              createElementVNode("div", {
                class: "file-btn-delete",
                onClick: $event => (_ctx.handleDeleteFile(item.id))
              }, "x", 8 /* PROPS */, _hoisted_8)
            ], 2 /* CLASS */))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : createCommentVNode("v-if", true)
  ]))
}

script$1.render = render;
script$1.__scopeId = "data-v-59dfe29a";
script$1.__file = "src/components/LUploader/Uploader.vue";

var script = /*#__PURE__*/ defineComponent({
    __name: 'HButton',
    setup(__props) {
        const props = __props;
        const { styleProps, handleClick } = useComponentCommon(props, buttonStylesProps);
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("button", {
                class: normalizeClass({
                    'h-button': true,
                    [`h-button-${_ctx.type}`]: true,
                    'h-button-round': _ctx.round,
                    'is-plain': _ctx.plain,
                }),
                style: normalizeStyle(unref(styleProps)),
                onClick: _cache[0] || (_cache[0] =
                    //@ts-ignore
                    (...args) => (unref(handleClick) && unref(handleClick)(...args)))
            }, [
                renderSlot(_ctx.$slots, "default")
            ], 6 /* CLASS, STYLE */));
        };
    }
});

script.__scopeId = "data-v-3e4e65c5";
script.__file = "src/components/HButton/HButton.vue";

declare const install: (app: App) => void;

declare const _default: {
    install: (app: App<any>) => void;
};

export { script as HButton, script$2 as LText, script$1 as LUploader, type buttonDefaultProp, buttonDefaultProps, buttonStylesProps, type commonDefaultProp, commonDefaultProps, _default as default, type imageCommponentsProp, imageDefaultProps, imageStylesProps, install, isEditingProp, type textDefaultProp, textDefaultProps, textStylesProps, transformToComponentProps };
