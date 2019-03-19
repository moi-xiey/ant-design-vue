const app = {
  namespaced: true,
  state: {
    sidebar: true,
    device: 'desktop',
    theme: '',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    multiTab: true,
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type;
    },
    CLOSE_SIDEBAR: (state) => {
      state.sidebar = false;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    TOGGLE_THEME: (state, theme) => {
      state.theme = theme;
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      state.layout = layout;
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      state.fixedHeader = fixed;
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      state.fixSiderbar = fixed;
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      state.autoHideHeader = show;
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      state.contentWidth = type;
    },
    TOGGLE_COLOR: (state, color) => {
      state.color = color;
    },
    TOGGLE_WEAK: (state, flag) => {
      state.weak = flag;
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      state.multiTab = bool;
    },
  },
};

export default app;
