import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TextLinkProps {
    onPress: () => void;
    simpleText: string;
    boldText?: string;
}


export default function TextLink({ boldText, onPress, simpleText }: TextLinkProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text
                style={styles.text}
            >
                {simpleText}
                {boldText && <Text style={[styles.text, styles.boldText]}>{boldText}</Text>}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
        color: '#404040',
        fontFamily: 'DMSans-Regular',
    },
    boldText: {
        fontFamily: 'DMSans-Bold',
    },
});