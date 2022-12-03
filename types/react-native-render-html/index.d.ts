declare module 'react-native-render-html' {
  import { ViewStyle, StyleProp } from 'react-native';

  type Props = {
    html: string;
    onLinkPress: (x: string, link: string) => void;
    baseFontStyle: { fontSize: number };
    tagsStyles: { [key: string]: StyleProp<ViewStyle> };
  };
  function HTML(props: Props): React.ReactElement;
  export default HTML;
}
