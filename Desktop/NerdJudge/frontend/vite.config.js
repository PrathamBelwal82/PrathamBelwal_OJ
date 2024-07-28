import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@mui/icons-material/Add'],  // Add modules to be externalized here
      external: ['@mui/icons-material/Delete'] 
    }
  }
})
