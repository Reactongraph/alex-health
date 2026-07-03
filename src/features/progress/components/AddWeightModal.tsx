import { useEffect, useState } from "react";
import { Keyboard, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";

/** Design bottom padding for the sheet card (Tailwind `pb-3xl` = 2rem). */
const SHEET_BOTTOM_PADDING = 32;

interface AddWeightModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (kg: number) => void;
}

/** Bottom-sheet modal for logging a new weight entry. */
export function AddWeightModal({ visible, onClose, onSave }: AddWeightModalProps) {
  const { color } = useTailwind();
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const kg = parseFloat(value);
  const valid = !Number.isNaN(kg) && kg > 0 && kg < 500;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const close = () => {
    Keyboard.dismiss();
    setValue("");
    onClose();
  };

  const save = () => {
    if (!valid) return;
    onSave(kg);
    setValue("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={close}
    >
      <View className="flex-1 justify-end" style={{ paddingBottom: keyboardHeight }}>
        <Pressable
          className="absolute inset-0 bg-background/70"
          onPress={close}
          accessibilityLabel="Dismiss"
        />
        <View
          className="gap-sm rounded-t-card border-thin border-border bg-card px-xl pt-md"
          style={{
            paddingBottom: SHEET_BOTTOM_PADDING + (keyboardHeight > 0 ? 0 : insets.bottom),
          }}
        >
          <View className="mb-sm h-[4px] w-[40px] self-center rounded-full bg-border-strong" />
          <Text className="text-body font-bold text-foreground">Add Weight</Text>
          <Text className="mt-xs text-micro font-medium text-subtle">
            Log today&apos;s weight to keep your progress up to date.
          </Text>

          <View className="mt-md flex-row items-center gap-sm rounded-md border-thin border-border bg-background px-lg py-md">
            <TextInput
              value={value}
              onChangeText={setValue}
              keyboardType="decimal-pad"
              placeholder="0.0"
              placeholderTextColor={color.subtle}
              className="flex-1 font-bold text-foreground"
              style={{ fontSize: 28, padding: 0 }}
              autoFocus
              maxLength={5}
            />
            <Text className="text-title font-bold text-muted">kg</Text>
          </View>

          <View className="mt-lg flex-row gap-md">
            <Button label="Cancel" variant="surface" onPress={close} style={{ flex: 1 }} />
            <Button label="Save" onPress={save} disabled={!valid} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
