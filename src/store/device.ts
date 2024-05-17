import { defineStore } from "pinia";

type device = 'desktop' | 'mobile'

const WIDTH = 992

export const ifMobile = () => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

export const useDeviceStore = defineStore({
  id: 'device',
  state: () => ({
    device: ifMobile() ? 'mobile': 'desktop' as device,
    width: WIDTH,
    search: false,
  }),
  actions: {
    setDevice(val: device) {
      this.$patch({
        device: val
      })
    },
    setSearch(val: boolean) {
      this.$patch({
        search: val
      })
    },
    listen(e:any) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        e.stopPropagation();
        return;
      }
      e.preventDefault()
      if(e.ctrlKey && e.key === 'k') {
        this.$patch({
          search: !this.search
        })
      }
    }
  }
})