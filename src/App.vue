<script>
import * as API from './api';
import PlaybookHeader from './components/PlaybookHeader.vue';
import PlaybookList from './components/PlaybookList.vue';
import PlaybookOverlay from './components/PlaybookOverlay.vue';

export default {
    name: 'app',

    components: {
        PlaybookHeader,
        PlaybookList,
        PlaybookOverlay,
    },
};
</script>

<template>
    <main id="app">
        <playbook-header></playbook-header>
        <playbook-list></playbook-list>
        <div v-if="isLoading" class="loading-text">Loading Shots...</div>
        <playbook-overlay></playbook-overlay>
    </main>
</template>
