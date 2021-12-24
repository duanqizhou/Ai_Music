import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import '@/common/style/base.less'
import '@/common/fonts/iconfont.css'
import store from './store'
import _ from 'lodash'

import {
  Button,
  Toast,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  Cell,
  CellGroup,
  Col,
  Row,
  Skeleton,
  Tag,
  Tab,
  Tabs,
  Icon,
  ConfigProvider,
  Divider,
  List,
  PullRefresh,
  NavBar,
  Slider,
  Dialog,
  Popup,
  Empty
} from 'vant'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Empty)
app.use(Popup)
app.use(Slider)
app.use(PullRefresh)
app.use(NavBar)
app.use(List)
app.use(Divider)
app.use(Button)
app.use(Search)
app.use(Swipe)
app.use(SwipeItem)
app.use(Grid)
app.use(GridItem)
app.use(VanImage)
app.use(Cell)
app.use(CellGroup)
app.use(Col)
app.use(Row)
app.use(Skeleton)
app.use(Tag)
app.use(Tab)
app.use(Tabs)
app.use(ConfigProvider)
app.use(Icon)

app.use(Toast)
app.use(Dialog)

app.provide('_', _)

app.mount('#app')
