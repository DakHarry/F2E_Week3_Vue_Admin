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
                      <span>PUBLISHED </span>
                      <span>UNPUBLISHED</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddProduct :isToggle="isToggleAddBtn" v-on:closeBox="closeBox"></AddProduct>
    </section>
</template>

<script>
import AddProduct from './AddProductComponent.vue'

export default {
  name: 'Product',
  components: {
    AddProduct
  },
  data () {
    return {
      isToggleAddBtn: false,
      tableHead: ['Product', 'Original', 'Discount', 'Size', 'Color', 'Inventory', 'Status'],
      products: [
        {
          id: 1,
          name: 'Mauris non tem.',
          pic: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F',
          original: 3200,
          discount: 2800,
          sizes: [
            {
              size: 'L',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            },
            {
              size: 'M',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            },
            {
              size: 'S',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            }
          ],
          status: 'published'
        },
        {
          id: 2,
          name: 'Mauris non tem.',
          pic: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F',
          original: 3200,
          discount: 2800,
          sizes: [
            {
              size: 'L',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            },
            {
              size: 'M',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            },
            {
              size: 'S',
              colors: [
                {
                  color: 'Gray',
                  inventory: 15
                },
                {
                  color: 'Black',
                  inventory: 20
                }
              ]
            }
          ],
          status: 'unpublished'
        }
      ]
    }
  },
  methods: {
    isPublish (status) {
      return status === 'published'
    },
    closeBox (result) {
      // console.log('result' + result)
      this.isToggleAddBtn = result
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/css/product.sass'
</style>
