import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderVariant = 'default' | 'search' | 'immersive';

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  variant?: HeaderVariant;
  right?: React.ReactNode;
  onBack?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  variant = 'default',
  right,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        variant === 'immersive' ? styles.immersiveContainer : styles.defaultContainer,
        {paddingTop: insets.top + 8},
      ]}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onBack}
          disabled={!onBack}
          style={[styles.backButton, !onBack && styles.backButtonHidden]}>
          <Text style={[styles.backText, variant === 'immersive' && styles.lightText]}>
            ‹ 返回
          </Text>
        </Pressable>
        <View style={styles.center}>
          {title ? (
            <Text
              style={[
                styles.title,
                variant === 'immersive' ? styles.lightText : styles.darkText,
              ]}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                variant === 'immersive' ? styles.subtitleLight : styles.subtitleDark,
              ]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.right}>{right}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  defaultContainer: {
    backgroundColor: '#F7F7F7',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9D9D9',
  },
  immersiveContainer: {
    backgroundColor: '#111216',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 72,
    paddingVertical: 8,
  },
  backButtonHidden: {
    opacity: 0,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
  },
  darkText: {
    color: '#111',
  },
  lightText: {
    color: '#fff',
  },
  subtitleDark: {
    color: '#8B8B8B',
  },
  subtitleLight: {
    color: '#ABB2C0',
  },
  right: {
    width: 72,
    alignItems: 'flex-end',
  },
});

export default ScreenHeader;
