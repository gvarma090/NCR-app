import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useDisableBack() {
  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true // block back
    );

    return () => handler.remove();
  }, []);
}

