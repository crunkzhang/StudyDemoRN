import {StyleSheet, Platform} from 'react-native';

export const Colors = {
  brand: '#07C160',
  brandPressed: '#06AD56',
  danger: '#FA5151',
  bgPage: '#EDEDED',
  bgCard: '#FFFFFF',
  bgCardPressed: '#D9D9D9',
  textPrimary: '#191919',
  textSecondary: '#888888',
  textTertiary: '#B2B2B2',
  separator: '#E5E5E5',
  searchBg: '#E7E7E7',
  avatarStroke: 'rgba(0,0,0,0.04)',
} as const;

export const FontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const Type = {
  title: {fontSize: 17, fontWeight: '600' as const, color: Colors.textPrimary},
  cellTitle: {fontSize: 17, fontWeight: '400' as const, color: Colors.textPrimary},
  cellSubtitle: {fontSize: 13, fontWeight: '400' as const, color: Colors.textSecondary},
  sectionHeader: {fontSize: 14, fontWeight: '400' as const, color: Colors.textSecondary},
  caption: {fontSize: 11, fontWeight: '400' as const, color: Colors.textTertiary},
};

export const Space = {
  pagePadding: 16,
  rowHeight: 56,
  rowHeightLarge: 64,
  avatar: 40,
  avatarLarge: 44,
  avatarRadius: 4,
  avatarToText: 12,
  sectionGap: 28,
};

export const Hairline = StyleSheet.hairlineWidth;
