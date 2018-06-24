<template>
    <section id="add-product-wrapper" :class="{active: isToggle}">
        <div class="add-frame">
            <div class="add-head">
                ADD NEW PRODUCT
                <a class="icon-close" @click="closeBox"><i class="fas fa-times"></i></a>
            </div>
            <div class="add-body">
                <div class="left">
                    <div class="upload">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <b>Drag an image or click here to upload…</b>
                    </div>
                    <div class="imgs-view">
                        <div>
                            <img :src="fakeImage" alt="">
                        </div>
                        <div>
                            <img :src="fakeImage" alt="">
                        </div>
                        <div>
                            <img :src="fakeImage" alt="">
                        </div>
                        <div>
                            <img :src="fakeImage" alt="">
                        </div>
                    </div>
                </div>
                <div class="right">
                    <b>Product Discription</b>
                    <input type="text" v-model="data.name">
                    <textarea name="" id="" cols="30" rows="10" v-model="data.descript"></textarea>

                    <b>Price</b>
                    <div class="price-setter">
                        <div class="set-box">
                            <span>Original</span>
                            <input type="number" v-model="data.original">
                        </div>
                        <div class="set-box">
                            <span>Discount</span>
                            <input type="number" v-model="data.discount">
                        </div>
                    </div>

                    <b>Specification</b>
                    <div class="specific-setter" :id="'specific-'+i" :key="'specific-' + i" v-for="(m, i) in data.sizes">
                        <div class="set-box">
                            <span>Size</span>
                            <select name="" id="" v-model="m.size">
                                <option value="L">L</option>
                                <option value="M">M</option>
                                <option value="S">S</option>
                            </select>
                        </div>
                        <div class="set-box">
                            <span>Color</span>
                            <input type="text" v-model="m.color">
                        </div>
                        <div class="set-box">
                            <span>Inventory</span>
                            <input type="number" v-model="m.inventory">
                        </div>
                    </div>
                    <a class="add-size" @click="addModule">ADD NEW SPECIFICATION <i class="fas fa-plus"></i></a>
                </div>
            </div>
            <div class="add-footer">
                <div class="submit-btn">
                    <a @click="checkInputsAndSend('unpublished')">SAVE DRAFT</a>
                    <button @click="checkInputsAndSend('published')">PUBLISH</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { FirbaseApi } from '../../firebaseConfig.js'

class Size {
  constructor (size, color, inventory) {
    this.size = size
    this.color = color
    this.inventory = inventory
  }
}

export default {
  name: 'AddProduct',
  props: ['isToggle', 'productLen'],
  data () {
    return {
      moduleLen: 1,
      fakeImage: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F',
      data: {
        name: '',
        descript: '',
        original: 0,
        discount: 0,
        sizes: [
          {
            size: '',
            color: '',
            inventory: 0
          }
        ],
        status: 'unpublished',
        timespan: 0
      },
      inputSizes: []
    }
  },
  methods: {
    closeBox () {
    //   console.log('box', this.isToggle)
      this.$emit('closeBox', !this.isToggle)
    },
    addModule () {
      this.moduleLen = this.moduleLen++
      let newSize = new Size('S', '', 1)
      this.data.sizes.push(newSize)
      console.log('module', this.data.sizes[0].size)
    },
    show () {
      console.log('資料', this.data)
      let db = FirbaseApi.database()
      var newPostKey = db.ref().child('products')
      console.log(newPostKey)
      console.log('l', this.productLen)
    },
    submitProduct (status) {
      let db = FirbaseApi.database()
      db.ref('/products').push().set({
        id: this.productLen,
        name: this.data.name,
        original: this.data.original,
        discount: this.data.discount,
        pic: this.fakeImage,
        sizes: this.data.sizes,
        status: status,
        timespan: new Date().getTime()
      }, (err) => {
        if (err) {
          console.log(err)
        } else {
          this.clearData()
          this.closeBox()
        // console.log('GOGOGO', err)
        }
      })
    },
    checkInputsAndSend (status) {
      if (this.data !== undefined && this.data.name !== '' &&
        this.data.original > 0 && this.data.sizes.length > 0) {
        let isValid = true
        for (let i = 0; i < this.data.sizes.length; i++) {
          if (this.data.sizes[i].color === '' ||
          this.data.sizes[i].size === '' ||
          this.data.sizes[i].inventory === '') {
            isValid = false
          }
        }
        console.log('result', isValid)
        if (isValid) {
          for (let s = 0; s < this.data.sizes.length; s++) {
            if (this.inputSizes.length === 0) {
              let sizeObj = {
                size: this.data.sizes[s].size,
                colors: [{
                  color: this.data.sizes[s].color,
                  inventory: this.data.sizes[s].inventory
                }]}
              this.inputSizes.push(sizeObj)
            } else {
              let hasSize = this.inputSizes.find((f) => {
                return f.size === this.data.sizes[s].size
              })
              if (hasSize !== undefined) {
                let colorObj = {
                  color: this.data.sizes[s].color,
                  inventory: this.data.sizes[s].inventory
                }
                hasSize.colors.push(colorObj)
              } else {
                let sizeObj = {
                  size: this.data.sizes[s].size,
                  colors: [{
                    color: this.data.sizes[s].color,
                    inventory: this.data.sizes[s].inventory
                  }]}
                this.inputSizes.push(sizeObj)
              }
            }
          }
          this.data.sizes = this.inputSizes
          this.submitProduct(status)
        }
      }
    },
    clearData () {
      this.data = {}
      this.inputSizes = []
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/css/add-product.sass'
</style>
