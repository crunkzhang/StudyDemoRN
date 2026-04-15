import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Colors} from '../../../../shared/ui/tokens';
import {splitByHit} from '../utils/highlight';

interface Props { text: string; keyword: string; style?: StyleProp<TextStyle>; numberOfLines?: number; }

const SearchHitText: React.FC<Props> = ({text, keyword, style, numberOfLines}) => (
  <Text style={style} numberOfLines={numberOfLines}>
    {splitByHit(text, keyword).map((seg, i) => (
      <Text key={i} style={seg.hit ? {color: Colors.brand} : undefined}>{seg.text}</Text>
    ))}
  </Text>
);

export default SearchHitText;
