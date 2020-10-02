<template>
    <router-link
            :to="`/${type}/${link || content}`"
            :class="`${className} ${'ellipsis'}`"
    >
        <template>
            <el-tooltip
                    class="item"
                    effect="dark"
                    :content="`Click to view ${title ? title : ''} detail`"
                    placement="top-start"
            >
                <span> {{ content }} </span>
            </el-tooltip>
        </template>
    </router-link>
</template>
<script>
  export default {
    props: {
      type: String,
      link: String,
      content: String,
      title: String,
      className: String,
      ellipsis: {type: Boolean, default: true}
    }
  };
</script>

<style lang="scss" scoped>
    .ellipsis {
        color: #679da3;
        display: inline-block;
        max-width: 200px;
        vertical-align: top;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:hover {
            color: red;
        }
    }
</style>
