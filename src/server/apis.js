import { Http } from './http'
const token = '0123456789'
const $Http = new Http({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export function baseApi () {
  return $Http.get()
}

// NeteaseCloudMusicApi

export function _login (phone, password) {
  return $Http.get(`/login/cellphone?phone=${phone}&password=${password}`)
}
// 退出登录 /logout
export function logout () {
  return $Http.get('logout')
}

export function _refreshLogin () {
  return $Http.get('/login/refresh')
}
// 获取用户详情
export function _getUserAccount () {
  return $Http.get('/user/account')
}
// 获取账号信息
export function _getUserUid (uid) {
  return $Http.get(`/user/detail?uid=${uid}`)
}
// home
export function _getBanner () {
  return $Http.get('/banner?type=2')
}
// 获取每日推荐歌单
export function _getDaySong () {
  return $Http.get('/recommend/resource')
}
// 获取歌单详情
export function _playlistDetail (id) {
  return $Http.get(`/playlist/detail?id=${id}`)
}

// 歌单详情动态
export function _playlistDetailDynamic (id) {
  return $Http.get(`/playlist/detail/dynamic?id=${id}`)
}

// 歌手分类列表
export function _artistList (area, type, initial) {
  return $Http.get(`/artist/list?type=${type}&area=${area}&initial=${initial}`)
}
// 推荐新音乐
export function _newSong () {
  return $Http.get('/personalized/newsong')
}
// 推荐歌单
export function _personalized () {
  return $Http.get('/personalized')
}

// 获取每日推荐歌曲
export function _getDaySongS () {
  return $Http.get('/recommend/songs')
}

// 精品歌单标签列表
export function _highqualityTags () {
  return $Http.get('/playlist/highquality/tags')
}

// 热门歌单分类
export function _playlistHot () {
  return $Http.get('/playlist/hot')
}

// 歌单分类
export function _playlistCatlist () {
  return $Http.get('/top/playlist/highquality')
}
// 获取歌单详情
export function _playlistDetail1 () {
  return $Http.get('/playlist/detail?id=24381616')
}

// 歌单 ( 网友精选碟 )

export function _playlistHotSong (limit = 10) {
  return $Http.get(`/top/playlist?limit=${limit}&offset=1`)
}

// 歌手热门50首歌曲
export function _artistTop (id) {
  return $Http.get(`/artist/top/song?id=${id}`)
}

// 获取歌手单曲
export function _artists (id) {
  return $Http.get(`/artists?id=${id}`)
}

// 音乐是否可用
export function _checkMusic (id) {
  return $Http.get(`/check/music?id=${id}`)
}

// 获取音乐 url
export function _getMusicUrl (id) {
  return $Http.get(`/song/url?id=${id}`)
}

// 获取歌曲详情
export function _songDetail (id) {
  return $Http.get('/song/detail?ids=347230')
}
// 获取歌曲评论
export function _songComment (id) {
  return $Http.get(`/comment/music?id=${id}&limit=20`)
}
// 给歌曲点赞
export function _songCommentLike (id, cid, t) {
  return $Http.get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=0`)
}
// 获取歌词
export function _lyricWord (id) {
  return $Http.get(`/lyric?id=${id}`)
}

// *****************************************************************  搜索 ************
// 热搜列表(简略)
export function _searchHot (id) {
  return $Http.get('/search/hot')
}

// 热搜列表(详细)
export function _searchHotDetail (id) {
  return $Http.get('/search/hot/detail')
}

// 搜索建议
export function _searchSuggest (keywords) {
  return $Http.get(`/search/suggest?keywords=${keywords}&type=mobile`)
}

// 搜索
export function _searchKeywords (keywords) {
  return $Http.get(`/search/?keywords=${keywords}`)
}
// **********************************************************

// 所有榜单
export function _toplist () {
  return $Http.get('/toplist')
}

// 所有榜单内容摘要
export function _toplistDetail () {
  return $Http.get('/toplist/detail')
}

/***************************************************/

// 所有榜单内容摘要
export function _getEventMsg () {
  return $Http.get('/event')
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function _userSubcount () {
  return $Http.get('/user/subcount')
}
export function _personalizedMv () {
  return $Http.get('/personalized/mv')
}
