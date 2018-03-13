<template>
  <div>
    <div style="margin:0 5px 10px 5px;">
      <mu-row gutter>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-auto-complete fullWidth label="供应商" :maxHeight="200" @select="handleSupplierSelect"
                            :dataSourceConfig="sourceConfig" openOnFocus labelFloat :dataSource="supplierList"
                            filter="caseInsensitiveFilter"/>
        </mu-col>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-auto-complete fullWidth label="渠道" :maxHeight="200" @select="handleDepartmentSelect"
                            :dataSourceConfig="sourceConfig" openOnFocus labelFloat fullWidth
                            :dataSource="departmentList" filter="caseInsensitiveFilter"/>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="100" desktop="33">
          <vue-core-image-upload
            accept="image/*"
            :crop="false"
            @imageuploaded="frontResponse"
            :data="{isFront: true}"
            compress="100"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/candidate/img_to_str.do">
            <mu-raised-button label="证件正面拍照" labelPosition="before" icon="camera_alt" primary fullWidth/>
          </vue-core-image-upload>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="45" tablet="50" desktop="33" style="height: 80%;">
          <mu-text-field label="姓名" labelFloat fullWidth v-model="candidate.name"/>
        </mu-col>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-text-field label="性别" labelFloat fullWidth v-model="candidate.gender"/>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-text-field label="出生日期" labelFloat fullWidth v-model="candidate.dateOfBirth"/>
        </mu-col>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-text-field label="民族" labelFloat fullWidth v-model="candidate.ethnicity"/>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="33">
          <mu-text-field label="住址" labelFloat fullWidth v-model="candidate.address"/>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="33">
          <mu-text-field label="身份证号码" labelFloat fullWidth v-model="candidate.idNo"/>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="100" desktop="33">
          <vue-core-image-upload
            class="photoButton"
            accept="image/*"
            :crop="false"
            @imageuploaded="backResponse"
            @imageuploading="backUploading"
            :data="{isFront: false}"
            compress="100"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/candidate/img_to_str.do">
            <mu-raised-button label="证件反面拍照" labelPosition="before" icon="camera_alt" secondary fullWidth/>
          </vue-core-image-upload>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="33">
          <mu-text-field label="签发机关" labelFloat fullWidth v-model="candidate.issueDepartment"/>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-text-field label="签发日期" labelFloat fullWidth v-model="candidate.issueDate"/>
        </mu-col>
        <mu-col width="45" tablet="50" desktop="33">
          <mu-text-field label="失效日期" labelFloat fullWidth v-model="candidate.expireDate"/>
        </mu-col>
      </mu-row>

      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="33">
          <mu-raised-button label="确定" @click="open" backgroundColor="#8bc34a" fullWidth/>
        </mu-col>
      </mu-row>
    </div>
    <mu-dialog :open="dialog" :title="candidate.name+'->'+department.name+'->'+supplier.name" bodyClass="dialog-body">
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field :inputClass="'phoneNumber'" ref="phoneNumber" hintText="电话号码" type="number" icon="phone"
                         v-model="candidate.phone" :maxLength="11"/>
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-raised-button label="取消" slot="actions" @click="close" backgroundColor="#f44336"/>
      <mu-raised-button v-if="isBackFinished" label="提交" slot="actions" primary @click="saveCandidate"/>
    </mu-dialog>
  </div>
</template>

