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

    data() {
        return {
            user: {},
            shots: [],
            page: 1,
            maxPage: 3,
            isLoading: true,
            showOverlay: false,
        };
    },

    methods: {
        // Get playbook shots based on the current page and push to our local prop.
        getShots() {
            if (this.page <= this.maxPage) {
                API.getShots(this.page).then((response) => {
                    this.shots.push(...Object.values(response.data));
                    this.isLoading = false;
                });
            } else {
                // Do some cleanup after we fetch the max amount of pages
                this.isLoading = false;
                window.removeEventListener('scroll', this.onScroll);
            }
        },

        // Handle page scrolling, check if we reached the bottom and fetch more results.
        onScroll() {
            if (this.pageReachedBottom() && !this.isLoading) {
                // Show loading text while we are fetching results.
                this.isLoading = true;

                // Increment page before we fetch results.
                this.page++;

                // Fetch the next set of results.
                this.getShots();
            }
        },

        // Calculate if user scroll to the bottom of the page with a 200px threshold.
        pageReachedBottom() {
            const scrollY = window.scrollY;
            const threshold = 200;
            const visible = document.documentElement.clientHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = visible + scrollY + threshold >= pageHeight;
            return bottomOfPage || pageHeight < visible;
        },
    },

    created() {
        // Fetch user profile information
        API.getProfileInfo().then((response) => {
            this.user = response.data;
        });

        // Fetch initial set of shots.
        this.getShots();
    },

    mounted() {
        // Add event listener for window scrolling to lazy-load more content.
        window.addEventListener('scroll', this.onScroll);
    },
};
</script>

<template>
    <main id="app">
        <playbook-header :user="user">
        </playbook-header>
        <playbook-list :shots="shots" @shotSelected="onSelectedShot">
        </playbook-list>
        <div v-if="isLoading" class="loading-text">Loading Shots...</div>
        <playbook-overlay></playbook-overlay>
    </main>
</template>

<style lang="scss">
    // Variables
    $greyLighter: #ededed;
    $greyLight: #cccccc;
    $grey: #a1a1a1;
    $greyDark: #474747;
    $pink: #ea518a;
    $white: #fff;
    $overlayBg: rgba(255, 255, 255, 0.98);

    // Media Query Breakpoints
    $mobileSm: 'screen and (max-width: 460px)';
    $mobile: 'screen and (max-width: 767px)';
    $tablet: 'screen and (min-width: 768px)';
    $touch: 'screen and (max-width: 1210px)';
    $desktop: 'screen and (min-width: 1211px)';
    $desktopLg: 'screen and (min-width: 1440px)';
    $widescreen: 'screen and (min-width: 1780px)';

    // Mixins
    @mixin breakpoint($breakpoint) {
        @media #{$breakpoint} {
            @content;
        }
    }

    @mixin aspectRatio($w, $h) {
        $ratio: ($h / $w);

        &:before {
            content: '';
            display: block;
            padding-top: (100% * $ratio);
        }
    }

    // Mini Reset
    html {
        box-sizing: border-box;
        font-size: 16px;
        color: $grey;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    ::selection {
        background: $pink;
        color: $white;
    }

    body, h1, h2, h3, h4, h5, h6, p, ol, ul {
        margin: 0;
        padding: 0;
        font-weight: normal;
    }

    ol, ul {
        list-style: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    a {
        text-decoration: none;
        color: $grey;

        &:hover {
            color: $greyDark;
        }
    }

    p {
        margin: 0 0 25px 0;
        line-height: 1.5em;

        &:last-child {
            margin-bottom: 0;
        }
    }

    #app {
        margin-bottom: 60px;
    }

    // User profile header
    .user-profile {
        text-align: center;
        padding: 20px 30px;
        max-width: 680px;
        margin: 0 auto 30px;
        border-bottom: 1px solid $greyLighter;

        @include breakpoint($desktop) {
            max-width: 890px;
        }

        @include breakpoint($desktopLg) {
            max-width: 1350px;
        }

        .avatar {
            display: inline-block;
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            background: $greyLighter;
            margin-bottom: 12px;

            @include breakpoint($desktop) {
                width: 80px;
                height: 80px;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

        h1 {
            font-size: 20px;
            margin-bottom: 5px;

            @include breakpoint($tablet) {
                font-size: 26px;
            }
        }

        h2 {
            font-size: 20px;
            font-weight: normal;
            line-height: 1.4;
            color: rgba(0, 0, 0, 0.51);
            max-width: 1100px;
            margin: 0 auto 15px;
            padding: 0 30px;

            @include breakpoint($mobileSm) {
                font-size: 14px;
            }
        }

        .profile-social-links {
            li {
                display: inline-block;
                padding: 0 12px;

                a {
                    opacity: 0.37;
                    transition: opacity 0.2s ease;

                    &:hover {
                        opacity: 0.72;
                    }
                }
            }
        }
    }

    // Utility Classes
    .title {
        font-weight: 500;
        letter-spacing: .05em;
        text-transform: uppercase;
        line-height: 1.3em;
        color: rgba(0, 0, 0, 0.72);
    }
</style>
