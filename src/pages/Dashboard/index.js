import React, {useEffect, useState} from 'react';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import {Container, Title, List} from './styles';
import Appointment from '~/components/Appointment';
import api from '~/services/api';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);
  async function loadAppointments() {
    const response = await api.get('appointment');
    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointment/${id}`);
    loadAppointments();
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
