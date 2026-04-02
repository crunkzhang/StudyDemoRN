import {useMemo} from 'react';
import {RNBridge} from '../core/RNBridge';

export function useToast() {
  return useMemo(
    () => ({
      showToast(message: string, duration?: number) {
        RNBridge.toast.show({message, duration});
      },
    }),
    [],
  );
}
