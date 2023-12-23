import {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {NativeBaseProvider, Box, Button, Modal, Container, Heading, Text, FormControl,Input, HStack, Icon, Pressable, Center} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import axios from 'axios';

export default function Task(props) {
    const [loaded, setLoaded] = useState(false);
    const [flag, setFlag] = useState(false);
    const [task, setTask] = useState({});
    let taskId = JSON.parse(localStorage.getItem('task')).id;
    console.log(taskId)
    const BASE_API_URL = "http://localhost:5788/api/projects/";

    useEffect(() => {
        axios.get(BASE_API_URL + "task/" + taskId)
            .then(response => {
                setTask(response.data);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
        }, [flag])

    const checkTask = () =>{
        if (task.checked == false){
            axios.get(BASE_API_URL + "checkTask/" + task.id)
            .then(response => {
                setTask(response.data);
            })
        }
        else{
        axios.get(BASE_API_URL + "moveTask/" + task.id)
            .then(response => {
                setTask(response.data);
            })
        }
    }

    return (
        <>
        {loaded && 
        <NativeBaseProvider>
            <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
                <Container minHeight="640" width="100%">
                    <HStack pt="3" pl="6" pb="3" mb="3" w="414" borderBottomColor="blueGray.100" borderBottomWidth="1" >
                        <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" />
                        <Heading>Задача</Heading>
                        <Icon as={<MaterialIcons name="settings" />} color="blue.500" size="xl" ml="225"/>
                    </HStack>
                    <Box alignItems="center">
                        <Box minW="380" ml="4" rounded="lg" overflow="hidden" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                            }} _web={{
                            shadow: 2,
                            borderWidth: 0
                            }} _light={{
                            backgroundColor: "blueGray.50"
                            }}>
                            <Container mt="6" ml="6">
                                <Heading>{task.name} </Heading>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Исполнитель: </Text>
                                    {task.assignee.displayName}
                                </Text>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Приоритет: </Text> 
                                    <Text color="green.500">{task.priority.name}</Text>
                                </Text>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Тип: </Text> {task.type.name}
                                </Text>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Статус: </Text> {task.status.name}
                                </Text>
                                <Box alignItems="center" mt="6" mb="6">
                                    <Button size="sm" bg="blue.500" w="335" onPress={checkTask}>{task.checked ? '>>>' : 'Принять' }</Button>
                                </Box>
                                <Text mb="3" fontWeight="medium">
                                    <Text bold>Описание: </Text> {task.description}
                                </Text>
                            </Container>
                            
                        </Box>
                    </Box>
                </Container>
                    <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity="1" py="2" flex={1} onPress={() => props.navigation.navigate('Projects')}>
                        <Center>
                        <Icon mb="1" as={<MaterialIcons name="work" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Мои проекты
                        </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} >
                        <Center>
                        <Icon mb="1" as={<MaterialIcons name={"receipt"} />} color="white" size="sm" onPress={() => props.navigation.navigate('Tasks')}/>
                        <Text color="white" fontSize="12">
                            Новые задачи
                        </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} >
                        <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name="account"/>} color="white" size="sm" onPress={() => props.navigation.navigate('Profile')}/>
                        <Text color="white" fontSize="12">
                            Профиль
                        </Text>
                        </Center>
                    </Pressable>
                    </HStack>
                </Box>
            </NativeBaseProvider>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });