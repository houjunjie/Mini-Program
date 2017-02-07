const api = require("api.js");

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//网络请求
function request(parameters = "",success, method = "GET", header = {}) {
  wx.request({
    url: api.BaseURL +(method == "GET" ? "?" : "")+ parameters,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function(res){
      console.log(res);
      success(res);
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

module.exports = {
  formatTime: formatTime,
  request: request
}
