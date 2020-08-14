import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler'


import LandingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heardIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

import styles from './styles';


function Landing () {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect( ( ) => {
        api.get('connections').then( response => {
            const total = response.data.total;

            setTotalConnections(total);
        })
    }, []);

    const {navigate} = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPage(){
        navigate('Study');
    }

    return (

        <View style = {styles.container}>
            <Image  source={LandingImg} style = {styles.banner}/>
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonContainer}>
                <RectButton onPress={handleNavigateToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                <Text style={styles.buttonText}>
                    Estudar
                </Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                <Text style={styles.buttonText}>
                    Dar aulas
                </Text>
                </RectButton>

            </View>

                <Text style={styles.totalConnections}>
                    Total de {totalConnections} conexões já realizadas {' '}
                    <Image source ={heardIcon}/>
                </Text>

        </View>
    );
}

export default Landing;