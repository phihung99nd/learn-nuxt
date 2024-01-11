# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Knowledge and tools

### 1. Javascript / Typescript

- [View transition API](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition)
- [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)

### 2. Vue 3

- [Ref / Reactive state / Computed / Watch](https://vuejs.org/api/reactivity-core.html#ref)
- [Props](https://vuejs.org/guide/components/props.html#props)
- [Emits](https://vuejs.org/guide/components/events.html#emitting-and-listening-to-events)
- [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html#provide-inject)
- [Event bus](https://v3-migration.vuejs.org/breaking-changes/events-api.html)
- [New lifecycle hook](https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks)

### 3. Nuxt 3

- [Auto-importing](https://nuxt.com/docs/guide/concepts/auto-imports)
- [Basic folder structure](https://nuxt.com/docs/guide/directory-structure/nuxt)

  - components (auto-imported components)
  - composables (auto-imported utilities)
  - layouts (reusable layout)
  - middleware (navigation guard)
  - pages (file-base routing)
  - plugins (load plugin like event bus, vuetify, etc.)
  - server (register API and server handler)
  - stores (Pinia state management)
- Metadata, SEO
- Data fetching with 2 ways ([composables](./composables/api) / [server](./server/api))
- Global state management by Pinia in [store](./stores)
- Singleton
- Integrate with MongoDb/Mongoose to handle API

### 4. Library

- [Vuetify](https://vuetifyjs.com/)
- [I18n](https://i18n.nuxtjs.org/)
- [Mongoose](https://mongoosejs.com/)