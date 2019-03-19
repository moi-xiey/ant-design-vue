const fs = require('fs');//引入文件系统模块
const path = require('path');//引入path模块

module.exports = {
  //读取json文件
  getJsonFile: (filePath) => {
    //读取指定json文件
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    //解析并返回
    return JSON.parse(json);
  },
  /**
   * @param list
   * @param no
   * @param size
   * @param filter
   * @param sort
   */
  page: (list = [], no = 1, size = 10, filter, sort) => {
    list = Array.isArray(list) ? list : [];
    no = isNaN(Number(no)) ? 1 : Number(no);
    size = isNaN(Number(size)) ? 10 : Number(size);
    let data = list;
    if (filter) {
      data = list.filter(filter);
    }
    if (sort) {
      data = data.sort(sort);
    }
    const totalPages = Math.ceil(list.length / size);
    const first = no <= 1;
    const last = no >= totalPages;
    // 获取第 no 页数据
    data = data.filter((item, index) => {
      return Math.max(no - 1, 0) * size <= index && index < no * size;
    });
    return {
      content: data,
      contentSize: data.length,
      first: first,
      last: last,
      no: no,
      size: size,
      total: list.length,
      totalPages: totalPages,
    };
  },
};