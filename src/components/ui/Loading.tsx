import { ActivityIndicator, Text, View } from "react-native";

import { useTailwind } from "@/hooks/useTailwind";

export interface LoadingProps {
  message?: string;
}

/** Centered spinner with an optional caption. */
export function Loading({ message }: LoadingProps) {
  const { color } = useTailwind();
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator color={color.accent} size="large" />
      {message ? <Text className="mt-md text-caption text-muted">{message}</Text> : null}
    </View>
  );
}
