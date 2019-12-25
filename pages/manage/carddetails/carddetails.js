// pages/manage/carddetails/carddetails.js
const {
  url
} = require('../../../utils/url.js');
import {
  showToast,
  navigateTo,
  switchTab,
  navigateBack,
  makePhoneCall,
} from '../../../utils/WeChatfction';

//配置邀请时间
const date = new Date();
const years = [];
let year = date.getFullYear();
const months = [];
let month = date.getMonth();
const days = [];
let day = date.getDate();
const hours = [];
let hour = date.getHours();
const minutes = [];
let minute = date.getMinutes();

for (let i = 1990; i <= date.getFullYear() + 100; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 1; i <= 24; i++) {
  hours.push(i)
}
for (let i = 1; i <= 60; i++) {
  minutes.push(i)
}

const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    demandflag: true,
    years: years,
    year: year,
    months: months,
    month: month + 1,
    days: days,
    day: day,
    hours: hours,
    hour: hour,
    minutes: minutes,
    minute: minute,
    timerval: [29, month, day - 1, hour - 1, minute - 1],
    check: true
  },

  checkbox(e) {
    console.log(e.currentTarget.dataset.target)
    this.setData({
      check: !e.currentTarget.dataset.target
    })
  },

  //选择邀请时间
  bindChange(e) {
    let val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
  },

  //关闭模拟框
  hideModal() {
    this.setData({
      modalName: null
    })
  },

  //回到首页
  tapind() {
    switchTab('/pages/user/user/user')
  },

  //拨打手机
  taptel() {
    let mobile = this.data.mobile;
    makePhoneCall(mobile);
  },

  //事件列表
  tapjump() {
    this.setData({
      modalName: 'showModal',
    })
  },

  //邀请面试(btn)
  interjump(e) {
    let id = e.currentTarget.dataset.id;
    let year = this.data.year;
    let month = this.data.month;
    let day = this.data.day;
    let hour = this.data.hour;
    let minute = this.data.minute;
    let timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    this.tapbtn(id, timer)
    console.log(id, timer)
    setTimeout(() => {
      navigateTo('/pages/manage/manage/manage?id=2');
    }, 1000)
  },

  //邀请面试(url)
  tapbtn(id, timer) {
    let token = wx.getStorageSync('accessToken') || [];
    let check = this.data.check;
    let sendStatus = 0;
    if (check) {
      sendStatus = 1
    } else {
      sendStatus = 0
    }
    wx.request({
      url: url + '/invitation/sendInvitation',
      method: 'post',
      data: {
        accessToken: token,
        id: id,
        invitationTime: timer,
        sendStatus: sendStatus
      },
      success: res => {
        console.log(res.data)
        if (res.data.success) {
          showToast(res.data.data, 'success', 800)
        } else {
          showToast(res.data.msg, 'none', 800)
        }
      }
    })
    this.hideModal();
  },

  //不合适
  delcard() {
    let token = wx.getStorageSync('accessToken') || [];
    let ids = [];
    ids.push(this.data.id);
    wx.request({
      url: url + '/technology/delBusinessCard',
      method: 'post',
      data: {
        accessToken: token,
        ids: ids,
      },
      success: res => {
        if (res.data.success) {
          showToast(res.data.data, 'success', 500)
          setTimeout(() => {
            navigateTo('/pages/manage/manage/manage')
          }, 1000)
        } else {
          showToast(res.data.msg, 'none', 1000)
        }
      }
    })
  },

  //不录取
  enroll() {
    showToast('即将上线，敬请期待!', 'none', 1000)
  },

  //录取
  admission() {
    let token = wx.getStorageSync('accessToken') || [];
    let id = parseInt(this.data.id);
    console.log(id);
    let demandId = this.data.demandId;
    let ids=[];
    ids.push(id);
    console.log(demandId, ids)
    wx.request({
      url: url + '/employment/confirmAdmission',
      method: 'post',
      data: {
        accessToken: token,
        ids: ids,
        demandId: demandId
      },
      success: res => {
        console.log(res.data)
        if (res.data.success) {
          showToast(res.data.data, 'success', 800)
        } else {
          showToast(res.data.msg, 'none', 800)
        }
      }
    })
  },

  //名片详情
  demail(res) {
    let avatar = res.data.data.avatar;
    let realName = res.data.data.realName;
    let dreamPosition = res.data.data.dreamPosition;
    let email = res.data.data.email;
    let sex = res.data.data.sex;
    let age = res.data.data.age;
    let profession = res.data.data.profession;
    let education = res.data.data.education;
    let graduationTime = res.data.data.graduationTime;
    let school = res.data.data.school;
    let experience = res.data.data.experience;
    let label = res.data.data.label;
    let description = res.data.data.description;
    let mobile = res.data.data.mobile;
    let id = res.data.data.id;
    if (res.data.success) {
      //console.log(res.data)
      if (id != null) {
        this.setData({
          avatar: avatar,
          realName: realName,
          dreamPosition: dreamPosition,
          email: email,
          sex: sex,
          age: age,
          profession: profession,
          education: education,
          graduationTime: graduationTime,
          school: school,
          experience: experience,
          label: label,
          description: description,
          mobile: mobile,
          id: id,
          demandflag: false,
        })
      }else{
        this.setData({
          avatar: avatar,
          realName: realName,
          dreamPosition: dreamPosition,
          email: email,
          sex: sex,
          age: age,
          profession: profession,
          education: education,
          graduationTime: graduationTime,
          school: school,
          experience: experience,
          label: label,
          description: description,
          mobile: mobile,
          demandflag: false,
        })
      }
      

    } else {
      showToast(res.data.msg, 'none', 1000);
    }
  },

  //获取已报名的名片详情
  accept(id, token) {
    wx.request({
      url: url + '/technology/acceptBusinessCardDetail',
      data: {
        accessToken: token,
        id: id
      },
      success: res => {
        console.log(res.data.data)
        this.demail(res)
      }
    })
  },

  //获取待面试的名片详情
  getcard(userId, token) {
    wx.request({
      url: url + '/invitation/getCardDetail',
      data: {
        accessToken: token,
        userId: userId
      },
      success: res => {
        console.log(res.data.data)
        this.demail(res)
      }
    })
  },

  onLoad: function(options) {
    let token = wx.getStorageSync('accessToken') || [];
    if (options.cur == 1) {
      this.accept(options.id, token)
      this.setData({
        cur: options.cur,
        id: options.id,
      })
    } else if (options.cur == 2) {
      console.log(options.id, options.cur, options.userid, options.demandId)
      this.getcard(options.userid, token)
      this.setData({
        cur: options.cur,
        id: options.id,
        userid: options.userid,
        demandId: options.demandId
      })
    }

  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },


  onUnload: function() {

  },

  onPullDownRefresh: function() {
    //this.onLoad()
  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})