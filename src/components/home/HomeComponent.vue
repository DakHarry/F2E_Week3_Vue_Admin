<template>
    <section id="overview-wrapper">
      <div class="container">
        <div class="overview-title-wrapper">
          <div class="overview-title">
            OVERVIEW
          </div>
          <div class="overview-date-wrapper">
            2018/6/6 > 2018/6/13
          </div>
        </div>
        <div class="overview-card-wrapper">
          <div class="card">
            <h3 class="card-title">TOTAL REVENUE</h3>
            <span class="card-amount green">NT${{convertNumber(1111111)}}</span>
          </div>
          <div class="card">
            <h3 class="card-title">TOTAL COST</h3>
            <span class="card-amount red">NT${{convertNumber(1111111)}}</span>
          </div>
          <div class="card">
            <h3 class="card-title">NET INCOME</h3>
            <span class="card-amount blue">NT${{convertNumber(1111111)}}</span>
          </div>
        </div>
        <div class="activity-wrapper">
          <div class="card">
            <h2>Activity</h2>
            <div class="chart-container">
              <canvas id="total-chart" width="800" height="400"></canvas>
            </div>
          </div>
        </div>
        <div class="anaylsis-wrapper">
          <div class="transaction-wrapper card">
            <h2 class="card-title">Transaction Website</h2>
            <div class="websites-wrapper">
              <div class="website" :key="website.name" v-for="website in websites">
                <div class="site-logo">
                  <i :class="website.logo"></i>
                </div>
                <div class="site-title">{{website.name}}</div>
                <div class="site-income">${{convertNumber(website.revenue)}}</div>
                <div class="site-ratio" :class="website.isgrowth ? 'growth' : 'decline'"><i :class="website.isgrowth? 'fas fa-arrow-up': 'fas fa-arrow-down'"></i> {{website.ratio}}%</div>
              </div>
            </div>
          </div>
          <div class="orders-wrapper card">
            <h2 class="card-title">Latest Orders</h2>
            <div class="lastest-order-wrapper">
              <div class="order" :key="order.id" v-for="order in orders">
                <div class="order-pic">
                  <img :src="order.product.pic" :alt="order.product.name">
                </div>
                <div class="order-info">
                  <h3>{{order.product.name}}</h3>
                  <div><i class="fas fa-clock"></i> {{order.orderTime}}</div>
                  <div><i class="fas fa-male"></i> {{order.customerName}}</div>
                </div>
                <div class="order-total">
                  <h5>Total</h5>
                  <div>
                    ${{convertNumber(order.total)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'Home',
  data () {
    return {
      saleData: {
        revenues: [
          {
            date: '2018-6-6',
            total: 7500
          },
          {
            date: '2018-6-6',
            total: 7500
          },
          {
            date: '2018-6-7',
            total: 7000
          },
          {
            date: '2018-6-8',
            total: 6500
          },
          {
            date: '2018-6-9',
            total: 7500
          },
          {
            date: '2018-6-10',
            total: 7200
          },
          {
            date: '2018-6-11',
            total: 6700
          },
          {
            date: '2018-6-12',
            total: 7100
          },
          {
            date: '2018-6-13',
            total: 7000
          }
        ],
        costs: [
          {
            date: '2018-6-6',
            total: 5500
          },
          {
            date: '2018-6-6',
            total: 4500
          },
          {
            date: '2018-6-7',
            total: 4000
          },
          {
            date: '2018-6-8',
            total: 5500
          },
          {
            date: '2018-6-9',
            total: 6500
          },
          {
            date: '2018-6-10',
            total: 6200
          },
          {
            date: '2018-6-11',
            total: 3700
          },
          {
            date: '2018-6-12',
            total: 4100
          },
          {
            date: '2018-6-13',
            total: 5000
          }
        ],
        incomes: [
          {
            date: '2018-6-6',
            total: 5500
          },
          {
            date: '2018-6-6',
            total: 5500
          },
          {
            date: '2018-6-7',
            total: 6000
          },
          {
            date: '2018-6-8',
            total: 5500
          },
          {
            date: '2018-6-9',
            total: 6500
          },
          {
            date: '2018-6-10',
            total: 4500
          },
          {
            date: '2018-6-11',
            total: 6700
          },
          {
            date: '2018-6-12',
            total: 5100
          },
          {
            date: '2018-6-13',
            total: 7000
          }
        ]
      },
      websites: [
        {
          name: 'Facebook.com',
          logo: 'fab fa-facebook',
          revenue: 45836,
          isgrowth: true,
          ratio: 20
        },
        {
          name: 'Google.com',
          logo: 'fab fa-google',
          revenue: 23582,
          isgrowth: true,
          ratio: 12
        },
        {
          name: 'Yahoo.com',
          logo: 'fab fa-yahoo',
          revenue: 2489,
          isgrowth: false,
          ratio: 15
        },
        {
          name: 'Wordpress.com',
          logo: 'fab fa-wordpress',
          revenue: 1057,
          isgrowth: false,
          ratio: 30
        }
      ],
      orders: [
        {
          id: 1,
          orderTime: '2018/06/13 13:42',
          customerName: 'Belle Willis',
          product: {
            id: 1,
            name: 'Vintage T-shirt',
            qty: 1,
            price: 3200,
            pic: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F'
          },
          total: 3200
        },
        {
          id: 2,
          orderTime: '2018/06/13 10:45',
          customerName: 'Adrian Cummings',
          product: {
            id: 2,
            name: 'Cowboy Jacket',
            qty: 1,
            price: 2800,
            pic: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F'
          },
          total: 2800
        },
        {
          id: 3,
          orderTime: '2018/06/13 8:26',
          customerName: 'Lura Holland',
          product: {
            id: 3,
            name: 'Coach Coat',
            qty: 1,
            price: 1600,
            pic: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/22405942_1881658555185516_7339480286672590243_n.jpg?_nc_cat=0&_nc_eui2=AeG23_X4zeKBvSdcWZj6ZZuF4E7w5_CEaRh4V7qBXKgQDuZDj2lEWG-PHYvq1y3_IKxj3l45-ucU4dWRLpnLErgHuout0Z7xN5U7Pcsbqm0cTA&oh=7e483e1680805780aaf6ff52e562e653&oe=5BACC38F'
          },
          total: 1600
        }
      ]
    }
  },
  mounted () {
    this.mapChart()
  },
  methods: {
    mapChart () {
      const canvas = document.getElementById('total-chart').getContext('2d')

      const myLineChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.getLabels(),
          datasets: [
            {
              label: 'revenue',
              borderWidth: '0',
              borderColor: '#7ed321',
              fill: false,
              data: this.getRevenueData()
            },
            {
              label: 'cost',
              borderWidth: '0',
              borderColor: '#d0021b',
              fill: false,
              data: this.getCostData()
            },
            {
              label: 'income',
              borderWidth: '0',
              borderColor: '#4a90e2',
              fill: false,
              data: this.getIncomeData()
            }
          ]
        },
        options: {
          responsive: true,
          hoverMode: 'index',
          stacked: false,
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: '天'
                }
              }
            ],
            yAxes: [
              {
                type: 'linear',
                display: true,
                id: '1',
                scaleLabel: {
                  display: true,
                  labelString: '金額'
                }
              },
              {
                type: 'linear',
                display: false,
                id: '2'
              },
              {
                type: 'linear',
                display: false,
                id: '3'
              }
            ]
          }
        }
      })
      console.log('chart', myLineChart)
    },
    getLabels () {
      let labels = []
      this.saleData.revenues.map((r) => labels.push(r.date))
      console.log(labels)
      return labels
    },
    getRevenueData () {
      let totals = []
      this.saleData.revenues.map((r) => totals.push(r.total))
      return totals
    },
    getCostData () {
      let totals = []
      this.saleData.costs.map((r) => totals.push(r.total))
      return totals
    },
    getIncomeData () {
      let totals = []
      this.saleData.incomes.map((r) => totals.push(r.total))
      return totals
    },
    convertNumber (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/css/home.sass'
</style>
