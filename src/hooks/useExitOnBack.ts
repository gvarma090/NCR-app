import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useExitOnBack() {
  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => false // allow default (exit app)
    );

    return () => handler.remove();
  }, []);
}

