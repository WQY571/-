//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '您好！',
    userInfo: {},
    hasUserInfo: false,
    showBtn:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show:false,
    phone:''
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../tableList/tableList'
  //   })
  // },
  onLoad: function () {
    console.log("loding")
    var num = wx.getStorageSync("key");//wx.getStorageSync(key)，获取本地缓存
    console.log(num)
    // var that = this;

    // //获取用户信息
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     that.data.userInfo = res.userInfo;
    //     that.setData({
    //       userInfo: e.detail.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // })
    
    if (app.globalData.userInfo) {
      console.log("1")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../tableList/tableList'
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        console.log("2")
        wx.navigateTo({
          url: '../tableList/tableList'
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {

      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          app.globalData.userInfo = res.userInfo
          console.log("3")
          wx.navigateTo({
            url: '../tableList/tableList'
          })
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },

  /**
   * 微信快捷登录
   * 
   */
  getWxPhoneNumber:function(e){
    console.log('encryptedData',e.detail.encryptedData)
    console.log('iv',e.detail.iv)
    console.log('code',app.globalData.code)
    var that = this;
    console.log("that",that)
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    //页面跳转
    let datas = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      wxmpCode: app.globalData.code,
    }
    console.log('类型',datas)
    //let dataJson = JSON.parse(datas);
    // wx.navigateTo({
    //   url: '../index/index'
    // })
   
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://120.24.237.109:8045/smallProgram/getUserWechatPhone',//接口
        data: {
          "data":datas
        },
        method: "post",
        success: function (res) {
          //console.log(res.data.data.userWechatPhone);
          let phonenumber = res.data.data.userWechatPhone
          //let phoneData = that.phone

          that.setData({
            phone: res.data.data.userWechatPhone,
            //showBtn:false
          })
          wx.navigateTo({
            url: '../tableList/tableList?phone=' + res.data.data.userWechatPhone
          })
        }
      })
    }
  },

  /***
   * 手机号码登录
   */
  getNumber:function(e){
    // console.log("手机号码登录")
    // console.log("返回的是什么鬼",e)
    this.setData({ show:true})
  },
  onClose() {
    this.setData({ show: false });
  },
 
  // getOld:function(e){
  //   console.log('phone', this.phone)
  //   wx.navigateTo({
  //      url: '../tableList/tableList?phone=' + this.data.phone
  //     //url: '../tableList/tableList'
  //    })
  // },
  // getNew:function(e){
  //   wx.navigateTo({
  //     url: '../tableListNew/tableListNew?phone=' + this.data.phone
  //   })
  // }


})
