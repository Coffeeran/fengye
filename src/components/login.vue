<template>

  <div>
    <toast v-model="toast" :type="toastType">{{msg}}</toast>

    <div class="logo-area" style="margin-top: 20px; margin-bottom: 50px">
      <mu-row>
        <mu-col width="1" tablet="1" desktop="33">
        </mu-col>
        <mu-col width="70" tablet="65" desktop="33">
          <mu-paper class="demo-paper" circle :zDepth="2">
            <img style="margin-top: 15px;margin-left: 14px; width: 70%;" src="../assets/maple.png">
          </mu-paper>
        </mu-col>
      </mu-row>
    </div>
    <div style="margin:0 5px 0 5px;">
      <mu-row gutter>
        <mu-col width="8" tablet="8" desktop="33">
        </mu-col>
        <mu-col width="85" tablet="75" desktop="33">
          <mu-text-field label="用户名" hintText="请输入用户名" :errorText="errorText" v-model="username"/>
        </mu-col>
      </mu-row>
      <mu-row>
        <mu-col width="8" tablet="8" desktop="33">
        </mu-col>
        <mu-col width="85" tablet="75" desktop="33">
          <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="password"/>
        </mu-col>
      </mu-row>
      <mu-row>
        <mu-col width="10" tablet="8" desktop="33">
        </mu-col>
        <mu-col width="90" tablet="90" desktop="33">
          <mu-raised-button class="demo-raised-button" label="登     录" backgroundColor="#ef5350" @click="login"/>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vux'

  export default {
    components: {
      Toast
    },
    data () {
      return {
        username: '',
        password: '',
        toast: false,
        toastType: '',
        msg: '',
        errorText: ''
      }
    },
    methods: {
      login () {
        this.$http.post(process.env.API_HOST + 'user/login.do', {
          username: this.username,
          password: this.password
        }).then((res) => {
          if (res.data.status === 0) {
            this.toast = true
            this.msg = '登录成功'
            this.$router.push({name: 'addCandidate'})
          } else {
            this.toast = true
            this.toastType = 'cancel'
            this.msg = res.data.msg
          }
        })
      }
    },
    watch: {
      username (val) {
        if (val === '' || val === null) {
          this.errorText = '请填写用户名'
        } else {
          this.errorText = ''
        }
      }
    }
  }
</script>

<style>
  .demo-paper {
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 20px;
    text-aligin: center;
  }

  .demo-raised-button {
    width: 90%;
    font-size: 20px;
  }
</style>
