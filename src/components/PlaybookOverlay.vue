<script>
import PlaybookShot from './PlaybookShot.vue';

export default {
    name: 'playbook-overlay',

    components: {
        PlaybookShot,
    },

    props: {
        // A flag for showing and hidding the overlay
        show: {
            type: Boolean,
            required: true,
        },

        // An array for shots returned by the JSON api.
        shots: {
            type: Array,
            required: true,
        },

        // The selectedIndex used for updating the selected shot.
        selectedIndex: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            activeIndex: this.selectedIndex,
        };
    },

    computed: {
        totalShots() {
            return this.shots.length;
        },

        activeShot() {
            return this.shots[this.activeIndex];
        },

        isFirst() {
            return this.activeIndex === 0;
        },

        isLast() {
            return this.activeIndex + 1 === this.totalShots;
        },
    },

    watch: {
        // Disable/Enable body scroll when the overlay opens/close.
        show(newVal, oldVal) {
            if (newVal && !oldVal) {
                document.body.classList.add('disable-scroll');
            }

            if (!newVal && oldVal) {
                document.body.classList.remove('disable-scroll');
            }
        },

        // Watch for changes on the selected index prop and update local prop.
        selectedIndex(newVal) {
            this.activeIndex = newVal;
        },
    },

    methods: {
        // Trigger close if clicking outside of content.
        OnClickOverlay(e) {
            if (e.target === this.$el) {
                this.triggerClose();
            }
        },

        // Emit a close event to the parent component.
        triggerClose() {
            this.$emit('close');
        },

        // Trigger prev shot by decrementing the active index.
        triggerPrev() {
            if (!this.isFirst) {
                this.activeIndex--;
            }
        },

        // Trigger next shot by incrementing the active index.
        triggerNext() {
            if (!this.isLast) {
                this.activeIndex++;
            }
        },

        // Enable keyboard shotcuts for navigating and close overlay.
        handleKeyboardShortcuts(event) {
            switch (event.keyCode) {
                // esc key. Close overlay.
                case 27:
                    this.triggerClose();
                    break;
                // Left arrow key
                case 37:
                    this.triggerPrev();
                    break;
                // Right arrow key
                case 39:
                    this.triggerNext();
                    break;
                default:
                    break;
            }
        },
    },

    mounted() {
        window.addEventListener('keyup', this.handleKeyboardShortcuts);
    },

    destroyed() {
        window.removeEventListener('keyup', this.handleKeyboardShortcuts);
    },
};
</script>

<template>
    <transition name="fade-in">
        <section v-if="show" class="playbook-overlay" @click="OnClickOverlay">
            <a href="#" class="close-overlay" aria-label="Close" title="Close" @click.prevent="triggerClose">
                <span class="icon-close">Close</span>
            </a>
            <div class="playbook-content">
                <div class="content-top">
                    <div class="content-shot">
                        <playbook-shot :src1x="activeShot.images.normal" :src2x="activeShot.images.hidpi" :alt="activeShot.title">
                        </playbook-shot>
                    </div>
                    <div class="content-info">
                        <h2 class="title">{{ activeShot.title }}</h2>
                        <div class="description" v-html="activeShot.description"></div>
                        <a :href="activeShot.html_url" class="button">View on Dribbble</a>
                    </div>
                </div>
                <div v-if="activeShot.attachments.length" class="content-bottom">
                    <ul class="playbook-attachments">
                        <li :key="index" v-for="(attachment, index) in activeShot.attachments">
                            <img :src="attachment.url" alt="Playbook Attachment" />
                        </li>
                    </ul>
                </div>
                <ul class="playbook-nav">
                    <li v-if="!isFirst" class="prev">
                        <a href="#" @click.prevent="triggerPrev">
                            <span class="icon-prev">Prev</span>
                        </a>
                    </li>
                    <li v-if="!isLast" class="next">
                        <a href="#" @click.prevent="triggerNext">
                            <span class="icon-next">Next</span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    </transition>
</template>
