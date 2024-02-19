import { TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { gStyle } from "../styles/global";
import { useLayoutEffect, useState } from "react";

const UserTextInput = ({
    placeholder,
    isPass,
    setStateValue,
    setGetEmailValidationStatus,
}) => {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [icon, setIcon] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleTextChange = (event) => {
        event.persist();
        setValue(event.nativeEvent.text);
        setStateValue(event.nativeEvent.text);
        if (placeholder === "Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(value);
            setIsEmailValid(status);
            setGetEmailValidationStatus(status);
        }
    };

    useLayoutEffect(() => {
        switch (placeholder) {
            case "Full Name":
                return setIcon("person");
            case "Email":
                return setIcon("email");
            case "Password":
                return setIcon("lock");
            default:
                return null;
        }
    }, []);

    return (
        <View
            style={[
                tw`border rounded-2xl px-4 py-6 flex-row items-center justify-between my-2`,
                {
                    borderColor:
                        !isEmailValid && placeholder === "Email" && value.length
                            ? "red"
                            : "grey",
                },
            ]}
        >
            <MaterialIcons name={icon} size={24} color="#6C6D83" />
            <TextInput
                style={[
                    tw`flex-1 text-base font-semibold -mt-1 mx-2`,
                    { color: gStyle.primaryText },
                ]}
                placeholder={placeholder}
                value={value}
                onChange={handleTextChange}
                secureTextEntry={isPass && showPass}
                autoCapitalize="none"
            />

            {isPass && (
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <Entypo
                        name={`${showPass ? "eye" : "eye-with-line"}`}
                        size={24}
                        color="#6C6D83"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UserTextInput;
