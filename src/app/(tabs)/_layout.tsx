import { Tabs } from "expo-router";

import { BottomTab } from "@/components/ui";

/** Bottom-tab navigator. Only Dashboard and Progress are enabled for now. */
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTab {...props} />}>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />

      {/* Enable these once their screens exist (also add the matching route files):
      <Tabs.Screen name="protocol" options={{ title: "Protocol" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} /> */}
    </Tabs>
  );
}
