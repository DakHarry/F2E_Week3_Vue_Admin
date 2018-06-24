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
                    <input type="text" value="Vestibulum nec">
                    <textarea name="" id="" cols="30" rows="10"></textarea>

                    <b>Price</b>
                    <div class="price-setter">
                        <div class="set-box">
                            <span>Original</span>
                            <input type="number" value="1000">
                        </div>
                        <div class="set-box">
                            <span>Discount</span>
                            <input type="number" value="900">
                        </div>
                    </div>

                    <b>Specification</b>
                    <div class="specific-setter">
                        <div class="set-box">
                            <span>Size</span>
                            <select name="" id="">
                                <option value="L">L</option>
                                <option value="M">M</option>
                                <option value="S">S</option>
                            </select>
                        </div>
                        <div class="set-box">
                            <span>Color</span>
                            <input type="text" value="red">
                        </div>
                        <div class="set-box">
                            <span>Inventory</span>
                            <input type="number" value="100">
                        </div>
                    </div>
                    <a class="add-size" href="">ADD NEW SPECIFICATION <i class="fas fa-plus"></i></a>
                </div>
            </div>
            <div class="add-footer">
                <div class="submit-btn">
                    <a href="">SAVE DRAFT</a>
                    <button>PUBLISH</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'AddProduct',
  props: ['isToggle'],
  data () {
    return {
      fakeImage: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F'
    }
  },
  methods: {
    closeBox () {
    //   console.log('box', this.isToggle)
      this.$emit('closeBox', !this.isToggle)
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/css/add-product.sass'
</style>
