<!--
 * @Author: pluto
 * @Date: 2022-04-07 14:24:04
 * @LastEditors: pluto
 * @LastEditTime: 2022-04-07 14:51:25
 * @Description: 带插槽组件
 * 
-->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
