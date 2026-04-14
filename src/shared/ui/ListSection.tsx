import React, {Children} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Type, Space} from './tokens';

interface ListSectionProps {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  marginTop?: number;
}

const ListSection: React.FC<ListSectionProps> = ({header, footer, children, marginTop}) => {
  const items = Children.toArray(children);
  return (
    <View style={{marginTop: marginTop ?? Space.sectionGap}}>
      {header ? (
        <Text style={[Type.sectionHeader, styles.header]} numberOfLines={1}>
          {header}
        </Text>
      ) : null}
      <View style={styles.card}>
        {items.map((child, i) => {
          const isLast = i === items.length - 1;
          if (React.isValidElement(child) && isLast) {
            return React.cloneElement(child as React.ReactElement<any>, {
              showSeparator: false,
            });
          }
          return child;
        })}
      </View>
      {footer ? <Text style={[Type.caption, styles.footer]}>{footer}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Space.pagePadding,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: Colors.bgCard,
  },
  footer: {
    paddingHorizontal: Space.pagePadding,
    paddingTop: 8,
  },
});

export default ListSection;
