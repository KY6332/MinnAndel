import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import styles, { colors } from '../styles/theme';

export function Page({ children }) {
  return <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>;
}
export function Title({ children }) { return <Text style={styles.title}>{children}</Text>; }
export function Sub({ children }) { return <Text style={styles.subtitle}>{children}</Text>; }
export function Section({ children }) { return <Text style={styles.section}>{children}</Text>; }
export function Card({ children }) { return <View style={styles.card}>{children}</View>; }
export function Heading({ children }) { return <Text style={styles.cardTitle}>{children}</Text>; }
export function Body({ children }) { return <Text style={styles.text}>{children}</Text>; }
export function Muted({ children }) { return <Text style={styles.muted}>{children}</Text>; }
export function Badge({ children }) { return <View style={styles.badge}><Text style={styles.badgeText}>{children}</Text></View>; }
export function Button({ title, onPress, secondary = false, disabled = false, loading = false }) {
  return <Pressable accessibilityRole="button" disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, (disabled || loading) && { opacity: 0.5 }, pressed && { opacity: 0.8 }]}>
    {loading ? <ActivityIndicator color={secondary ? colors.primary : 'white'} /> : <Text style={[styles.buttonText, secondary && styles.buttonSecondaryText]}>{title}</Text>}
  </Pressable>;
}
export function Field({ label, value, onChangeText, placeholder, multiline = false, keyboardType, secureTextEntry }) {
  return <View style={{ gap: 6 }}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={[styles.field, multiline && { minHeight: 95, textAlignVertical: 'top' }]} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#8B9A94" multiline={multiline} keyboardType={keyboardType} secureTextEntry={secureTextEntry} autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'} />
  </View>;
}
export function ErrorText({ children }) { return children ? <Text style={styles.error}>{children}</Text> : null; }

export function Hero({ eyebrow, title, description }) {
  return <View style={styles.hero}>
    <Text style={styles.heroEyebrow}>{eyebrow}</Text>
    <Text style={styles.heroTitle}>{title}</Text>
    <Text style={styles.heroDescription}>{description}</Text>
  </View>;
}
export function ActionTile({ icon, title, description, onPress }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => [styles.tile, pressed && { backgroundColor: colors.primarySoft }]}>
    <View style={styles.tileIcon}><Text style={{ fontSize: 23 }}>{icon}</Text></View>
    <View style={{ gap: 5 }}><Text style={styles.tileTitle}>{title}</Text><Text style={styles.tileDescription}>{description}</Text></View>
  </Pressable>;
}
