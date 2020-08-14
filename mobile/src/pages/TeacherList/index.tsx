import React, { useState } from 'react';
import { View,Text, Picker, KeyboardAvoidingView, Platform } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { Feather } from '@expo/vector-icons';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';



import styles from './styles';

function TeacherList() {
    
    const[teachers, setTeachers ] = useState([]);
    const[favorites, setFavorites ] = useState<Number[]>([]);
    
    const[subject, setSubject ] = useState('');
    const[week_day, setWeekDay ] = useState('7');
    const[time, setTime ] = useState('');

    function loadFavorite(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersIds);   
            }
        })
    }


    const [isFilterVisible,setIsFilterVisible] = useState(false);

    function handleToggleFilterVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleSubmit(){

        loadFavorite();

        const response = await api
        .get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFilterVisible(false);
        setTeachers(response.data);

    }

    return (
        <View>     
            <PageHeader 
                title="Proffys dísponiveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}>
                { isFilterVisible && (
                    <View style={styles.searchForm}>

                        <Text style={styles.label}>Matéria</Text>

                        <Picker
                            selectedValue={subject}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
                        >
                            <Picker.Item label="Selecione" value="" />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Matemática" value="Matemática" />
                            <Picker.Item label="Física" value="Física" />
                            <Picker.Item label="Geografia" value="Geografia" />
                            <Picker.Item label="História" value="História" />
                            <Picker.Item label="Quimíca" value="Quimíca" />
                        </Picker>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <Picker
                                    selectedValue={week_day}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) => setWeekDay(itemValue)}
                                >
                                    <Picker.Item label="Domingo" value="0" />
                                    <Picker.Item label="Segunda-feira" value="1" />
                                    <Picker.Item label="Terça-feira" value="2" />
                                    <Picker.Item label="Quarta-feira" value="3" />
                                    <Picker.Item label="Quinta-feira" value="4" />
                                    <Picker.Item label="Sexta-feira" value="5" />
                                    <Picker.Item label="Sabádo" value="6" />
                                    <Picker.Item label="Selecione" value="7" />
                                </Picker>

                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o Horário"
                                    placeholderTextColor="#c1bccc"
                                >

                                </TextInput>

                            </View>
                        </View>

                        <RectButton onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom:16
                }}
            >
                {teachers.map((teacher:Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                })}
            </ScrollView>
            
        </View>
    );
}

export default TeacherList;