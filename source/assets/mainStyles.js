import { StyleSheet } from "react-native";
import { fontSize, scalableheight } from "./dimensions";
import { colors } from "./colors";

const mainStyles = StyleSheet.create({
    heading:{
        fontSize:fontSize.thirtytwo,
        fontWeight:'700',
        color:colors.white
    },
    descriptiopn:{
        fontSize:fontSize.fifteen,
        fontWeight:'500',
        color:colors.appGrey,
        textAlign:'justify',
        lineHeight:scalableheight.twopointsix
    },
    whiteText:{
        fontSize:fontSize.thirteen,
        fontWeight:'500',
        color:colors.white,
        textAlign:'center'
    }
})

export default mainStyles;