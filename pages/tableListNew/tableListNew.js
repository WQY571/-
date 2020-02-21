// pages/tableList/tableList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodisplay:false,
    showEwm:false,
    buttonIf:true,
    showbtn:false,
    count:'5',
    timer: null,
    sex: ['男', '女'],
    sexIndex: 0,
    sexHidden: true,
    cityHidden: false,
    region: ["广东省", "广州市", "番禺区"],
    writeDatetime:'',
    index:0,
    imageSre:'',
    ipt: {
      patientName: '',
      age:'',
      province:'',
      city:'',
      district:'',
      sex:'',
      street:'',
      housingEstate:'',
      phoneNumber:'',
      idCard:'',
      isToHubeiOrWenzhouTwoWeek:'',
      isToHubeiOrWenzhouTwoWeekByVehicle:'',
      isTouchFromHubeiOrWenzhou:'',
      isTouchNovelCoronaviruserTwoWeek:'',
      isHaveNovelCoronaviruserHousingEstate:'',
      aggregationDisease:'',
      isFeverTwoWeek:'',
      feverDayCount:'',
      highestTemperature:'',
      currentTemperature:'',
      isTakeMedicineInFever:'',
      symptom:'',
      writeSignature:'',
      writeDatetime:'',




      // company:'',
      // isTohubei:'',
      // tohubeiDetail:'',
      // isFromhubeiRelatives: '',
      // frombubeiRelativesDetail:'',
      // isNohubeiRelatives: '',
      // nohubeiRelativesDetail: '',
      // healthyCondition:'',
      // isHospitalize: '',
      // doctorDiagnosis: '',
      // otherCondition: '',
      // companions:'',
      // companionsPhone:'',
      // otherHealthyCondition:'',
      // diagnosticsHospital:'',
      cityData: '["广东省", "广州市", "番禺区"]'
    },
    items:[
      { name: 1, value: '是' },
      { name: 2, value: '否'}
    ],
    healthy: [
      { name: '全身酸痛', value: '全身酸痛' },
      { name: '乏力', value: '乏力' },
      { name: '咳嗽', value: '咳嗽' },
      { name: '咽痛', value: '咽痛' },
      { name: '腹泻', value: '腹泻' },
      { name: '流涕、鼻塞', value: '流涕、鼻塞' },
      { name: '头痛', value: '头痛' },
      { name: '头晕', value: '头晕' },
      { name: '眼结膜炎', value: '眼结膜炎' },
      { name: '胸闷', value: '胸闷' },
      { name: '呼吸困难', value: '呼吸困难' }
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
    if (key_ == 'cityData') {
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
     //} else if (ipt.addrStreet == '' || ipt.addrHouse == '') {
    //   wx.showToast({
    //     title: '请输入您的家庭住址',
    //     icon: 'none'
    //   })
    // } else if (ipt.isTohubei == '') {
    //   wx.showToast({
    //     title: '请选择第8个问题',
    //     icon: 'none'
    //   })
    // } else if (ipt.isFromhubeiRelatives == '') {
    //   wx.showToast({
    //     title: '请选择第10个问题',
    //     icon: 'none'
    //   })
    // }else if (ipt.isNohubeiRelatives == '') {
    //     wx.showToast({
    //       title: '请选择第12个问题',
    //       icon: 'none'
    //     })
    // } else if (ipt.healthyCondition == '' && ipt.otherHealthyCondition == '') {
    //   wx.showToast({
    //     title: '请选择您的健康状况',
    //     icon: 'none'
    //   })
    // } else if (ipt.isHospitalize == '') {
    //   wx.showToast({
    //     title: '请选择第15个问题',
    //     icon: 'none'
    //   })
    } else if (ipt.diagnosticsHospital == '') {
      wx.showToast({
        title: '请选择第20个问题',
        icon: 'none'
      })  
    
    } else {
      // 此处提交数据
      let that = this
      if(that.data.buttonIf){
        let ipt = that.data.ipt
        let region = that.data.region
        that.setData({
          'ipt.province':region[0],
          'ipt.city': region[1],
          'ipt.district': region[2]
        })
        console.log("数据", ipt)
        let resultArray = ipt.symptom.toString()
        console.log(resultArray)
        delete ipt.symptom
        ipt.symptom = resultArray

        wx.request({
          //url: 'http://120.24.237.109:8050/savePatientReport', //接口地址
          url:'http://xingchenlqm.qicp.vip/savePatientReport',
          data: this.data.ipt,
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              imageSre:res.data.data.base64Image,
              writeDatetime: res.data.data.writeDatetime,
              showEwm:true,
              nodisplay:true
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

  radioChangeisTohubei:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isToHubeiOrWenzhouTwoWeek': trueValue
    })
  },

  radioChangeisToHubeiOrWenzhouTwoWeekByVehicle:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value) 
    this.setData({
      'ipt.isToHubeiOrWenzhouTwoWeekByVehicle': trueValue
    })
  },

  radioChangeisTouchFromHubeiOrWenzhou:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isTouchFromHubeiOrWenzhou': trueValue
    })
  },
  radioChangeisTouchNovelCoronaviruserTwoWeek:function(e){
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isTouchNovelCoronaviruserTwoWeek': trueValue
    })
  },
  radioChangeisHaveNovelCoronaviruserHousingEstate: function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isHaveNovelCoronaviruserHousingEstate': trueValue
    })
  },
  radioChangeaggregationDisease: function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.aggregationDisease': trueValue
    })
  },
  radioChangeisFeverTwoWeek: function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isFeverTwoWeek': trueValue
    })
  },
  radioChangeisTakeMedicineInFeve: function (e) {
    let ipt = this.data.ipt
    let trueValue = parseInt(e.detail.value)
    this.setData({
      'ipt.isTakeMedicineInFeve': trueValue
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
      'ipt.symptom': e.detail.value
    })
    console.log(ipt)
  },
  // bindPickerChange: function (e) {
  //   let ipt = this.data.ipt
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     'ipt.diagnosticsHospital': e.detail.value
  //   })
  // },
  handWai:function(){
    wx.navigateTo({
      url: '../success/success'
       })
  },
  handblack:function(){
    // this.setData({
    //   showFrom:true
    // })
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