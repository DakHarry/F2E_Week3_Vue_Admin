<template>
    <footer>
        <ul>
            <li><a href="https://github.com/DakHarry/F2E_Week3_Vue_Admin" target="_blank">MyGitHub</a></li>
            <li>@DKHarry</li>
        </ul>
    </footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>

<style lang="sass" scoped>
footer
    position: fixed
    width: 100%
    bottom: 0
    left: 0
    height: 34px
    line-height: 34px
    background-color: #000
    color: #fff
    padding-left: 150px
    ul
        width: 100%
        li
            display: inline-block
            padding-left: 1rem
            a
                text-decoration: none
                color: #fff
</style>
