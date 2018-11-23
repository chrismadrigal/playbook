<script>

export default {
    name: 'playbook-shot',

    props: {
        src1x: {
            type: String,
            required: true,
        },
        src2x: {
            type: String,
            required: true,
        },

        alt: {
            type: String,
            default: '',
        },
    },

    computed: {
        imageSrc() {
            return this.isRetina() ? this.src2x : this.src1x;
        },
    },

    methods: {
        isRetina() {
            return window.matchMedia ? (
                window.matchMedia('only screen and (min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches ||
                (window.devicePixelRatio > 1)
            ) : false;
        },
    },
};
</script>

<template>
    <span class="dribbble-shot">
        <img :src="imageSrc" :alt="alt" />
    </span>
</template>
