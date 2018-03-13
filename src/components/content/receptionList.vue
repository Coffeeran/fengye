<template>
  <div>

    <div>
      <mu-row gutter>
        <mu-raised-button :label="'当天人次：'+receptionList.length" class="demo-raised-button" fullWidth primary
                          backgroundColor="#00c853" @click="fetchAllReceptionList"/>
      </mu-row>
      <mu-row>
        <mu-col>
        </mu-col>
      </mu-row>
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>姓名</th>
          <th>身份证号码</th>
          <th>渠道</th>
          <th>供应商</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in receptionList">
          <td>{{item.candidateName}}</td>
          <td>{{item.candidateIdNo}}</td>
          <td>{{item.departmentName}}</td>
          <td>{{item.supplierName}}</td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <mu-float-button style="float: right;" icon="get_app" @click="export2Excel" mini class="demo-float-button"/>
  </div>
</template>

<script>
  import {XTable, dateFormat} from 'vux'

  export default {
    components: {
      XTable
    },
    data () {
      return {
        receptionList: []
      }
    },
    methods: {
      fetchReceptionList () {
        this.$http.get(process.env.API_HOST + 'reception/list.do', {
          params: {
            date: new Date().getTime(),
            pageNum: 1,
            pageSize: 500
          }
        }).then((res) => {
          this.receptionList = res.data.data.list
        })
      },
      fetchAllReceptionList () {
        this.$http.get(process.env.API_HOST + 'manage/reception/list.do', {
          params: {
            date: new Date().getTime(),
            pageNum: 1,
            pageSize: 500
          }
        }).then((res) => {
          this.receptionList = res.data.data.list
        })
      },
      export2Excel () {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel')
          const tHeader = ['姓名', '性别', '民族', '出生日期', '地址', '身份证号码', '签发机关', '签发日期', '失效日期', '供应商', '渠道', '联系电话', '录入日期', '公司渠道']
          const filterVal = ['candidateName', 'candidateGender', 'candidateEthnicity',
            'candidateDateOfBirth', 'candidateAddress', 'candidateIdNo', 'candidateIssueDepartment', 'candidateIssueDate', 'candidateExpireDate',
            'supplierName', 'departmentName', 'candidatePhone', 'createTime', 'factoryName']
          const list = this.receptionList
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, dateFormat(new Date(), 'YYYY-MM-DD') + '录入名单')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    computed: {
      dateTime () {
        return dateFormat(new Date(), 'YYYY-MM-DD')
      },
      receptionCount () {
        return this.receptionList.length
      }
    },
    created () {
      this.fetchReceptionList()
    }
  }
</script>

<style>

</style>
