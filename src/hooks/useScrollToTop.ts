import { useRef, useState } from 'react';
import { FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export function useScrollToTop<T>() {
  const listRef = useRef<FlatList<T>>(null);

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > Dimensions.get('window').height) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return {
    listRef,
    showScrollToTopButton: showButton,
    handleScrollToTop: scrollToTop,
    handleScroll: onScrollHandler,
  };
}