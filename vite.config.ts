import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { createProxy } from "./build/vite/proxy";
import { wrapperEnv } from "./build/utils";
import vue from "@vitejs/plugin-vue";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const root = process.cwd();
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  console.log(viteEnv);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } =
    viteEnv;
  return {
    lineOnSave: false,
    plugins: [vue()],
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        // {
        //   find: /\/#\//,
        //   replacement: pathResolve("types") + "/",
        // },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/style/theme.less";',
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // https: true,
      // Listening on all local IPs
      host: true,
      port: env.VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
  };
});
