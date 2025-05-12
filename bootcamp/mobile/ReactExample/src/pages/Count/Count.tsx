import { View } from "react-native";
import { styles } from "./styles";
import { Text, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import CustomButton from "../../components/CustomButton/CustomButton";

export default function Count() {

    const { count: { number, sum, multiply, divide } } = useAppContext();

    const [num, setNum] = useState<number>();

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Count</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={num?.toString()}
                        onChangeText={(text) => {
                            setNum(Number(text));
                        }}
                        style={styles.input}
                        placeholder="Enter a number"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Sum"
                        onClick={() => {
                            sum(num!);
                        }}
                        color="blue"
                    />
                    <CustomButton
                        text="Multiply"
                        onClick={() => {
                            multiply(num!);
                        }}
                        color="green"
                    />
                    <CustomButton
                        text="Divide"
                        onClick={() => {
                            divide(num!);
                        }}
                        color="red"
                    />
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 45 }}>
                    <Text style={{fontSize: 45, fontWeight: 'bold'}}>
                        {number}
                    </Text>
                </View>
            </View>
        </View>
    )
}