import {useState, useCallback} from 'react';

export function useCommentViewModel(
  onSubmit: (content: string) => Promise<void>,
) {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const show = useCallback(() => {
    setInputText('');
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setInputText('');
  }, []);

  const submit = useCallback(async () => {
    const text = inputText.trim();
    if (!text || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(text);
      hide();
    } finally {
      setSubmitting(false);
    }
  }, [inputText, submitting, onSubmit, hide]);

  return {
    visible,
    inputText,
    submitting,
    setInputText,
    show,
    hide,
    submit,
  };
}
