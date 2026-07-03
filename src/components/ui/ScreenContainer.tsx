import { Children, Fragment, type ReactNode } from "react";
import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ScreenContainerProps {
  children: ReactNode;
  /** Scrollable (default) or a static full-height view. */
  scroll?: boolean;
  contentClassName?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Vertical space between sections (px) — matches the `xl` spacing token (1.25rem).
 *  Applied as explicit spacer views rather than flex `gap`, because the sections
 *  are Reanimated `entering` views and `gap` is unreliably applied to them. */
const SECTION_GAP = 20;

/** Insert fixed-height spacers between children so spacing survives the sections'
 *  entering animations (flex `gap` can be dropped for animated children). */
function withSectionGaps(children: ReactNode) {
  return Children.toArray(children).map((child, i) => (
    <Fragment key={i}>
      {i > 0 ? <View style={{ height: SECTION_GAP }} /> : null}
      {child}
    </Fragment>
  ));
}

/** Dark screen scaffold: safe-area top padding + bottom-tab clearance + section gap. */
export function ScreenContainer({
  children,
  scroll = true,
  contentClassName,
  contentStyle,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const topPadding = { paddingTop: insets.top + 8 };
  const spaced = withSectionGaps(children);

  if (!scroll) {
    return (
      <View className="flex-1 bg-background px-xl pb-tab-clear" style={[topPadding, contentStyle]}>
        {spaced}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName={`px-xl pb-tab-clear ${contentClassName ?? ""}`}
        contentContainerStyle={[topPadding, contentStyle]}
      >
        {spaced}
      </ScrollView>
    </View>
  );
}
