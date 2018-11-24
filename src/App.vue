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
            selectedShotIndex: 0,
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

        // Set the selected shot index and open overlay.
        onSelectedShot(shotId) {
            const selectedIndex = this.shots.findIndex(shot => shot.id === shotId);

            if (selectedIndex !== -1) {
                this.selectedShotIndex = selectedIndex;
                this.showOverlay = true;
            }
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
        <playbook-overlay
            :show="showOverlay"
            :shots="shots"
            :selected-index="selectedShotIndex"
            @close="showOverlay = false">
        </playbook-overlay>
    </main>
</template>

<style lang="scss">
    // Variables
    $greyLighter: #ededed;
    $greyLight: #cccccc;
    $grey: #a1a1a1;
    $greyDark: #7d7d7d;
    $greyDarker: #474747;
    $pink: #ea518a;
    $white: #fff;
    $overlayBg: rgba(255, 255, 255, 0.98);
    $borderLight:  rgba(0, 0, 0, 0.3);
    $borderLighter: rgba(0, 0, 0, 0.2);

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
            color: $greyDarker;
        }
    }

    p {
        margin: 0 0 25px 0;
        line-height: 1.5em;

        &:last-child {
            margin-bottom: 0;
        }
    }

    // Layout styles
    body.disable-scroll {
        overflow-x: hidden;
        overflow-y: hidden;
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
            color: $greyDark;
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

    // Playbook list
    .playbook-list {
        .dribbble-shots {
            text-align: center;
            padding: 0 15px;
            margin: 0;

            @include breakpoint($tablet) {
                display: flex;
                flex-wrap: wrap;
                max-width: 890px;
                margin: auto;
            }

            @include breakpoint($desktop) {
                max-width: 1320px;
            }

            @include breakpoint($widescreen) {
                max-width: 1750px;
            }

            li {
                margin-bottom: 30px;

                @include breakpoint($tablet) {
                    width: 50%;
                    padding: 0 15px;
                }

                @include breakpoint($desktop) {
                    width: 33.33%;
                }

                @include breakpoint($widescreen) {
                    width: 25%;
                }

                a {
                    :hover {
                        opacity: 0.9;
                    }
                }

                .dribbble-shot {
                    max-width: 400px;
                }
            }
        }
    }

    // Playbook Overlay
    .playbook-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 80px 0;
        background: $overlayBg;
        z-index: 9999;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .close-overlay {
            position: fixed;
            top: 20px;
            right: 20px;
            opacity: 0.3;

            &:hover {
                opacity: 0.5;
            }
        }

        .playbook-content {
            position: relative;
            max-width: 400px;
            margin: auto;

            @include breakpoint($tablet) {
                padding: 0 20px;
                max-width: 840px;
            }

            @include breakpoint($desktop) {
                padding: 0 20px;
                max-width: 880px;
            }
        }

        .content-top {
            @include breakpoint($tablet) {
                display: flex;
            }

            .content-shot {
                margin-bottom: 15px;

                @include breakpoint($tablet) {
                    width: 400px;
                    min-width: 400px;
                    flex-grow: 0;
                    margin-bottom: 0;
                }
            }

            .content-info {
                padding: 0 15px;

                @include breakpoint($tablet) {
                    padding-left: 20px;
                    padding-right: 0;
                    flex-grow: 1;
                }

                @include breakpoint($desktop) {
                    padding-left: 40px;
                }

                h2 {
                    font-size: 22px;
                }

                .description {
                    padding: 20px 0;

                    a {
                        color: $greyDarker;
                        text-decoration: underline;

                        &:hover {
                            color: $grey;
                        }
                    }
                }
            }
        }

        .content-bottom {
            margin-top: 30px;

            @include breakpoint($tablet) {
                margin-top: 50px;
            }

            .playbook-attachments {
                li {
                    margin-bottom: 20px;

                    @include breakpoint($tablet) {
                        margin-bottom: 40px;
                    }

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .playbook-nav {
            .prev,
            .next {
                position: absolute;
                top: 120px;
            }

            .prev {
                left: -60px;
            }

            .next {
                right: -60px;
            }

            a {
                display: inline-block;
                padding: 16px 20px;
                opacity: 0.3;

                &:hover {
                    opacity: 0.5;
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
        color: $greyDarker;
    }

    .button {
        display: inline-block;
        font-size: 13px;
        padding: 8px 12px;
        font-weight: normal;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: .05em;
        color: $grey;
        border: 1px solid $borderLighter;
        border-radius: 4px;
        transition: all 0.2s ease;
        width: 100%;

        @include breakpoint($tablet) {
            width: auto;
        }

        &:hover {
            color: $greyDarker;
            border: 1px solid $borderLight;
        }
    }

    .dribbble-shot {
        display: block;
        width: 100%;
        position: relative;
        font-size: 0;
        background: $greyLighter;
        box-shadow: 0 0 1px $borderLighter;
        border-radius: 2px;
        overflow: hidden;
        @include aspectRatio(4, 3);

        img {

            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .loading-text {
        font-size: 16px;
        font-weight: normal;
        color: $grey;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        text-align: center;
    }

    // Icons Helpers.
    // I'm hot linking to Dribbble's CDN images. Not the approached I will use for a producting site.
    [class^='icon-'] {
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100%;
        text-indent: -9999px;
    }

    .icon-close {
        width:  20px;
        height: 20px;
        background-image: url('http://cdn.dribbble.com/assets/playbook/icon-x-cae0eb46b1cce1e820ff95240a38f0acb30bee79f77d839d7e4fcc2994245af6.png');
    }

    .icon-prev,
    .icon-next {
        width:  15px;
        height: 28px;
        background-image: url('http://cdn.dribbble.com/assets/playbook/icon-prev-68247b9494c53bf35f808c2148618cec4a3a6208b689d9faa33df308079505dd.png');
    }

    .icon-next {
        transform: rotate(180deg);
    }

    .social-icon {
        width:  20px;
        height: 20px;
    }

    .icon-web {
        background-image: url('http://cdn.dribbble.com/assets/profile/icon-elsewhere-website-241749d5da6c64b1e51b820ab5ebc0d52274ba1da0c34cff6077e208e6871ea0.png');
    }

    .icon-twitter {
        background-image: url('http://cdn.dribbble.com/assets/profile/icon-elsewhere-twitter-740b8ccb2aebe896ed737e6813f3d926bcd3b32ad01bca4f2d72465e50be3584.png');
    }

    .icon-instagram {
        background-image: url('http://cdn.dribbble.com/assets/profile/icon-elsewhere-instagram-ef258bfd39ec49d8090f23b27769433f922cd034d9dfe7640b7c8a17f2b41416.png');
    }

    .icon-facebook {
        background-image: url('https://cdn.dribbble.com/assets/profile/icon-elsewhere-facebook-1a26760722306c219c66b5743bc0febc6e2880bb4e4001770801f50c38f5ea06.png');
    }

    .icon-vimeo {
        background-image: url('http://cdn.dribbble.com/assets/profile/icon-elsewhere-vimeo-c79ee9e9a8a71e32fc1124efa685ad1cf59a13b5003ea4c5efd91a2cd0118efc.png');
    }

    // Animations
    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .fade-in-enter-active {
        animation: fade-in 0.3s;
    }

    .fade-in-leave-active {
        animation: fade-in 0.3s reverse;
    }
</style>
