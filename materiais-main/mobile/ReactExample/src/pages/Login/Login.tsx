import { Image, StatusBar, View } from 'react-native';
import { styles } from './styles';
import Title from '../../components/Title/Title';
import CustomText from '../../components/CustomText/CustomText';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import KeyboardAvoidingContent from '../../components/KeyboardAvoidingContent/KeyboardAvoidingContent';
import { isValidElement, useState } from 'react';
import Toast from 'react-native-toast-message';
import useAppContext from '../../hooks/useAppContext';

const logo = require('../../assets/images/logo.png');

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { auth: { login } } = useAppContext();


    function verifyEmail() {
        return email.length > 0 && email.includes('@');
    }

    function showErrorToast(title: string, message: string) {
        Toast.show({
            type: 'error',
            text1: title,
            text2: message,
        });
    }


    async function handleLogin() {
        try {
            let isError = false;

            if (!verifyEmail()) {
                setEmailError(true);
                isError = true;
            }
            if (password.length < 6) {
                setPasswordError(true);
                isError = true;
            }
            if (isError) return;
            login && await login(email, password)

        } catch (error: any) {
            showErrorToast('Houve um Erro', error.message);
        }



    }

    return (
        <KeyboardAvoidingContent>
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <View style={styles.header}>
                    <Title>
                        Faça Login e comece a treinar
                    </Title>
                    <CustomText
                        style={styles.subTitle}
                    >
                        Encontre parceiros para treinar ao ar livre. Conecte-se e comece agora! 💪
                    </CustomText>
                </View>
                <View style={styles.form}>
                    <Input.Root isError={emailError}>
                        <Input.Label required>E-mail</Input.Label>
                        <Input.Input
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(false);
                            }}
                            autoCapitalize='none'
                            placeholder='Ex.: nome@email.com'
                        />
                        <Input.ErrorMessage style={{ marginTop: 6 }}>
                            Preencha o campo com seu e-mail!
                        </Input.ErrorMessage>
                    </Input.Root>
                    <Input.Root isError={passwordError}>
                        <Input.Label required>Senha</Input.Label>
                        <Input.Input
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError(false);
                            }}
                            placeholder='******'
                            autoCapitalize='none'
                            autoComplete='off'
                            secureTextEntry
                        />
                        <Input.ErrorMessage style={{ marginTop: 6 }}>
                            Preencha o campo com seu e-mail!
                        </Input.ErrorMessage>
                    </Input.Root>
                    <Button.Root style={{ marginTop: 40, marginBottom: 18, width: '80%', height: 44, alignSelf: 'center' }}
                        onPress={handleLogin}
                    >
                        <Button.Label>Entrar</Button.Label>
                    </Button.Root>
                    <TextLink onPress={() => console.log('cadastrar')} simpleText='Ainda não tem uma conta?' boldText=' Cadastre-se' />
                </View>
            </View>
        </KeyboardAvoidingContent>
    );
}