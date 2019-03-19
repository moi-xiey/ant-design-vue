import Affix from './affix';
import Anchor from './anchor';
import AutoComplete from './auto-complete';
import Alert from './alert';
import Avatar from './avatar';
import BackTop from './back-top';
import Badge from './badge';
import Breadcrumb from './breadcrumb';
import Button from './button';
import Calendar from './calendar';
import Card from './card';
import Collapse from './collapse';
import Carousel from './carousel';
import Cascader from './cascader';
import Checkbox from './checkbox';
import Col from './col';
import DatePicker from './date-picker';
import Divider from './divider';
import Dropdown from './dropdown';
import Form from './form';
import Icon from './icon';
import Input from './input';
import InputNumber from './input-number';
import Layout from './layout';
import List from './list';
import LocaleProvider from './locale-provider';
import Menu from './menu';
import message from './message';
import Modal from './modal';
import notification from './notification';
import Pagination from './pagination';
import Popconfirm from './popconfirm';
import Popover from './popover';
import Progress from './progress';
import Radio from './radio';
import Rate from './rate';
import Row from './row';
import Select from './select';
import Slider from './slider';
import Spin from './spin';
import Steps from './steps';
import Switch from './switch';
import Table from './table';
import Transfer from './transfer';
import Tree from './tree';
import TreeSelect from './tree-select';
import Tabs from './tabs';
import Tag from './tag';
import TimePicker from './time-picker';
import Timeline from './timeline';
import Tooltip from './tooltip';
import Upload from './upload';
import Drawer from './drawer';
import Skeleton from './skeleton';
import Comment from './comment';
import ConfigProvider from './config-provider';
import Fragment from './fragment';
import Provider from './provider';
import './style.less';

const components = [Affix, Anchor, AutoComplete, Alert, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Collapse, Carousel, Cascader, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, InputNumber, Layout, List, LocaleProvider, Menu, Modal, Pagination, Popconfirm, Popover, Progress, Radio, Rate, Row, Select, Slider, Spin, Steps, Switch, Table, Transfer, Tree, TreeSelect, Tabs, Tag, TimePicker, Timeline, Tooltip, Upload, Drawer, Skeleton, Comment, ConfigProvider, Fragment, Provider];

export { message, notification, Affix, Anchor, AutoComplete, Alert, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Collapse, Carousel, Cascader, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, InputNumber, Layout, List, LocaleProvider, Menu, Modal, Pagination, Popconfirm, Popover, Progress, Radio, Rate, Row, Select, Slider, Spin, Steps, Switch, Table, Transfer, Tree, TreeSelect, Tabs, Tag, TimePicker, Timeline, Tooltip, Upload, Drawer, Skeleton, Comment, ConfigProvider, Fragment };

export default {
  install: (Vue, opt) => {
    components.forEach(component => {
      Vue.use(component, opt);
    });

    Vue.prototype.$message = message;
    Vue.prototype.$notification = notification;
    Vue.prototype.$info = Modal.info;
    Vue.prototype.$success = Modal.success;
    Vue.prototype.$error = Modal.error;
    Vue.prototype.$warning = Modal.warning;
    Vue.prototype.$confirm = Modal.confirm;
  },
};
