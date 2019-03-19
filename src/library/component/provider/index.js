import Device from '../../util/device';
import Store from '../../config/config.store';
import Router from '../../config/config.router';
import './style.less';

const Provider = {
  name: 'v-provider',
  render() {
    return (
      <v-locale-provider>
        <div id="main">
          <router-view/>
        </div>
      </v-locale-provider>
    );
  },
  mounted() {
    const {$store} = this;
    Device.deviceEnquire((deviceType) => {
      $store.commit('app/TOGGLE_DEVICE', deviceType);
      switch (deviceType) {
        case Device.DEVICE_TYPE.DESKTOP:
          $store.commit('app/SET_SIDEBAR_TYPE', true);
          break;
        case Device.DEVICE_TYPE.TABLET:
          $store.commit('app/SET_SIDEBAR_TYPE', false);
          break;
        case Device.DEVICE_TYPE.MOBILE:
          $store.commit('app/SET_SIDEBAR_TYPE', true);
          break;
        default:
      }
    });
  },
};

const install = (Vue) => {
  // install 才设置 store/router. Vue.use(Library, opt)中 opt 配置才会生效
  Provider.store = Store.getStore();
  Provider.router = Router.getRouter();

  Vue.component(Provider.name, Provider);
};

Provider.install = install;

export default Provider;
