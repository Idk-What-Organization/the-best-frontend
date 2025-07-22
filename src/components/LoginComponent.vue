<template>
  <h1 class="text-4xl font-bold mb-1">LOGO</h1>
  <p class="mb-5">Login to your account</p>
  <form action="#" class="mb-5">
    <input type="text" placeholder="Username" class="input input-bordered w-full mb-2 border-sm" />
    <input
      type="password"
      placeholder="Password"
      class="input input-bordered w-full mb-2 border-sm"
    />
    <button type="submit" class="btn btn-primary w-full">Login</button>
  </form>
  <div class="flex items-center gap-2 mb-5">
    <hr class="flex-1 border-gray-400" />
    <span class="text-gray-600">Or</span>
    <hr class="flex-1 border-gray-400" />
  </div>
  <div class="flex items-center justify-center gap-2">
    <p>Don't have an account?</p>
    <a href="#" class="text-primary ml-1 font-semibold" @click.prevent="$emit('toggle-auth')"
      >Register now</a
    >
  </div>
</template>
