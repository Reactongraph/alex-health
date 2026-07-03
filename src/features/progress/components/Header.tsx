import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInDown } from "@/components/animations";
import { Icon, IconButton } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";

/** "Weight" title with date-picker and overflow actions. */
export function Header() {
  const { color } = useTailwind();
  return (
    <Animated.View entering={fadeInDown(0)} className="flex-row items-center justify-between">
      <Text className="text-h1 font-extrabold text-foreground">Weight</Text>
      <View className="flex-row items-center gap-md">
        <IconButton variant="surface" accessibilityLabel="Pick date">
          <Icon name="calendar" size={20} color={color.foreground} />
        </IconButton>
        <IconButton variant="surface" accessibilityLabel="More options">
          <Icon name="more" size={20} color={color.foreground} />
        </IconButton>
      </View>
    </Animated.View>
  );
}
