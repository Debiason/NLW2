import React, { useState } from 'react';
import { View } from 'react-native';

import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';

function Favorites() {

    const [favorites, setFavorites] = useState([]);
    

    function loadFavorite(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response) {
                const favoritedTeachers = JSON.parse(response);

                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorite();
        }, [])
      )

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos"/>

            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal:16,
                paddingBottom:16
            }}
            >
                {favorites.map((teacher: Teacher)=>{
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        
                        />
                    )
                })}
            </ScrollView>

        </View>
    );
}

export default Favorites;