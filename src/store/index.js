import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 定义一个本地存储的构造函数
const LocalEvent = function(item) {
  // 拿数据
  this.get = function() {
    return JSON.parse(localStorage.getItem(item));
  };
  // 存数据
  this.set = function(obj) {
    localStorage.setItem(item, JSON.stringify(obj));
  };
  // 删数据
  this.clear = function() {
    localStorage.removeItem(item);
  };
};

const local = new LocalEvent("bookState");

const state = local.get() || {
  id: "",
  sourceId: "",
  title: "",
  list: {},
  n: 0,
  listN: {}
};

let mutations = {
  updateList(state, list) {
    state.list = list;
    local.set(state);
  },
  updateId(state, id) {
    state.id = id;
    local.set(state);
  },
  updateSourceId(state, id) {
    state.sourceId = id;
    local.set(state);
  },
  updateN(state, n) {
    state.n = n;
    local.set(state);
  },
  updateTit(state, tit) {
    state.title = tit;
    local.set(state);
  },
  updateListN(state, listN) {
    state.listN = { ...state.listN, ...listN };
    local.set(state);
  }
};

export default new Vuex.Store({
  state,
  mutations
});
