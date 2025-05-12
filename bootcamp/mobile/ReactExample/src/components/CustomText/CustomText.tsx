import { StyleSheet, View, TextProps, Text } from 'react-native';
import { THEME } from '../../assets/THEME';


interface CustomTextProps extends TextProps {
    fontSize?: number;
    lineHeight?: number;
}

export default function CustomText({ children, fontSize, lineHeight, style, ...props }: CustomTextProps) {
    return (
        <Text
            {...props}
            style={[
                styles.text,
                fontSize ? { fontSize: fontSize } : { fontSize: 16 },
                lineHeight ? { lineHeight: lineHeight } : { lineHeight: 24 },
                style
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#404040',
        fontFamily: THEME.FONTS.DMSans.regular,
    }
});