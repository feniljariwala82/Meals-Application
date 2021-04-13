import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FontStyle = (props) => {
    return (
        <View>
            <Text style={styles.appFontStyle}>{props.children}</Text>
        </View>
    )
}

export default FontStyle

const styles = StyleSheet.create({
    appFontStyle: {
        fontFamily: 'open-sans'
    }
})
