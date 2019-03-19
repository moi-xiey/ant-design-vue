const Mock = require('mockjs');
const area = require('./area');
const hobbies = require('./hobbies');

module.exports = Mock.mock({
  'data|30-100': [
    {
      'id|+1': 1,
      'string': '@name',
      'date': '@datetime("T")',
      'time': '@datetime("T")',
      'datetime': '@datetime("T")',
      'int|1-2': 1,
      'float|1-100.1-10': 1,
      'boolean': '@boolean',
      'money|5000-20000': 15000,
      'icon|1': [
        'el-icon-info',
        'el-icon-warning',
        'el-icon-question',
        'el-icon-date',
        'el-icon-menu',
        'el-icon-star-on',
        'el-icon-picture',
        'el-icon-upload',
      ],
      'hobbies': () => {
        const o = {};
        hobbies.forEach(hobby => o[hobby] = 1);
        const result = Mock.mock({'data|2-5': o});
        return Object.keys(result.data).join(',');
      },
      'area': () => {
        const o = Mock.mock({
          'provinceId|1': area.map(({value}) => value),
          'cityId': function() {
            if (!this.provinceId) {
              return undefined;
            }
            const province = area.find(province => province.value === this.provinceId);
            if (!province || !Array.isArray(province.children) || !province.children.length) {
              return undefined;
            }
            return Mock.mock({'id|1': province.children}).id.value;
          },
          'areaId': function() {
            if (!this.provinceId || !this.cityId) {
              return undefined;
            }
            const province = area.find(province => province.value === this.provinceId);
            if (!province || !Array.isArray(province.children) || !province.children.length) {
              return undefined;
            }
            const city = province.children.find(city => city.value === this.cityId);
            if (!city || !Array.isArray(city.children) || !city.children.length) {
              return undefined;
            }
            return Mock.mock({'id|1': city.children}).id.value;
          },
        });
        return Object.values(o).filter(Boolean).join(',');
      },
      'areaName': function() {
        if (!this.area) {
          return '';
        }
        const areaArr = this.area.split(',');
        let currentVal = areaArr.shift();
        let areas = area;
        const names = [];
        while (currentVal && areas.length) {
          const current = areas.find(({value}) => String(value) === currentVal);
          if (!current) {
            break;
          }
          areas = current.children;
          names.push(current.label);
          currentVal = areaArr.shift();
        }
        return names.join(' ');
      },
    },
  ],
}).data;