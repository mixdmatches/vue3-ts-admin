// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/1study/vue3+ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/vue3_admin_template/project/node_modules/.pnpm/vite@5.4.10_@types+node@22.9.0_sass-embedded@1.80.6_sass@1.80.6/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/1study/vue3+ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/vue3_admin_template/project/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@22.9.0_sass-embedded@1.80.6_sass@1.80.6__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/1study/vue3+ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.10_@types+node@22.9.0_sass-embedded@1.80.6_sass@1.80.6_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import { viteMockServe } from "file:///D:/1study/vue3+ts%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.4.10_@types+node@22.9.0_sass-embedded@1.80.6_sass@1.80.6_/node_modules/vite-plugin-mock/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "mock",
        enable: command === "serve"
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    //路径别名
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //scss全局变量一个配置
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       javascriptEnabled: true,
    //       additionalData: '@import "./src/styles/variable.scss";',
    //     },
    //   },
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`
          // 引入全局变量文件
        }
      }
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据得服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwxc3R1ZHlcXFxcdnVlMyt0c1x1Nzg0NVx1OEMzN1x1NzUwNFx1OTAwOVxcXFx2dWUzX2FkbWluX3RlbXBsYXRlXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDFzdHVkeVxcXFx2dWUzK3RzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XFxcXHZ1ZTNfYWRtaW5fdGVtcGxhdGVcXFxccHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMXN0dWR5L3Z1ZTMrdHMlRTclQTElODUlRTglQjAlQjclRTclOTQlODQlRTklODAlODkvdnVlM19hZG1pbl90ZW1wbGF0ZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge3ZpdGVNb2NrU2VydmV9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLG1vZGUgfSkgPT4ge1xuICAvL1x1ODNCN1x1NTNENlx1NTQwNFx1NEUyQVx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFx1NUJGOVx1NUU5NFx1NUY5N1x1NTNEOFx1OTFDRlxuICBsZXQgZW52ID0gbG9hZEVudihtb2RlLHByb2Nlc3MuY3dkKCkpO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFt2dWUoKSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBtb2NrUGF0aDonbW9jaycsXG4gICAgICAgIGVuYWJsZTogY29tbWFuZCA9PT0nc2VydmUnLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgLy9cdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKFwiLi9zcmNcIikgLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU5MTREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4IEAgXHU0RUUzXHU2NkZGIHNyY1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9zY3NzXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU0RTAwXHU0RTJBXHU5MTREXHU3RjZFXG4gICAgLy8gY3NzOiB7XG4gICAgLy8gICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgLy8gICAgIHNjc3M6IHtcbiAgICAvLyAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAvLyAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZS5zY3NzXCI7YCAvLyBcdTVGMTVcdTUxNjVcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdTY1ODdcdTRFRjZcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy9cdTRFRTNcdTc0MDZcdThERThcdTU3REZcbiAgICBzZXJ2ZXI6e1xuICAgICAgcHJveHk6e1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIC8vXHU4M0I3XHU1M0Q2XHU2NTcwXHU2MzZFXHU1Rjk3XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHU4QkJFXHU3RjZFXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9TRVJWRSxcbiAgICAgICAgICAvL1x1OTcwMFx1ODk4MVx1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxuICAgICAgICAgIGNoYW5nZU9yaWdpbjp0cnVlLFxuICAgICAgICAgIHJld3JpdGU6KHBhdGgpPT5wYXRoLnJlcGxhY2UoL15cXC9hcGkvLCcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVyxTQUFTLGNBQWEsZUFBZTtBQUNwWixPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLFNBQVEscUJBQW9CO0FBRTVCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUSxLQUFLLE1BQU07QUFFaEQsTUFBSSxNQUFNLFFBQVEsTUFBSyxRQUFRLElBQUksQ0FBQztBQUNwQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFBQyxJQUFJO0FBQUEsTUFDWixjQUFjO0FBQUEsUUFDWixVQUFTO0FBQUEsUUFDVCxRQUFRLFlBQVc7QUFBQSxNQUNyQixDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFVQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBTztBQUFBLE1BQ0wsT0FBTTtBQUFBLFFBQ0osQ0FBQyxJQUFJLGlCQUFpQixHQUFHO0FBQUE7QUFBQSxVQUV2QixRQUFRLElBQUk7QUFBQTtBQUFBLFVBRVosY0FBYTtBQUFBLFVBQ2IsU0FBUSxDQUFDQSxVQUFPQSxNQUFLLFFBQVEsVUFBUyxFQUFFO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
