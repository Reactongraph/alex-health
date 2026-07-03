# 💊 PepMind

**PepMind** is a polished, dark-themed mobile app for tracking peptide/medication protocols and body-weight progress. It gives users an at-a-glance dashboard of their current protocol, dosing schedule, and medication levels, plus a dedicated progress screen for logging and visualizing weight over time.

Built with **Expo (SDK 54)** and **React Native**, using a feature-based architecture, a token-driven design system, and fluid Reanimated animations throughout.

---

## ✨ Features

- 🏠 **Dashboard** — current protocol summary, an interactive dose stepper, a live medication-level chart, and quick actions.
- 📈 **Progress** — today's weight vs. goal with an animated progress ring, an interactive weight-trend chart with range selectors (7D/30D/90D/1Y/All), and a scrollable weight history.
- ➕ **Log weight** — add entries through a keyboard-aware bottom-sheet modal; the summary and history update live from the store.
- 🎨 **Design system** — a single source of truth for color, spacing, typography, and elevation tokens, consumed via NativeWind utility classes.
- 🌀 **Motion** — staggered entrance animations, a floating medication bottle, breathing glows, and animated charts powered by Reanimated.
- 🚀 **Branded splash** — a custom animated splash that hands off seamlessly from the native splash with no white flash.
- 💾 **Offline-first** — state is persisted locally with Redux Persist and rehydrated on launch.

---

## 🧱 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [Expo](https://docs.expo.dev/) SDK 54 · React Native 0.81 · React 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Styling | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for RN) |
| State | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| Persistence | [Redux Persist](https://github.com/rt2zz/redux-persist) + AsyncStorage |
| Animation | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| Graphics | react-native-svg · expo-linear-gradient |
| Tooling | ESLint · Prettier · EAS Build |

---

## 📂 Project Structure

The codebase follows a **feature-based architecture** — each feature owns its screens, components, hooks, types, and constants, while shared primitives live under `components/`.

```
src/
├── app/                  # Expo Router routes (file-based navigation)
│   ├── (tabs)/           #   Tab navigator: dashboard, progress
│   ├── _layout.tsx       #   Root layout: providers, splash, persistence
│   └── index.tsx         #   Entry redirect
├── features/             # Self-contained feature modules
│   ├── dashboard/        #   Protocol, dose, medication chart, quick actions
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   └── types/
│   └── progress/         #   Weight summary, chart, history, add-weight
├── components/
│   ├── ui/               # Reusable UI primitives (Card, Button, Chart, …)
│   └── animations/       # Shared animation presets & hooks
├── store/                # Redux store, slices, middleware, persist config
├── hooks/                # Shared hooks (typed redux, useTailwind)
├── constants/            # App-wide constants
├── utils/                # Helpers (cn, formatting, regex)
├── assets/               # Icons, images, fonts, splash art
└── global.css            # NativeWind entry stylesheet
```

The `@/` path alias maps to `src/` (e.g. `import { Card } from "@/components/ui"`).

---

## 🔧 Prerequisites

- **Node.js** ≥ 20 and npm
- **Expo CLI** (used via `npx`, no global install required)
- **EAS CLI** for cloud builds: `npm install -g eas-cli`
- For local native runs: **Xcode** (iOS) and/or **Android Studio** (Android)

> ℹ️ This project uses several custom native modules and a custom native splash, so it runs in a **development build** (`expo-dev-client`) rather than Expo Go. Custom native splash configuration will not appear in Expo Go.

No `.env` file is required — the app has no runtime environment variables configured.

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd PepMind

# 2. Install dependencies
npm install
```

---

## ▶️ Running Locally

Start the Metro dev server:

```bash
npm start
```

Run on a specific platform:

```bash
npm run android   # build & launch on Android (emulator or device)
npm run ios       # build & launch on iOS (simulator or device)
npm run web       # run in the browser
```

> 💡 If styles ever fail to apply after changing `tailwind.config.js`, restart Metro with a cleared cache: `npx expo start -c`.

### Creating a development build

Because the app relies on custom native modules, build a dev client once, then use `npm start` for day-to-day work:

```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

---

## ☁️ EAS Builds

Configure your project first (once):

```bash
eas login
eas build:configure
```

### Preview build (internal distribution)

```bash
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### Production build

```bash
eas build --profile production --platform all
```

### Submit to stores

```bash
eas submit --profile production --platform all
```

---

## 🧑‍💻 Code Style & Architecture

**Feature-based architecture.** Business logic is organized by feature (`src/features/*`) rather than by file type. Each feature is self-contained — its `components/`, `hooks/`, `constants/`, and `types/` live together — which keeps changes local and makes features easy to reason about, test, and remove.

**Reusable UI components.** Cross-feature primitives live in `src/components/ui` (`Card`, `Button`, `Chart`, `ProgressRing`, `ScreenContainer`, and more). They are presentation-only, prop-driven, and composed by feature screens — no feature-specific logic leaks into them.

**Token-driven design system.** `tailwind.config.js` is the single source of truth for color, spacing (8pt scale), typography, radii, and elevation. UI is styled with **NativeWind** utility classes (`className`). The handful of APIs that can't take a `className` (SVG fills, gradients, native shadows) read the **same** tokens from JS via the `useTailwind()` hook — so there is no duplicated design data.

**Shared animation layer.** Reusable Reanimated presets and hooks live in `src/components/animations` and are applied consistently across screens for entrance, floating, pulse, and stagger effects.

**Typed & linted.** Written in strict **TypeScript** with path aliases. Code style is enforced with ESLint + Prettier:

```bash
npm run lint       # check
npm run lint:fix   # auto-fix
npm run format     # format with Prettier
```

---

## 📄 License

This project is private and proprietary. All rights reserved.
