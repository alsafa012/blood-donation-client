import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['source-map-js']
//   }
// })



// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: false // Disable source maps if not needed
//   }
// })
