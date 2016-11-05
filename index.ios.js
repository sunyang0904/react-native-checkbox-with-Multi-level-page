import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import Example from './components/checkboxDemo';

AppRegistry.registerComponent('Example', () => Example);
