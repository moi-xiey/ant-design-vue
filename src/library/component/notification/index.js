import ANotification from 'ant-design-vue/es/notification';
import Objects from '../../util/objects';
import './style.less';

ANotification.config({
  placement: 'topRight',
});

// - 支持直接传消息字符串
const DefaultTypes = {
  success: '成功',
  info: '提示',
  warning: '警告',
  error: '错误',
};

Object.keys(DefaultTypes).forEach(function(type) {
  ANotification[type] = function(description, message = DefaultTypes[type], config) {
    if (Objects.isObject(description)) {
      config = description;
    }
    if (Objects.isObject(message)) {
      config = message;
    }
    config = Objects.merge({message, description}, config);
    return ANotification.open(Objects.merge({}, config, {
      type: type,
    }));
  };
});

ANotification.warn = ANotification.warning;

export default ANotification;
