import {
  Insets,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  createBox,
  Theme,
  LayoutProps,
  PositionProps,
  SpacingProps,
  BorderProps,
} from '../../theme';

const BaseButton = createBox(Pressable);

export const Button: React.FC<
  PressableProps & {
    children: React.ReactNode;
    hitSlop?: Insets | undefined;
    style?: StyleProp<ViewStyle>;
    backgroundColor: string;
  } & LayoutProps<Theme> &
    PositionProps<Theme> &
    SpacingProps<Theme> &
    BorderProps<Theme>
> = ({children, backgroundColor, ...rest}) => {
  return (
    <BaseButton
      backgroundColor={backgroundColor}
      paddingVertical={8}
      paddingHorizontal={16}
      borderRadius={20}
      {...rest}>
      {children}
    </BaseButton>
  );
};
