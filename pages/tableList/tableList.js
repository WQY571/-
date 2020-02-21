// pages/tableList/tableList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 10, 1).getTime(),
    maxDate: new Date(2020, 12, 30).getTime(),
    currentDate: new Date().getTime(),
    //时间-显示赋值
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    showbottom:false,
    showEwm:false,
    buttonIf:true,
    showbtn:false,
    count:'5',
    timer: null,
    sex: ['男', '女'],
    sexIndex: 0,
    sexHidden: true,
    cityHidden: true,
    region: '',
    index:0,
    imageSre:'',
    ipt: {
      patientName: '',
      age:'',
      sex:'',
      addrStreet:'',
      addrHouse:'',
      phoneNumber:'',
      idCard:'',
      company:'',
      isTohubei:'',
      tohubeiDetail:'',
      isFromhubeiRelatives: '',
      frombubeiRelativesDetail:'',
      isNohubeiRelatives: '',
      nohubeiRelativesDetail: '',
      healthyCondition:'',
      isHospitalize: '',
      doctorDiagnosis: '',
      otherCondition: '',
      companions:'',
      companionsPhone:'',
      otherHealthyCondition:'',
      diagnosticsHospital:'',

      isTouchInfected:'',
      onseTime:'',
      isClusterOnset:''

    },
    items:[
      { name: 1, value: '是' },
      { name: 2, value: '否'}
    ],
    healthy: [
      { name: '低热（37.1-38℃）', value: '低热（37.1-38℃）' },
      { name: '中热（38.1-39℃）', value: '中热（38.1-39℃）'},
      { name: '高热（39.1-41℃）', value: '高热（39.1-41℃）' },
      { name: '超高热（>41℃）', value: '超高热（>41℃）' },
      { name: '咳嗽', value: '咳嗽' },
      { name: '喉咙痛', value: '喉咙痛' },
      { name: '腹泻', value: '腹泻' },
      { name: '头痛',value: '头痛' },
      { name: '流鼻涕',value: '流鼻涕' },
      { name: '胸闷', value: '胸闷' },
      { name: '咳痰', value: '咳痰' },
      { name: '气促', value: '气促' },
      { name: '无异常、但害怕', value: '无异常、但害怕' },
    ],
    sexDate:[
      { name: '1', value: '男' },
      { name: '2', value: '女'}
    ],
    array: [
      { name: '10001', value: '广州市花都区人民医院' },
      { name: '10002', value: '广州市中西医结合医院' }
     ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("phone", options.phone)
    let that = this
    let ipt = that.data.ipt
    that.setData({
      'ipt.phoneNumber': options.phone
    })
 
  },

  bindinput: function (e) {
    let that = this
    let ipt = that.data.ipt
    let region = that.data.region
    let key_ = e.currentTarget.dataset.key
    let value = e.detail.value
    let cityHidden = that.data.cityHidden

    ipt[key_] = value
    if (key_ == 'city') {
      region = value
      cityHidden = false
    }

    that.setData({
      region: region,
      cityHidden: cityHidden
    })
  },


  submit: function () {
    let that = this
    let ipt = that.data.ipt
    console.log(ipt)
    if (ipt.patientName == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      })
    } else if (ipt.idCard == '') {
      wx.showToast({
        title: '请输入您的身份证号码',
        icon: 'none'
      })
    } else if (ipt.addrStreet == '' || ipt.addrHouse == '') {
      wx.showToast({
        title: '请输入您的家庭住址',
        icon: 'none'
      })
    } else if (ipt.isTohubei == '') {
      wx.showToast({
        title: '请选择第8个问题',
        icon: 'none'
      })
    } else if (ipt.isFromhubeiRelatives == '') {
      wx.showToast({
        title: '请选择第11个问题',
        icon: 'none'
      })
    }else if (ipt.isNohubeiRelatives == '') {
        wx.showToast({
          title: '请选择第16个问题',
          icon: 'none'
        })
    } else if (ipt.healthyCondition == '' && ipt.otherHealthyCondition == '') {
      wx.showToast({
        title: '请选择您的健康状况',
        icon: 'none'
      })
    } else if (ipt.isHospitalize == '') {
      wx.showToast({
        title: '请选择第19个问题',
        icon: 'none'
      })
    } else if (ipt.diagnosticsHospital == '') {
      wx.showToast({
        title: '请选择第18个问题',
        icon: 'none'
      })  
    } else if (ipt.isTouchInfected == '') {
      wx.showToast({
        title: '请选择第10个问题',
        icon: 'none'
      })
    } else if (ipt.isClusterOnset == '') {
      wx.showToast({
        title: '请选择第14个问题',
        icon: 'none'
      })  
    
    } else {
      // 此处提交数据
      let that = this
      if(that.data.buttonIf){
        let iptValue = that.data.ipt
        let resultArray = iptValue.healthyCondition.toString()
        console.log(resultArray)
        delete iptValue.healthyCondition
        iptValue.healthyCondition = resultArray

        wx.request({
          url: 'http://120.24.237.109:8050/savePatientReport', //接口地址
          data: this.data.ipt,
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              imageSre:res.data.data.base64Image,
              showEwm:true
            })
            if (wx.pageScrollTo) {
              wx.pageScrollTo({
                scrollTop: 0
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
              })
            }
            
            // wx.navigateTo({
            //   url: '../tableList/tableList'
            // })
          }
        })
        this.setData({
          buttonIf:false
        })
      }else{
        console.log("重复提交")
        this.setData({ showbtn: true });
        let that = this;
        let count = that.data.count
        let timer = that.data.timer
        const TIME_COUNT = 10;
        if (!timer) {
          count = TIME_COUNT;
          timer = setInterval(() => {
            if (count > 0 && count <= TIME_COUNT) {
              count--;
              this.setData({
                count:count,
              })
            } else {
              clearInterval(timer);
              this.setData({
                timer:null
              })
              this.setData({ showbtn: false });
              
            }
          }, 1000)
        }
        this.setData({
          buttonIf: true
        })
      }
      

      //console.log("最后的值",this.data.ipt)

      
    }
  },
  /*
   *是与否的判断
   */
  radioChangeisClusterOnset: function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isClusterOnset': trueValue
    })
  },
  radioChangeisTohubei:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isTohubei': trueValue
    })
  },

  radioChangeisTouchInfected:function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isTouchInfected': trueValue
    })
  },

  radioChangeisFromhubeiRelatives:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value) 
    this.setData({
      'ipt.isFromhubeiRelatives': trueValue
    })
  },

  radioChangeisNohubeiRelatives:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isNohubeiRelatives': trueValue
    })
  },
  radioChangeisHospitalize:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isHospitalize': trueValue
    })
  },
