module.exports = [
  {
    'id': 1000,
    'name': '完整示例',
    'url': null,
    'icon': 'el-icon-fa-info',
    'children': [
      {
        'id': 1001,
        'name': '数据字典',
        'url': '/admin/sys/dict',
        'icon': 'el-icon-fa-book',
        'disabled': true,
      },
      {
        'id': 1002,
        'name': '菜单管理',
        'url': '/demo/menu',
        'icon': 'el-icon-fa-th',
        'disabled': true,
      },
    ],
  },
  {
    'id': 2000,
    'name': '开发工具',
    'icon': 'el-icon-fa-cube',
    'children': [
      {
        'id': 2100,
        'name': '表单',
        'url': null,
        'icon': 'el-icon-fa-edit',
        'children': [
          {
            'id': 2101,
            'name': '常规表单',
            'url': '/tool/form/simple',
            'disabled': true,
          },
          {
            'id': 2102,
            'name': '输入框',
            'url': '/tool/form/input',
          },
          {
            'id': 2103,
            'name': '下拉',
            'url': '/tool/form/select',
          },
          {
            'id': 2104,
            'name': 'checkbox',
            'url': '/tool/form/checkbox',
            'disabled': true,
          },
          {
            'id': 2105,
            'name': '上传',
            'url': '/tool/form/upload',
            'disabled': true,
          },
          {
            'id': 2106,
            'name': '富文本',
            'url': '/tool/form/rich',
            'disabled': true,
          },
          {
            'id': 2107,
            'name': '日期',
            'url': '/tool/form/date',
            'disabled': true,
          },
        ],
      },
      {
        'id': 2200,
        'name': '列表',
        'url': null,
        'icon': 'el-icon-fa-list-alt',
        'children': [
          {
            'id': 2201,
            'name': '常规列表',
            'url': '/tool/table/list',
            'disabled': true,
          },
          {
            'id': 2202,
            'name': '分页列表',
            'url': '/tool/table/page',
            'disabled': true,
          },
          {
            'id': 2203,
            'name': '树',
            'url': '/tool/table/tree',
            'disabled': true,
          },
          {
            'id': 2204,
            'name': '树形列表',
            'url': '/tool/table/tree-grid',
            'disabled': true,
          },
        ],
      },
    ],
  },
];