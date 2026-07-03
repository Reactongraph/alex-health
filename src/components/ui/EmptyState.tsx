import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface EmptyStateProps {
  title: string;
  message?: string;
}

/** Centered title + message — for empty lists or not-yet-built screens. */
export function EmptyState({ title, message = "Coming soon" }: EmptyStateProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center bg-background pb-tab-clear"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-title font-bold text-foreground">{title}</Text>
      {message ? <Text className="mt-sm text-caption text-subtle">{message}</Text> : null}
    </View>
  );
}
