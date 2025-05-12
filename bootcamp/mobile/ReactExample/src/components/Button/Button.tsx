import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";


interface ButtonRootProps extends TouchableOpacityProps {
    children: React.ReactElement<ButtonLabelProps> | React.ReactElement<ButtonLabelProps>[];
    type?: 'default' | 'outline' | 'ghost';

}

function ButtonRoot({ type = 'default', children, style, ...props }: ButtonRootProps) {

    const typeStyles = {
        default: styles.default,
        outline: styles.outline,
        ghost: styles.ghost,
    }

    return (
        <TouchableOpacity
            {...props}
            style={[
                typeStyles[type],
                style,
            ]}
        >

            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { type })
                    }
                    return child;
                })
            }
        </TouchableOpacity>
    )
}


interface ButtonLabelProps {
    children: ReactNode;
    type?: 'default' | 'outline' | 'ghost';
}

function ButtonLabel({ children, type = 'default' }: ButtonLabelProps) {
    const typeStyles = {
        default: styles.defaultLabel,
        outline: styles.outlineLabel,
        ghost: styles.ghostLabel,
    }
    return (
        <Text
            style={[styles.label, typeStyles[type]]}
        >
            {children}
        </Text>
    )
}


export const Button = {
    Root: ButtonRoot,
    Label: ButtonLabel,
}

const styles = StyleSheet.create({
    default:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#00BC7D',
    },
    outline:{
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#009966',
        backgroundColor: 'white'
    },
    ghost:{
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    defaultLabel:{
        color: '#FFFFFF',
    },
    outlineLabel:{
        color: '#009966',
    },
    ghostLabel:{
        color: '#171717',
    },
    label:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        lineHeight: 24,
    },
});
