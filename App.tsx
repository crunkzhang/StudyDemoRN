import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PageHost from './src/app/navigation/PageHost';
import {PageRegistry} from './src/app/navigation/PageRegistry';
import type {PageHostProps} from './src/app/navigation/types';

function AppRoot(props: PageHostProps) {
  const pageName = props.pageName ?? PageRegistry.getInitPageName();
  return (
    <SafeAreaProvider>
      <PageHost pageName={pageName} params={props.params} />
    </SafeAreaProvider>
  );
}

export default AppRoot;
