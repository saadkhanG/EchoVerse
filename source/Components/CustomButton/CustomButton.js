import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../assets/colors";
import { fontSize, scalableheight } from "../../assets/dimensions";

export default function CustomButton(props) {
    return (
        <TouchableOpacity
            disabled={props.disabled}
            onPress={props.onPress}
            activeOpacity={0.9}
            style={[props.style,{
                backgroundColor: props.bgColor ? props.bgColor : colors.main, // Change the color as needed
                paddingVertical: scalableheight.onepointeight,
                borderRadius: fontSize.borderradiusmedium,
                alignSelf: 'center',
                alignItems: 'center',
                position: props.bottom === true ? 'absolute' : null,
                bottom: props.bottom === true ?  scalableheight.onepointeight : null,
                width: props.width ? props.width : '100%'
            }]}
        >
            <Text
                style={{
                    color: props.color ? props.color : colors.white,
                    fontSize: fontSize.twelve,
                    fontWeight: '600',
                }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
