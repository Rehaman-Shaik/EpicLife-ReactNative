import { Link } from 'expo-router';
import { Button, View } from 'react-native';
import React from 'react';

function LinkButtonWithReplace(route: string, routeName: string) {
    return (
        <Link replace href={route} asChild>
            <Button title={routeName} />
        </Link>
    );
}
function LinkButton(route: string, routeName: string) {
    return (
        <Link href={route} asChild>
            <Button title={routeName} />
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

export { LinkButton, LinkButtonWithReplace, HomeLinkButton };
