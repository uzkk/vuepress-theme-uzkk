<template>
  <div class="page section">
    <Content
      :key="$page.path"
      class="page-content"
    />
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>

