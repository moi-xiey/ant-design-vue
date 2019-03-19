import ID_Card from './vtype.idcard';
import Objects from '../../util/objects';

export const getInputTypeText = (type) => {
  let input = '输入';
  const selects = ['trigger', 'select', 'radio', 'checkbox', 'cascade', 'year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'timepicker', 'timeselect', 'slider', 'switch', 'rate', 'color', 'file', 'image'];
  if (selects.includes(type)) {
    input = '选择';
  }
  return input;
};

const VType = Object.create(null);

/**
 * type: {String} 名称
 * func: {Function} (props, ...args) => {...}. props: {name,label,type,placeholder,vtype}; ...args: 通过":"传递的参数
 */
export const addVType = (type, func) => {
  if (Objects.hasProp(VType, type)) {
    console.warn(`already have a ${type} vtype`);
    return;
  }
  VType[type] = func;
};

const DefaultVType = {
  required: ({label, type}) => {
    const input = getInputTypeText(type);
    const message = `请${input}${label}`;
    return {required: true, message};
  },
  int: () => ({pattern: /^\d+$/, message: `请输入数字`}),
  userName: ({label}) => ({pattern: /^[a-zA-Z0-9_]{1,50}$/, message: `请输入由数字、字母或下划线组成的${label}`}),
  mobile: () => ({pattern: /^1\d{10}$/, message: `请输入正确的手机号`}),
  email: () => ({type: 'email', message: `请输入正确的邮箱`}),
  url: () => ({type: 'url', message: `请输入正确的链接地址`}),
  ip: () => ({pattern: /((?:(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d))\.){3}(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d)))/, message: '请输入正确的IP地址'}),
  idcard: () => {
    return {
      validator: (rule, value, callback) => {
        const isValid = ID_Card.isValid(value);
        if (isValid) {
          callback('');
        } else {
          callback('请输入正确的身份证号码');
        }
      },
    };
  },
  minlength: ({label}, length) => {
    console.assert(!isNaN(length), `表单项 "${label}" 的 vtype - minlength 配置有误: 请传入正确的数值`);
    return {min: +length, message: `至少输入${length}个字符`};
  },
  maxlength: ({label}, length) => {
    console.assert(!isNaN(length), `表单项 "${label}" 的 vtype - maxlength 配置有误: 请传入正确的数值`);
    return {max: +length, message: `最多输入${length}个字符`};
  },
  userCode: ({label}) => {
    return {
      validator: (rule, value, callback) => {
        if(value.indexOf('admin') !== -1){
          callback(`${label}中不能存在admin，请重新输入`);
        } else {
          callback();
        }
      },
    }
  },
  password: ()=>({pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,20}$/, message: `请输入6-20位的密码,至少包含字母和字符串`})
};

const initDefaultVType = () => {
  Object.entries(DefaultVType).forEach((vtype) => {
    const [type, func] = vtype;
    addVType(type, func);
  });
};

initDefaultVType();

export default VType;
