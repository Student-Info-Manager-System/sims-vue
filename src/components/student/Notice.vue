<template>
    <div>
        <van-swipe-cell v-if="!$str.isNull(showText)">
            <van-notice-bar
                    v-show="wipeShow"
                    left-icon="volume-o"
                    scrollable
                    :text=showText
            />

            <template #right>
                <van-button square type="danger" @click="wipeShow = false" text="暂时屏蔽"/>
            </template>
        </van-swipe-cell>
    </div>
</template>

<script>

    export default {
        name: "Notice",
        components: {
        },
        props: {
            text: null,
        },
        data() {
            return {
                wipeShow: true,
                showText: ''
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {},
        watch: {
            text() {
                setTimeout(() => {
                    this.showText = this.text;
                }, 100)

            }
        }
    }
</script>

<style scoped>

</style>
