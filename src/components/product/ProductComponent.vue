<template>
    <section id="control-wrapper">
      <div class="container">
        <div class="function-wrapper">
          <div class="check-all">
            <label class="checkbox">
              <input type="checkbox">
              <span></span>
            </label>
          </div>
          <div class="add-p-btn">
            <a id="add-btn" @click="isToggleAddBtn = !isToggleAddBtn">Add New Product <i class="fas fa-plus"></i></a>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="table-frame">
            <thead>
              <tr>
                <th :key="'ph'+index" v-for="(col, index) in tableHead">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="'p'+pid" v-for="(product, pid) in products">
                <td>
                  <label class="checkbox">
                    <input type="checkbox">
                    <span></span>
                  </label>
                  <div class="pic">
                    <img :src="product.pic" :alt="product.name">
                  </div>
                  <span>{{product.name}}</span>
                </td>
                <td>
                  <span>${{product.original}}</span>
                </td>
                <td><span>${{product.discount}}</span></td>
                <td colspan="3">
                  <div class="size-frame" :key="pid+ '-size-'+ sid" v-for="(s, sid) in product.sizes">
                    <div class="size"><span>{{s.size}}</span></div>
                    <div class="colors-frame" :key="pid + '-' + s.size +'-' + color.color" v-for="color in s.colors">
                      <div class="color"><span>{{color.color}}</span></div>
                      <div class="inventory"><span>{{color.inventory}}</span></div>
                    </div>
                  </div>
                </td>
                <td class="status">
                  <div class="select-wrapper" :class="isPublish(product.status) ? 'bg-green' : 'bg-gray'">
                    <span>{{product.status}}<i class="fas fa-angle-down"></i></span>
                    <div class="select-list">
                      <span @click="changeStatus(product.id, 'published')">PUBLISHED </span>
                      <span @click="changeStatus(product.id, 'unpblished')">UNPUBLISHED</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddProduct :productLen="products.length" :isToggle="isToggleAddBtn" v-on:closeBox="closeBox"></AddProduct>
    </section>
</template>

<script>
import AddProduct from './AddProductComponent.vue'
import { FirbaseApi } from '../../firebaseConfig.js'

export default {
  name: 'Product',
  components: {
    AddProduct
  },
  data () {
    return {
      isToggleAddBtn: false,
      tableHead: ['Product', 'Original', 'Discount', 'Size', 'Color', 'Inventory', 'Status'],
      products: []
    }
  },
  created () {
    this.scratchData()
  },
  methods: {
    isPublish (status) {
      return status === 'published'
    },
    closeBox (result) {
      // console.log('result' + result)
      this.isToggleAddBtn = result
      this.scratchData()
    },
    changeStatus (pid, status) {
      console.log(pid)
      console.log(status)
      let originData = this.products[pid]
      let db = FirbaseApi.database()
      let data = db.ref('/products/' + pid)
      console.log(originData)
      data.set({
        id: originData.id,
        name: originData.name,
        original: originData.original,
        discount: originData.discount,
        pic: originData.pic,
        sizes: originData.sizes,
        status: status
      })
      this.scratchData()
    },
    scratchData () {
      console.log('run scratch')
      this.products = []
      let db = FirbaseApi.database()
      let datasets = db.ref('/products')
      datasets.on('value', (p) => {
        console.log('p', p.val())
        p.forEach(e => {
          console.log('pl', e.val())
          this.products.push(e.val())
        })
        // for (let i = 0; i < p.val().length; i++) {
        //   console.log(p.val())
        //   this.products.push(p.val()[i])
        // }
      })
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/css/product.sass'
</style>
