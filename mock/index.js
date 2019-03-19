const util = require('./util');
// data
const LoginResult = require('./data/login');
const Success = require('./data/success');
const Menus = require('./data/menu');
const Users = require('./data/users');
const Hobbies = require('./data/hobbies');
const Area = require('./data/area');

//返回一个函数
module.exports = function(app) {
  // 登录
  app.post('/login', function(req, res) {
    res.json(LoginResult);
  });
  // 退出
  app.post('/logouts', function(req, res) {
    res.json(Success);
  });
  // 菜单
  app.get('/menu', function(req, res) {
    res.json(Menus);
  });
  // 分页用户
  app.get('/user/page', function(req, res) {
    const {no = 1, size = 10} = req.query;
    res.json(util.page(Users, no, size));
  });
  // 用户
  app.get('/user/:id', function(req, res) {
    const {id} = req.params;
    res.json(Users.find(user => String(user.id) === id));
  });
  // hobbies
  app.get('/hobbies', function(req, res) {
    res.json(Hobbies);
  });
  // area
  app.get('/area', function(req, res) {
    res.json(Area);
  });
  // area provinces
  app.get('/area/provinces', function(req, res) {
    res.json(Area.map(({label, value}) => ({label, value})));
  });
  // area province cities
  app.get('/area/provinces/:provinceId', function(req, res) {
    const {provinceId} = req.params;
    const province = Area.find(province => province.value === Number(provinceId));
    const cities = province && province.children || [];
    res.json(province ? cities.map(({label, value}) => ({label, value})) : []);
  });
  // area province city areas
  app.get('/area/provinces/:provinceId/:cityId', function(req, res) {
    const {provinceId, cityId} = req.params;
    const province = Area.find(provinces => provinces.value === Number(provinceId));
    const cities = province && province.children || [];
    const city = cities.find(city => city.value === Number(cityId));
    const areas = city && city.children || [];
    res.json(province ? areas.map(({label, value}) => ({label, value})) : []);
  });
};