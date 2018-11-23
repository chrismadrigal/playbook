<script>

export default {
    name: 'playbook-header',

    props: {
        /**
         * This user object should contain the following properties
         *
         * @param  {String} avatar_url  Avatar image url.
         * @param  {String} name        The User name.
         * @param  {String} bio         A string with scaped html for the user's bio.
         * @param  {Object} links       JSON object containing a list of social links.
         */
        user: {
            type: Object,
            required: true,
        },
    },
};
</script>

<template>
    <header class="user-profile">
        <span class="avatar">
            <img :src="user.avatar_url" :alt="user.name" />
        </span>
        <h1 class="title">{{ user.name }}</h1>
        <h2 v-html="user.bio"></h2>
        <ul class="profile-social-links">
            <li :key="key" v-for="(link, key) in user.links">
                <a :href="link" :class="key">
                    <span :class="`icon-${key} social-icon`" :title="key">{{ key }}</span>
                </a>
            </li>
        </ul>
    </header>
</template>
