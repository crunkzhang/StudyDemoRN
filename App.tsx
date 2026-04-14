import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PageHost from './src/app/navigation/PageHost';
import type {PageHostProps} from './src/app/navigation/types';

const DEFAULT_PAGE = 'debugHome' as const;

function AppRoot(props: PageHostProps) {
  const pageName = props.pageName ?? DEFAULT_PAGE;
  return (
    <SafeAreaProvider>
      <PageHost pageName={pageName} params={props.params} />
    </SafeAreaProvider>
  );
}

export default AppRoot;
