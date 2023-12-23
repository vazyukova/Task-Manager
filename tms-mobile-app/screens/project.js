import {NativeBaseProvider, Box, VStack, Center, Heading, Container, Text, ScrollView, Icon, HStack, Button, IconButton, Input, Pressable} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Project(props) {
  const project = JSON.parse(localStorage.getItem("project"));
  const user = JSON.parse(localStorage.getItem('user'));
  const isManager = project.lead.id === user.id;
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(false)
  const BASE_API_URL = "http://localhost:5788/api/projects/";
  
  useEffect(() => {
    axios.get(BASE_API_URL + project.id + `/tasks`)
        .then(response => {
            setTasks(response.data);
            console.log(response.data)
            //setFlag(false)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [flag])

    const navigateToTask = (task) => {
        localStorage.setItem('task', JSON.stringify(task))
        props.navigation.navigate('Task')
    }
    return (
      <NativeBaseProvider bg="white">
          <Box bg="white" minH="800">
          <HStack mt="6" ml="6" mb="3">
          <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" pt="2" />
          <Heading pt="2">{project.name}</Heading>
          {isManager && <IconButton icon={<Icon as={<MaterialIcons name="info" />} color="blue.500" size="xl" />} size="sm" onPress={() => props.navigation.navigate('ProjectInfo')}></IconButton>}
          </HStack>
          <Input placeholder="Начните вводить название" width="365" ml="6" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
          {isManager && <Button m="3" ml="6" mr="6" bg="blue.500" onPress={() => {props.navigation.navigate('SaveTask')}}>Создать новую задачу</Button>}
        <ScrollView bg="white">
            <VStack space={3} alignItems="center" m="3">
            {tasks.map(task => (
                <Container minW="370" h={task.tasks.length === 0 ? 100 : 100*task.tasks.length + 30} bg="white" rounded="md" backgroundColor = {task.statusName === "Непринятые" ? "red.50": "blueGray.50"}
                 _web={{
                    shadow: 2
                }} _light={{
                
                }}>
                        <Box m="3" >
                            <Heading color={task.statusName === "Непринятые" ? "red.500": "blue.500"}>{task.statusName}</Heading>
                            {task.tasks.map(t => (
                                <Box minW="340" mt="2" p="3" rounded="lg" overflow="hidden" 
                                    _web={{
                                        shadow: 1
                                    }} _light={{
                                    backgroundColor: "white"
                                    }}>
                                    <Pressable onPress={() => navigateToTask(t)}>
                                        <HStack>
                                        <Text bold>{t.name}</Text>
                                        <Icon as={<MaterialIcons name="circle" />} color={t.priority.name === "Высокий" ? "red.500" : "green.500"} size="sm" />
                                        </HStack>
                                        <Text>{t.assignee.displayName}</Text>
                                    </Pressable>
                                </Box>
                            ))}
                        </Box>
                </Container>
                ))}
            </VStack>
        </ScrollView>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity="1" py="2" flex={1}>
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name={"work"} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                        Мои проекты
                        </Text>
                    </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity="0.6" py="2" flex={1}>
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name={"receipt"} />} color="white" size="sm" onPress={() => props.navigation.navigate('Tasks')}/>
                        <Text color="white" fontSize="12">
                        Новые задачи
                        </Text>
                    </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} onPress={() => props.navigation.navigate('Profile')}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={"account-outline"} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                        Профиль
                        </Text>
                    </Center>
                    </Pressable>
                </HStack>
        </Box>
    </NativeBaseProvider>
  );
}

