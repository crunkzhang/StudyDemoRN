import {useMemo} from 'react';
import {toastBridge} from '../common/toast/toastBridge';

export function useToast() {
  return useMemo(
    () => ({
      showToast(message: string, duration?: number) {
        toastBridge.show({message, duration});
      },
    }),
    [],
  );
}
