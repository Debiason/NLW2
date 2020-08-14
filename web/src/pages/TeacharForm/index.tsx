import React , { useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../server/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm(){
    const history = useHistory();

    const[name, setName ] = useState('');
    const[avatar, setAvatar ] = useState('');
    const[whatsapp, setWhatsapp ] = useState('');
    const[bio, setBio ] = useState('');

    const[subject, setSubject ] = useState('');
    const[cost, setCost ] = useState('');



    const [sheduleItems,setsheduleItems] = useState([
        {week_day:0,from:'',to:''},
    ]);

    function addNewSheduleItem () {
        setsheduleItems([
            ...sheduleItems,
            {week_day:0,from:'',to:''}
        ]);
    }

    function handlecreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost) ,
            schedule: sheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso')

            history.push('/');

        }).catch(() => {
            alert('Erro no cadastro')
        })
    }

    function setSheduleItemValue(position:number, field: string, value: string) {
        const newArray = sheduleItems.map((scheduleItem, index) => {
            if (index === position ) {
                return {...scheduleItem,[field]:value };
            }

            return scheduleItem;
        });

        setsheduleItems(newArray);
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handlecreateClass}>
                    <fieldset>

                        <legend>Seus Dados</legend>

                        <Input name="name" label="Nome Completo" value={name}  onChange={(e) => {setName(e.target.value)}} />

                        <Input name="avatar" label="Avatar" value={avatar}  onChange={(e) => {setAvatar(e.target.value)}} />

                        <Input name="whatsapp" label="Whatsapp" value={whatsapp}  onChange={(e) => {setWhatsapp(e.target.value)}} />

                        <Textarea name="bio" label="Biografia" value={bio}  onChange={(e) => {setBio(e.target.value)}} />
                    </fieldset>

                    <fieldset>

                        <legend>Sobre a Aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}  
                            onChange={(e) => {setSubject(e.target.value)}} 
                            options={[
                                {value: "Artes", label: "Artes" },
                                {value: "Matemática", label: "Matemática" },
                                {value: "Física", label: "Física" },
                                {value: "Geografia", label: "Geografia" },
                                {value: "História", label: "História" },
                                {value: "Quimíca", label: "Quimíca" },
                            ]}
                        />

                        <Input name="cost" label="Custo da sua hora por aula" value={cost}  onChange={(e) => {setCost(e.target.value)}} />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewSheduleItem}>+ Novo horário</button>   
                        </legend>

                            {sheduleItems.map((sheduleItem,index) => {
                                return (
                                    <div  key={sheduleItem.week_day} className="schema-item">
                                        <Select 
                                            name="week_day" 
                                            label="Dia de Semana" 
                                            value = {sheduleItem.week_day}
                                            onChange={e => setSheduleItemValue(index,'week_day', e.target.value)}
                                            options={[
                                                {value: "0", label: "Domingo" },
                                                {value: "1", label: "Segunda-feira" },
                                                {value: "2", label: "Terça-feira" },
                                                {value: "3", label: "Quarta-feira" },
                                                {value: "4", label: "Quinta-feira" },
                                                {value: "5", label: "Sexta-feira" },
                                                {value: "6", label: "Sábado" },
                                            ]}
                                        />
                                        <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value = {sheduleItem.from}
                                        onChange={e => setSheduleItemValue(index,'from', e.target.value)} 
                            />
                                        <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value = {sheduleItem.to}
                                        onChange={e => setSheduleItemValue(index,'to', e.target.value)}/>
                                        
                        </div>
                                )
                            })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br/>
                            Preeencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;