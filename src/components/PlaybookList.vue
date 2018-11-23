<script>
import PlaybookShot from './PlaybookShot.vue';

export default {
    name: 'playbook-list',

    components: {
        PlaybookShot,
    },

    props: {
        // An array for shots returned by the JSON api.
        shots: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <section class="playbook-list">
        <ul class="dribbble-shots">
            <li :key="shot.id" v-for="(shot) in shots">
                <a :href="shot.html_url" :title="shot.title" @click.prevent="$emit('shotSelected', shot.id)">
                    <playbook-shot :src1x="shot.images.normal" :src2x="shot.images.hidpi" :alt="shot.title">
                    </playbook-shot>
                </a>
            </li>
        </ul>
    </section>
</template>
