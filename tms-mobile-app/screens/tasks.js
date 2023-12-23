import {NativeBaseProvider, Box, VStack, Center, Heading, Container, Text, ScrollView, Icon, HStack, Pressable} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Tasks(props) {
    const [tasks, setTasks] = useState({});
    const [flag, setFlag] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const BASE_API_URL = "http://localhost:5788/api/projects/";
    useEffect(() => {
        axios.get(BASE_API_URL + `mytasks/` + user.id)
            .then(response => {
                setTasks(response.data);
                console.log(response.data)
                setLoaded(true)
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
      <>
      {loaded &&
    <NativeBaseProvider>
        <Box flex={1} bg="white" safeAreaTop width="100%" maxHeight="895" alignSelf="center">
            <HStack mt="6" ml="6" mb="3">
                <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" />
                <Heading>Мои задачи</Heading>
            </HStack>
            <ScrollView bg="white.300">
                <VStack space={3} alignItems="center">
                {tasks.map(task => (
                    <Container minW="370" h={100*task.tasks.length + 20} bg="white" rounded="md" backgroundColor = {task.statusName === "Непринятые" ? "red.50": "blueGray.50"}
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
                <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} onPress={() => props.navigation.navigate('Projects')}>
                <Center>
                    <Icon mb="1" as={<MaterialIcons name={"work-outline"} />} color="white" size="sm" />
                    <Text color="white" fontSize="12">
                    Мои проекты
                    </Text>
                </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity="1" py="2" flex={1}>
                <Center>
                    <Icon mb="1" as={<MaterialIcons name={"receipt"} />} color="white" size="sm" />
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
    }
    </>
  );
}

