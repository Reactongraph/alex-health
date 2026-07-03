import "../global.css";

import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AnimatedSplash } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";
import { persistor, store } from "@/store";

// Keep the native splash up until AnimatedSplash paints; it hides the native
// splash itself (on layout), so there's no blank frame between the two.
// The native splash + AnimatedSplash share the same dark PepMind look, and the
// native splash cross-fades out, so the handoff is seamless.
ExpoSplashScreen.preventAutoHideAsync().catch(() => { });
ExpoSplashScreen.setOptions({ fade: true, duration: 250 });

export default function RootLayout() {
  const { color } = useTailwind();
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  return (
    <Provider store={store}>
      {/* GestureHandlerRootView is the outermost view and is ALWAYS mounted with the
          dark brand background — so the RN side never shows a white frame, even while
          the store rehydrates (PersistGate renders null during that window). */}
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: color.background, paddingTop: 30 }}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <PersistGate loading={null} persistor={persistor}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: color.background },
              }}
            />
          </PersistGate>
          {/* Rendered as a sibling OUTSIDE PersistGate so the custom splash paints
              immediately on launch (not gated on rehydration). It hides the native
              splash itself once it has laid out, so the native → custom handoff has
              no blank/white frame. */}
          {!splashDone ? <AnimatedSplash onFinish={handleSplashFinish} /> : null}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
