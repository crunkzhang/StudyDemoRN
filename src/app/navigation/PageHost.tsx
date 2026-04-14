import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {PageRegistry} from './PageRegistry';
import {RouteParamsProvider} from './RouteParamsContext';
import {Navigation} from './Navigation';
import type {PageHostProps, RouteName} from './types';

interface ErrorInfo {
  message: string;
  pageName?: string;
  params?: Record<string, unknown>;
}

const FallbackError: React.FC<ErrorInfo> = ({message, pageName, params}) => {
  if (__DEV__) {
    console.error('[PageHost]', message, {pageName, params});
  }
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackTitle}>页面加载失败</Text>
      <Text style={styles.fallbackMsg}>{message}</Text>
      {__DEV__ && pageName ? (
        <Text style={styles.fallbackDebug}>pageName: {pageName}</Text>
      ) : null}
      {__DEV__ && params ? (
        <Text style={styles.fallbackDebug}>
          params: {JSON.stringify(params)}
        </Text>
      ) : null}
      <Pressable style={styles.backButton} onPress={() => Navigation.pop()}>
        <Text style={styles.backButtonText}>返回</Text>
      </Pressable>
    </View>
  );
};

const PageHost: React.FC<PageHostProps> = ({pageName, params}) => {
  if (!pageName) {
    return <FallbackError message="缺少 pageName 参数" params={params} />;
  }
  if (!PageRegistry.has(pageName as string)) {
    return (
      <FallbackError
        message={`未注册的页面: ${pageName}`}
        pageName={pageName}
        params={params}
      />
    );
  }
  const Component = PageRegistry.resolve(pageName as RouteName);
  if (!Component) {
    return (
      <FallbackError
        message={`无法解析页面: ${pageName}`}
        pageName={pageName}
        params={params}
      />
    );
  }
  return (
    <RouteParamsProvider value={{name: pageName as RouteName, params: params ?? {}}}>
      <Component />
    </RouteParamsProvider>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  fallbackTitle: {fontSize: 18, fontWeight: '700', color: '#333'},
  fallbackMsg: {marginTop: 8, fontSize: 14, color: '#999', textAlign: 'center'},
  fallbackDebug: {
    marginTop: 6,
    fontSize: 12,
    color: '#bbb',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: '#07C160',
  },
  backButtonText: {color: '#fff', fontSize: 14, fontWeight: '500'},
});

export default PageHost;
