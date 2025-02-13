import { Platform, Appearance, StyleSheet } from 'react-native';

// this is converted to a stylesheet internally at run time with StyleSheet.create(
const isDark = Appearance.getColorScheme() === 'dark';
const backgroundColor = isDark ? 'transparent' : 'transparent';
const textColor = isDark ? '#FFFFFF' : '#000000';
const codeBackgroundColor = isDark ? '#1e1e1e' : '#f5f5f5';
const borderColor = isDark ? '#444444' : '#CCCCCC';
const hrColor = isDark ? '#ffffff' : '#000000';
const blockquoteBg = isDark ? '#333333' : '#F5F5F5';
const blockquoteBorder = isDark ? '#888888' : '#CCC';

export const styles = StyleSheet.create({
  // The main container
  body: {
    backgroundColor,
    color: textColor,
    paddingRight: 10,
    paddingLeft: 10,
  },

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    color: textColor,
    marginBottom: 10,
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
    color: textColor,
    marginBottom: 5
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
    color: textColor,
    marginBottom: 5
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
    color: textColor,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
    color: textColor,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
    color: textColor,
  },

  // Horizontal Rule
  hr: {
    backgroundColor: hrColor,
    height: 1,
  },

  // Emphasis
  strong: {
    fontWeight: 'bold',
    color: textColor,
  },
  em: {
    fontStyle: 'italic',
    color: textColor,
  },
  s: {
    textDecorationLine: 'line-through',
    color: textColor,
  },

  // Blockquotes
  blockquote: {
    backgroundColor: blockquoteBg,
    borderColor: blockquoteBorder,
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: textColor,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1,
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: codeBackgroundColor,
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
    }),
  },
  code_block: {
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: codeBackgroundColor,
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
    }),
  },
  fence: {
    borderWidth: 1,
    borderColor: borderColor,
    backgroundColor: codeBackgroundColor,
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: { fontFamily: 'Courier' },
      android: { fontFamily: 'monospace' },
    }),
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
    color: textColor,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
    color: textColor,
  },

  // Links
  link: {
    textDecorationLine: 'underline',
    color: '#1e90ff',
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  // Images
  image: {
    flex: 1,
  },

  // Text Output
  text: {
    color: textColor,
  },
  textgroup: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    color: textColor,
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},

  // Believe these are never used but retained for completeness
  pre: {},
  inline: {},
  span: {},
});