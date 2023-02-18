import * as React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text,HelperText } from 'react-native-paper';




const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const validateEmail = (email: string): string | null => {
        if (!email) {
            return 'Email is required';
        }

        // if (!validate(email, 'isEmail')) {
        //     return 'Email is invalid';
        // }

        return null;
    };

    const validatePassword = (password: string): string | null => {
        if (!password) {
            return 'Password is required';
        }

        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }

        return null;
    };

    const handleSignInPress = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (emailError || passwordError) {
            return;
        }

        // Submit the form
    };

    const handleForgotPasswordPress = () => {
        // Handle forgot password button press
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {/* <Image
                    source={require("../../../images/registration.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                /> */}
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sign In</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={() => setEmailError(validateEmail(email))}
                        style={styles.input}
                        placeholder="Enter the Email"
                        error={Boolean(emailError)}
                        // helperText={emailError}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={() => setPasswordError(validatePassword(password))}
                        style={styles.input}
                        placeholder="Enter the Password"
                        secureTextEntry
                        error={Boolean(passwordError)}
                        // helperText={passwordError}
                    />
                    <Button
                        mode="contained"
                        onPress={handleSignInPress}
                        style={styles.signInButton}
                    >
                        Sign In
                    </Button>
                    <Text
                        style={styles.forgotPasswordText}
                        onPress={handleForgotPasswordPress}
                    >
                        Forget your account or password?
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
        width:"100%"
    },
    signInButton: {
        marginVertical: 20,
    },
    forgotPasswordText: {
        marginBottom: 20,
    },
});