/**
 * 性别
 */
  radioChangeisagex:function(e){
    let ipt = this.data.ipt
    console.log("性别", e.detail.value)
    this.setData({
      'ipt.sex': e.detail.value
    })
  },

  /*
   *多选数据操作
   */
  checkboxChangehealthyCondition:function(e){
    let ipt = this.data.ipt
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      'ipt.healthyCondition': e.detail.value
    })
    console.log(ipt)
  },
  bindPickerChange: function (e) {
    let ipt = this.data.ipt
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'ipt.diagnosticsHospital': e.detail.value
    })
  },
  handWai:function(){
    wx.navigateTo({
      url: '../success/success'
       })
  },
  handblack:function(){
    this.setData({
      showFrom:true
    })
  },
 //时间弹窗
  showPopup:function(){
    this.setData({ showbottom: true });
  },
  //弹出关闭事件
  onClose:function(){
    this.setData({ showbottom: false });
  },
  //时间选择器
  onInput(event) {
    let that =this
    var etime = event.detail + (86400 - 1) * 1000;
    var newTime = new Date(etime);
    this.setData({
      currentDate: event.detail,
      // 'ipt.onseTime':newTime
    });

    console.log("时间选择", newTime)
  },
  // 时间-确定按钮
  confirmFn1(event) {
    let ipt = this.data.ipt
    console.log('确认')
    var d = new Date(event.detail);
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    console.log('确认', date)
    this.setData({ 'ipt.onseTime': date });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})