import {createTheme} from '@shopify/restyle';
import {colorPallete} from './colorPalette';
import {spacing} from './spacing';
import {borderRadii} from './borderRadii';
import {zIndices} from './zIndices';

export const theme = createTheme({
  colors: colorPallete,
  spacing: spacing,
  zIndices: zIndices,
  borderRadii: borderRadii,
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
 
    },
  },
});

export type Theme = typeof theme;
