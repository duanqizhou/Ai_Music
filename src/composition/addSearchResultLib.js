import { nextTick, ref, onBeforeMount, onUnmounted, onDeactivated } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { sessionData } from '@/utils/util'
export function searchLib () {
  const router = useRouter()
  let lib = []
  const _SK = ref('')
  const setSK = (sk) => {
    _SK.value = sk
    sessionData('set', '_SK', sk)
  }
  const clearResetLib = (newLib, path = '') => {
    if (Array.isArray(newLib) && newLib.length > 0) {
      lib = newLib
      sessionData('set', 'searchLib', newLib)
    } else {
      Toast.fail('设置音乐库失败')
    }
    if (path) {
      nextTick(() => {
        router.push(path)
      })
    }
  }

  const addLib = (song) => {
    lib.push(song)
  }

  const clearLib = () => {
    lib = []
  }
  const getLib = () => {
    const sessionlib = sessionData('get', 'searchLib')
    if (sessionlib.length !== 0) {
      return sessionlib
    }
    return lib || []
  }
  const getSK = () => {
    const _SK = sessionData('get', '_SK')
    if (_SK) {
      return _SK
    }
    return null
  }
  onDeactivated(() => {
    // sessionData('clean', 'searchLib')
  })

  //   watch(lib, (nv, ov) => {})
  return { addLib, clearLib, clearResetLib, getLib, _lib: lib, _SK, setSK, getSK }
}
