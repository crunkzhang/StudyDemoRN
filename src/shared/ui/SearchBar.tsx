import React, {forwardRef} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from './tokens';
import {Search as SearchIcon, Close} from './icons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onChangeText?: (v: string) => void;
  onPress?: () => void;
  onClear?: () => void;
  onSubmitEditing?: () => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({placeholder = '搜索', value, editable = true, autoFocus, onChangeText, onPress, onClear, onSubmitEditing}, ref) => {
    const body = (
      <View style={styles.bar}>
        <SearchIcon size={15} color="#888" />
        {editable ? (
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.textTertiary}
            value={value}
            autoFocus={autoFocus}
            returnKeyType="search"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        {value ? (
          <Pressable onPress={onClear} hitSlop={8} style={styles.clearBtn}>
            <View style={styles.clearDot}>
              <Close size={10} color="#fff" />
            </View>
          </Pressable>
        ) : null}
      </View>
    );
    if (onPress && !editable) {
      return (
        <Pressable onPress={onPress} style={styles.wrap}>
          {body}
        </Pressable>
      );
    }
    return <View style={styles.wrap}>{body}</View>;
  },
);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.bgCard,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  bar: {
    height: 36,
    backgroundColor: Colors.searchBg,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {flex: 1, marginLeft: 6, fontSize: 15, color: Colors.textPrimary, paddingVertical: 0},
  placeholder: {flex: 1, marginLeft: 6, fontSize: 15, color: Colors.textTertiary},
  clearBtn: {marginLeft: 6},
  clearDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#BFBFBF', alignItems: 'center', justifyContent: 'center',
  },
});

export default SearchBar;
