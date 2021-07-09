<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* Sample `apply` at-rules with Tailwind CSS */
.container {
  @apply min-h-screen flex justify-center items-center mx-auto;
}

input {
  @apply border border-gray-500 p-1;
}

button {
  @apply block p-2 bg-gray-300;
}

button:hover {
  @apply bg-gray-500;
}

button.primary {
  @apply bg-green-500 text-white;
}

button.primary:hover {
  @apply bg-green-700;
}

h1 {
  @apply text-2xl;
}

h2 {
  @apply text-xl;
}

h3 {
  @apply text-lg;
}
</style>
