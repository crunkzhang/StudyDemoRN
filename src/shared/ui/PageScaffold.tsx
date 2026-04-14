import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from './ScreenHeader';
import {useNavbar} from '../bridges/hooks/useNavbar';
import type {NavbarAppearance, NavbarRightItem} from '../bridges/common/navbar/navbarBridge';

type NavMode = 'native' | 'rn';
type HeaderVariant = 'default' | 'search' | 'immersive';

interface PageScaffoldProps {
  navMode: NavMode;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  headerVariant?: HeaderVariant;
  showHeader?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
  rightItem?: NavbarRightItem;
  navbarAppearance?: NavbarAppearance;
  style?: ViewStyle;
  children: React.ReactNode;
}

const PageScaffold: React.FC<PageScaffoldProps> = ({
  navMode,
  title,
  subtitle,
  backgroundColor = '#FFFFFF',
  headerVariant = 'default',
  showHeader = navMode === 'rn',
  onBack,
  right,
  rightItem,
  navbarAppearance,
  style,
  children,
}) => {
  const safeAreaEdges: Edge[] =
    navMode === 'native'
      ? navbarAppearance?.transparent
        ? ['left', 'right', 'bottom']
        : ['top', 'left', 'right', 'bottom']
      : ['left', 'right'];

  useNavbar({appearance: navbarAppearance, mode: navMode, title, rightItem});

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor}, style]}
      edges={safeAreaEdges}>
      {navMode === 'rn' && showHeader ? (
        <ScreenHeader
          title={title}
          subtitle={subtitle}
          variant={headerVariant}
          onBack={onBack}
          right={right}
        />
      ) : null}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1},
});

export default PageScaffold;
