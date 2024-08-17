import { Link } from 'expo-router';
import { Button, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

function LinkButtonWithReplace(route, routeName) {
    return (
        <Link replace href={route} asChild>
            <Button title={routeName} />
        </Link>
    );
}
function LinkButton(route, routeName) {
    return (
        <Link href={route} asChild>
            <Button title={routeName} />
        </Link>
    );
}
function LinkTouchableOpacity(route, routeName, perf_color) {
    return (
        <Link replace href={route} asChild>
            <TouchableOpacity>
                <Text style={{ color: perf_color }}>
                    {routeName}
                </Text>
            </TouchableOpacity>
        </Link>
    );
}

function HomeLinkButton() {
    return (
        <View>
            <Link href='/home' asChild>
                <Button title="Home" />
            </Link>
        </View>
    );
}

export { LinkButton, LinkButtonWithReplace, HomeLinkButton, LinkTouchableOpacity };
