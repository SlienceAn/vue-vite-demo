Vite Demo

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

# 專案架構

```
.
├── Dockerfile
├── README.md
├── auto-imports.d.ts
├── azure-pipelines.yml
├── components.d.ts
├── conf.d
│   └── nginx.conf
├── dist
│   ├── index.html
│   ├── static
│   │   ├── css
│   │   │   ├── Information.css
│   │   │   ├── Login.css
│   │   │   ├── Main.css
│   │   │   ├── Query.css
│   │   │   ├── element-plus.css
│   │   │   ├── index.css
│   │   │   └── vendor.css
│   │   └── js
│   │       ├── chunk
│   │       │   ├── Information.js
│   │       │   ├── InspectionForm.js
│   │       │   ├── Login.js
│   │       │   ├── Main.js
│   │       │   ├── Query.js
│   │       │   ├── axios.js
│   │       │   ├── ctrl_tinycolor.js
│   │       │   ├── dayjs.js
│   │       │   ├── element-plus.js
│   │       │   ├── index.js
│   │       │   ├── lodash-es.js
│   │       │   └── vendor.js
│   │       └── entry
│   │           └── index.js
│   └── vite.svg
├── index.html
├── mock
│   ├── data.ts
│   └── index.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── img
│   │   └── place
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── PIXI
│   ├── SW
│   ├── api
│   │   ├── api.ts
│   │   └── request.ts
│   ├── assets
│   │   ├── icons
│   │   │   └── material-icons.ts
│   │   └── vue.svg
│   ├── components
│   │   ├── 404.vue
│   │   ├── Card.vue
│   │   ├── Control.vue
│   │   ├── Echart.vue
│   │   ├── EquipmentSearch.vue
│   │   ├── EventSearch.vue
│   │   ├── Form.vue
│   │   ├── Loading.vue
│   │   ├── Login.vue
│   │   ├── Main
│   │   │   ├── Information.vue
│   │   │   ├── InspectionForm.vue
│   │   │   ├── Query.vue
│   │   │   ├── StationAnalysis.vue
│   │   │   └── drawerList.vue
│   │   ├── Main.vue
│   │   ├── SelectPlace.vue
│   │   └── Table.vue
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── server
│   │   └── index.js
│   ├── store
│   │   └── index.ts
│   ├── untils
│   │   └── tableFormatter.tsx
│   └── vite-env.d.ts
├── submodule-test
│   ├── README.md
│   └── Test.txt
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── windi.config.ts

```