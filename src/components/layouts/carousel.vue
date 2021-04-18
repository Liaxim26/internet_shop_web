<template>
  <v-carousel
    cycle
    height="500"
    
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    >
      <v-sheet
        :color="colors[i]"
        height="0%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
           
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        items: [
          {
            src: 'https://babylonvape.ru/upload/iblock/342/34234715bb5d374940bdb6abb8d83691.jpg',
          },
          {
            src: 'https://sun9-66.userapi.com/impg/4CX2z9ivEns7BzNEg5YYYeH05XgN0FW8EWZnRA/RqOslUOPRcM.jpg?size=1280x452&quality=96&sign=f6002181f90e6511f8f54a1f40df5ca5&type=album',
          },
          {
            src: 'https://sun9-17.userapi.com/impg/bUEzFKYLVSDUSzMZPreDLErPQ-SWaljw3NYG8w/SqtDkh0iJTc.jpg?size=1280x462&quality=96&sign=44ae50e9ff9ef69170dcbccd7b075963&type=album',
          },
          {
            src: 'https://sun9-12.userapi.com/impg/Vvc6HsulJuRTnLxEotCEOhdVVSH12VT5vno-qw/u_FF5ADy3OM.jpg?size=1280x452&quality=96&sign=4629ea94ca2d54be736f3e2768cd70a2&type=album',
          },
        ],
      }
    },
  }
</script>

<style scoped>
  
</style>