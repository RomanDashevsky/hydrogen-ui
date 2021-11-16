import path  from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-dts'

const entryPoint = path.resolve(__dirname, 'lib/index.ts')

console.log('entryPoint')
console.log(entryPoint)

const config = defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: entryPoint,
      name: 'index',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["react", "react-dom"],
      output: {
        // Global vars to use in UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  }
})

export default config
