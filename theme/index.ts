import {useRestyle} from '@shopify/restyle';

export {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createRestyleFunction,
  createVariant,
  createTheme,
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
  color,
  typography,
  useTheme,
} from '@shopify/restyle';

export const useStyles = useRestyle;

export type {
  VariantProps,
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  TextProps,
  ColorProps,
  TypographyProps,
  ResponsiveValue,
  RestyleFunctionContainer,
  RestyleFunction,
} from '@shopify/restyle';

export {theme} from './theme';
export type {Theme} from './theme';
