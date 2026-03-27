import {useState, useCallback} from 'react';

const MAX_LINES = 5;

export function usePostItemViewModel(contentLines: number) {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = contentLines > MAX_LINES;

  const toggleExpand = useCallback(() => {
    setExpanded(v => !v);
  }, []);

  return {
    expanded,
    needsExpand,
    toggleExpand,
    displayLines: expanded ? undefined : MAX_LINES,
  };
}