<script>
  import {GroupTitle, Group, Cell, XInput, XNumber, Selector, XAddress, PopupPicker} from 'vux'
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default {
    components: {
      GroupTitle,
      Group,
      Cell,
      XInput,
      XNumber,
      Selector,
      XAddress,
      PopupPicker,
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        dialog: false,
        candidate: {
          id: '',
          name: '',
          gender: '',
          ethnicity: '',
          dateOfBirth: '',
          address: '',
          idNo: '',
          issueDepartment: '',
          issueDate: '',
          expireDate: '',
          phone: ''
        },
        supplier: {
          id: '',
          name: ''
        },
        supplierList: [],
        department: {
          id: '',
          name: ''
        },
        departmentList: [],
        sourceConfig: {
          text: 'name',
          value: 'id'
        }
      }
    },
    methods: {
      frontResponse (res) {
        this.candidate.name = res.data.words_result.姓名.words
        this.candidate.ethnicity = res.data.words_result.民族.words
        this.candidate.address = res.data.words_result.住址.words
        this.candidate.idNo = res.data.words_result.公民身份号码.words
        this.candidate.dateOfBirth = res.data.words_result.出生.words
        this.candidate.gender = res.data.words_result.性别.words
      },
      backResponse (res) {
        this.candidate.issueDepartment = res.data.words_result.签发机关.words
        this.candidate.issueDate = res.data.words_result.签发日期.words
        this.candidate.expireDate = res.data.words_result.失效日期.words
      },
      backUploading () {
        this.open()
      },
      saveCandidate () {
        if (this.supplier.id === '' || this.supplier.id === null) {
          this.message(true, '请选择供应商', 'cancel')
          return
        }
        if (this.candidate.idNo === '' || this.candidate.idNo === null) {
          this.message(true, '请填写正面信息', 'cancel')
          return
        }
        if (this.candidate.issueDepartment === '' || this.candidate.issueDepartment === null) {
          this.message(true, '请填写背面信息', 'cancel')
          return
        }
        this.$http.post(process.env.API_HOST + 'candidate/save.do', {
          id: this.candidate.id,
          name: this.candidate.name,
          gender: this.candidate.gender,
          ethnicity: this.candidate.ethnicity,
          dateOfBirth: this.DateTimeUtil(this.candidate.dateOfBirth),
          address: this.candidate.address,
          idNo: this.candidate.idNo,
          issueDepartment: this.candidate.issueDepartment,
          issueDate: this.DateTimeUtil(this.candidate.issueDate),
          expireDate: this.DateTimeUtil(this.candidate.expireDate),
          phone: this.candidate.phone
        }).then((res) => {
          if (res.data.status === 0) {
            this.dialog = false
            this.candidate.id = res.data.data.id
            this.addToReception()
          } else {
            this.message(true, '添加失败', 'cancel')
          }
        })
      },
      addToReception () {
        this.$http.get(process.env.API_HOST + 'reception/add_to_reception.do', {
          params: {
            candidateIdArray: this.candidate.id,
            supplierId: this.supplier.id,
            departmentId: this.department.id
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.message(true, '添加成功', '')
            this.candidate.id = ''
            this.candidate.name = ''
            this.candidate.ethnicity = ''
            this.candidate.address = ''
            this.candidate.idNo = ''
            this.candidate.dateOfBirth = ''
            this.candidate.gender = ''
            this.candidate.issueDepartment = ''
            this.candidate.issueDate = ''
            this.candidate.expireDate = ''
            this.candidate.phone = ''
          } else {
            this.message(true, '添加失败', 'cancel')
          }
        })
      },
      open () {
        this.dialog = true
//        this.$nextTick(() => {
//          this.$refs.phoneNumber.focus()
//          document.getElementsByClassName('phoneNumber')[0].focus()
//        })
      },
      close () {
        this.dialog = false
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
      handleSupplierSelect (val) {
        this.supplier.id = val.id
        this.supplier.name = val.name
      },
      handleDepartmentSelect (val) {
        this.department.id = val.id
        this.department.name = val.name
      }
    },
    computed: {
      isBackFinished () {
        if (this.candidate.issueDepartment === '' || this.candidate.issueDepartment === null) {
          return false
        } else {
          return true
        }
      }
    },
    watch: {},
    created () {
      this.$http(process.env.API_HOST + 'supplier/list.do').then((res) => {
        this.supplierList = res.data.data
      })
      this.$http.get(process.env.API_HOST + 'department/list.do').then((res) => {
        this.departmentList = res.data.data
      })
    }
  }
</script>

<style scoped>

</style>
