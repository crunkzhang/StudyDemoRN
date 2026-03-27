/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import ChatDetailPage from './src/modules/chat/pages/ChatDetailPage';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('ChatDetail', () => ChatDetailPage);
