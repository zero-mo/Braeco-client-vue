<template>
    <div id="tips">
        <div class='tips-container'>
            <transition :name="transitionName" mode="out-in">
                <div class='tips'
                    v-if="tipsItem.content"
                    v-bind:class="{
                        'success': tipsItem.status === 'success',
                        'error': tipsItem.status === 'error'
                    }"
                >{{tipsItem.content}}</div>
            </transition>
        </div>
    </div>
</template>

<script>

module.exports = {
    name: 'tips',
    data() {
        return {
            transitionName: 'fade',
            tipsItem: {},
            timestampForhide: 1500,
            timerId: null,
            debounce_callback: null
        };
    },
    created() {
        let vm = this;
        this.$root.$on("tips:success", function(content) {
            vm.getData({
                status: "success",
                content: content
            });
        });
        this.$root.$on("tips:error", function(content) {
            vm.getData({
                status: "error",
                content: content
            });
        });

        this.debounce_callback = this.debounce(function() {
            vm.tipsItem = {};
            vm.timerId = null;
        }, this.timestampForhide);
    },
    methods: {
        getData(opts) {
            this.showContent(opts);
            let vm = this;
            this.debounce_callback();
        },
        showContent(opts) {
            this.tipsItem = {};
            let vm = this;
            setTimeout(function() {
                vm.tipsItem = {
                    status: opts.status,
                    content: opts.content
                };
            }, 100);
        },
        debounce(fn, timestamp) {
            var lastEmitTimestamp = -1;
            let vm = this;
            function callback() {
                var now = +new Date();
                var diffTimestamp = now - lastEmitTimestamp;
                if (diffTimestamp >= timestamp) {
                    if (typeof fn === 'function') {
                        fn();
                    }
                } else {
                    vm.timerId = setTimeout(function() {
                        callback();
                    }, timestamp - diffTimestamp);
                }
            }
            return function() {
                lastEmitTimestamp = +new Date();
                if (!vm.timerId) {
                    vm.timerId = setTimeout(function() {
                        callback();
                    }, timestamp);
                }
            }
        }
    }
}

</script>

<style scoped lang="less">

#tips {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .tips {
        padding: 13px 16px;
        color: #fff;
        line-height: 20px;
        font-size: 14px;
        &.success {
            background-color: #08CC6A;
        }
        &.error {
            background-color: #EB4F10;
        }
    }
}

</style>
