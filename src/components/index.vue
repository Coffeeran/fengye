<template>
  <div>
    <mu-raised-button label="注销" class="demo-raised-button" fullWidth primary @click="logout"/>
    <mu-raised-button label="新增供应商" @click="open" class="demo-raised-button" fullWidth backgroundColor="#a4c639"/>

    <mu-dialog :open="dialog" title="新增供应商" @close="close">
      <mu-text-field label="供应商" labelFloat fullWidth v-model="supplierName"/>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="submit" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        dialog: false,
        supplierName: ''
      }
    },
    methods: {
      open () {
        this.dialog = true
      },
      close () {
        this.supplierName = ''
        this.dialog = false
      },
      submit () {
        this.$http.get(process.env.API_HOST + 'supplier/add.do', {
          params: {
            supplierName: this.supplierName
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.dialog = false
            this.message(true, '添加 ' + this.supplierName + ' 成功', '')
            this.supplierName = ''
          } else {
            this.message(true, '添加失败', 'cancel')
          }
        })
      },
      message (val, msg, isSuccess) {
        if (val) {
          this.$vux.toast.show({
            text: msg,
            type: isSuccess,
            onShow () {
            },
            onHide () {
            }
          })
        } else {
          this.$vux.toast.hide()
        }
      },
      logout () {
        this.$http.post(process.env.API_HOST + 'user/logout.do').then((res) => {
          this.$router.push({name: 'login'})
        })
      }
    }
  }
</script>

<style>
  .router-view {
    width: 100%;
    top: 46px;
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
