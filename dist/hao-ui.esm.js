import { computed, defineComponent, openBlock, createBlock, resolveDynamicComponent, normalizeStyle, unref, withCtx, createTextVNode, toDisplayString, ref, reactive, createElementBlock, createElementVNode, mergeProps, toHandlers, renderSlot, Fragment, renderList, normalizeClass, createCommentVNode, pushScopeId, popScopeId } from 'vue';
import { pick, without, mapValues, last } from 'lodash-es';
import axios from 'axios';

// const useComponentCommon = <T extends {[key: string]: any}>(props: T, picks: string[]) => {
const useComponentCommon = (props, picks) => {
    const styleProps = computed(() => pick(props, picks));
    const handleClick = () => {
        if (props.actionTypes === 'url' && props.url && !props.isEditing) {
            window.location.href = props.url;
        }
    };
    return {
        styleProps,
        handleClick
    };
};

const commonDefaultProps = {
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
};
const textDefaultProps = {
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
};
const buttonDefaultProps = {
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
};
const imageDefaultProps = {
    src: '',
    ...commonDefaultProps
};
const isEditingProp = {
    isEditing: {
        type: Boolean,
        default: false
    }
};
const textStylesProps = without(Object.keys(textDefaultProps), 'actionTypes', 'text', 'url');
const imageStylesProps = without(Object.keys(imageDefaultProps), 'src');
const buttonStylesProps = without(Object.keys(imageDefaultProps), 'plain', 'round', 'type', 'actionTypes');
const transformToComponentProps = (props) => {
    return {
        ...mapValues(props, item => {
            return {
                type: item.constructor,
                default: item
            };
        }),
        ...isEditingProp
    };
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

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

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

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

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

script.install = (app) => {
    app.component(script.name, script);
};

const components = [
    script$2,
    script$1,
    script
];
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    install
};

export { script as HButton, script$2 as LText, script$1 as LUploader, buttonDefaultProps, buttonStylesProps, commonDefaultProps, index as default, imageDefaultProps, imageStylesProps, install, isEditingProp, textDefaultProps, textStylesProps, transformToComponentProps };
