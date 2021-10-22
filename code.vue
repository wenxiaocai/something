Vue.component('zButton', {
    template: `
        <a class="btn-line btn-filled" href="javascript:;" @click="handleClick">
            <span ref="btnF" class="vs-button-backgroundx vs-button--background"></span>
            <slot></slot>{{text}}</a>`,
    props: {
        text: {
            type: String
        },
        link: {
            type: String
        },

    },
    data: function() {
        return {

        }
    },
    mounted: function() {

    },
    computed: {},
    methods: {
        handleClick(el) {
            const eShadow = this.$refs.btnF;
            let left = 0,
                top = 0;
            if (el.currentTarget == el.target) {
                left = el.offsetX;
                top = el.offsetY;
            } else {
                left = el.offsetX + el.target.offsetLeft;
                top = el.offsetY + el.target.offsetTop;
            }
            eShadow.style.cssText = `opacity: 1; left:${left}px;top:${top}px; width: 300px; height: 300px; transition:width .8s ease 0s, height .8s ease 0s, opacity .8s ease 0s;`;
            setTimeout(function() {
                eShadow.style.cssText = 'opacity: 1; left: 61px; top: 30px; width: 0; height: 0; transition: width 0s ease 0s, height 0s ease 0s, opacity 0s ease 0s;';
            }, 1000)
            if (this.$listeners['click']) {
                this.$emit('click');
            } else {
                setTimeout(function() {
                    // window.open(this.link);
                }, 1000)
            }

        }
    }
})