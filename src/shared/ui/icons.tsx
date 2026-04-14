import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const ChevronRight: React.FC<IconProps> = ({size = 14, color = '#C7C7CC'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Search: React.FC<IconProps> = ({size = 16, color = '#888'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const Plus: React.FC<IconProps> = ({size = 18, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </Svg>
);

export const Close: React.FC<IconProps> = ({size = 14, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export const Tag: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 12l-8 8-9-9V3h8l9 9z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
    <Circle cx={7.5} cy={7.5} r={1.5} fill={color} />
  </Svg>
);

export const Megaphone: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3 11v2a2 2 0 002 2h2l8 4V5L7 9H5a2 2 0 00-2 2z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);

export const UserPlus: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={10} cy={8} r={4} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M19 4v6M16 7h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const Users: React.FC<IconProps> = ({size = 22, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={9} cy={8} r={3.5} stroke={color} strokeWidth={2} fill="none" />
    <Circle cx={17} cy={9} r={2.5} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 20c0-3 2.8-5.5 7-5.5s7 2.5 7 5.5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M15 14c3.3 0 6 2 6 5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
  </Svg>
);

export const Chat: React.FC<IconProps> = ({size = 18, color = '#FFFFFF'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 5h16v11H7l-3 3V5z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);

export const Phone: React.FC<IconProps> = ({size = 18, color = '#07C160'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 5l3-1 2 4-2 1c.8 2 2.2 3.4 4 4l1-2 4 2-1 3c-7 0-11-4-11-11z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);
