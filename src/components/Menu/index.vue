<template>
    <el-menu
            :default-active="$route.path"
            @select="handleSelect"
            class="menu-container"
            mode="horizontal"
            background-color="#4b8d92"
            text-color="rgba(255,255,255,0.8)"
            active-text-color="#00fffb"
    >


        <el-menu-item
                v-for="item in menus"
                :key="item.link"
                :index="item.link"
                class="item"
        >
            {{item.name.toUpperCase()}}
        </el-menu-item>
    </el-menu>
</template>

<script>
  import {menu} from "@/constants";

  export default {
    data() {
      const menus = [];
      menu.forEach(i => {
        menus[menus.length] = i;
      });
      return {
        menus,
      };
    },
    methods: {
      handleSelect(key) {
        this.$router.push(key);
      }
    }
  };
</script>

<style lang="scss" scoped>
    .menu-container {
        border-bottom: none;
        padding-right: 40px;

        .item {
            transition: $trans;
            font-size: 17px;

            &:hover {
                background-color: transparent !important;
                color: #00fffb !important;
            }
        }

        a {
            text-decoration: none;
        }
    }

    @include responsive($sm) {
        .menu-container {
            display: none;
        }
    }
</style>
