import {defineConfig, loadEnv,} from 'vite';
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('env=', env);
  return {
    plugins: [uni()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
      host: "127.0.0.1",
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://107.149.212.34:8080",
          changeOrigin: true,
          ws: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
          [env.VITE_HUOBI_API]: {
              target: "https://api.huobi.pro",
              changeOrigin: true,
              ws: true,
              rewrite: (path) =>
                  path.replace(new RegExp("^" + env.VITE_HUOBI_API), ""),
        },
      },
    },
  };
});
