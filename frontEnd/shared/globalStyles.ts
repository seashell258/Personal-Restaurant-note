// globalStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from './variable';

export const globalStyles = StyleSheet.create({
  /* ==============================
     全局容器
  ============================== */
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.bg,
  },

  /* ==============================
     文字
  ============================== */
  text: {
    fontFamily: font.base,
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  h1: { fontSize: 24, fontWeight: '600', marginBottom: spacing.sm },
  h2: { fontSize: 20, fontWeight: '600', marginBottom: spacing.sm },
  h3: { fontSize: 18, fontWeight: '600', marginBottom: spacing.sm },

  /* ==============================
     按鈕
  ============================== */
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonSecondary: { backgroundColor: colors.secondary },
  buttonText: { color: '#fff', fontWeight: '500' },

  /* ==============================
     表單輸入
  ============================== */
  input: {
    width: '100%',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  textarea: {
    width: '100%',
    minHeight: 120,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    fontSize: 16,
  },

  /* ==============================
     卡片
  ============================== */
  card: {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Android 阴影
  },

  /* ==============================
     列表
  ============================== */
  list: { width: '100%' },
  listItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.listBorder,
  },

  /* ==============================
     佈局
  ============================== */
  flex: { flexDirection: 'row' },
  flexCenter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  flexBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  mtSm: { marginTop: spacing.sm },
  mtMd: { marginTop: spacing.md },
  mtLg: { marginTop: spacing.lg },

  mbSm: { marginBottom: spacing.sm },
  mbMd: { marginBottom: spacing.md },
  mbLg: { marginBottom: spacing.lg },
});
