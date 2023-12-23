import {NativeBaseProvider, Box, VStack, Center, Button, HStack, Heading, FormControl, Input, Text, Pressable, Select, CheckIcon, Container, TextArea, Icon} from 'native-base'
import axios from 'axios';
import {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import RNPickerSelect from 'react-native-picker-select';

export default function SaveTask(props){
    const [task, setTask] = useState({});
    const [flag, setFlag] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [priorities, setPriorities] = useState([])
    const [assignee, setAssignee] = useState("");
    const project = JSON.parse(localStorage.getItem("project"))
    const [projectDetails, setProjectDetails] = useState({});
    const BASE_API_URL = "http://localhost:5788/api/projects/";
    const [priority, setPriority] = useState("");

    const pickerStyles = StyleSheet.create({
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30
    })

    useEffect(() => {
        axios.get(BASE_API_URL + `projectDetails/` + project.id)
            .then(response => {
                setProjectDetails(response.data);
                console.log(projectDetails)
                setLoaded(true)
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(BASE_API_URL + 'priorities')
            .then(response => {
                setPriorities(response.data);
            })
            .catch((error) =>{
                console.log(error);
            })
    }, [flag])

    const saveTask = () => {
        task.project = project;
        task.status = projectDetails.workflowSchema.statusBeans.find(e => e.ordering == 0).status
        task.checked = false;
        console.log(task)
        axios.post(BASE_API_URL + "saveTask", task)
            .then(response => {
                props.navigations.navigate('Project');
            })
            .catch((error) => {
                console.log(error)
            })
      };

    const handleName = (event) =>
    {
        task.name = event.target.value;
    }

    const handleDescription = (event) =>
    {
        task.description = event.target.value;
    }

    const handleAssignee = (selVal) => {
        task.assignee = projectDetails.participants.find(e => e.id == Number(selVal));
        console.log(task)
    }

    const handleType = (selVal) => {
        task.type = projectDetails.taskTypeSchema.taskTypes.find(e => e.id == Number(selVal));
        console.log(task)
    }

    const handlePriority = (selVal) => {
        task.priority = priorities.find(e => e.id == Number(selVal));
        console.log(task)
    }
     return(
         <>
        <NativeBaseProvider>
            {loaded && 
            <Box flex={1} bg="white" safeAreaTop width="100%">
                <Container height="700" bg="white" maxWidth="100%" m="6">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    {project.name}
                    </Heading>

                    <VStack space={3} mt="5" alignItems="center">
                    <FormControl>
                        <FormControl.Label>Название</FormControl.Label>
                        <Input onChange={handleName} minWidth="340"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Исполнитель</FormControl.Label>
                        <Select minWidth="340" placeholder="Выберите исполнителя" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1}
                        onValueChange={itemValue => handleAssignee(itemValue)}>
                            {projectDetails.participants.map(u => (
                                <Select.Item label={u.displayName} value={String(u.id)} />
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Тип</FormControl.Label>
                        <Select minWidth="340" placeholder="Выберите тип" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1}
                        onValueChange={itemValue => handleType(itemValue)}>
                            {projectDetails.taskTypeSchema.taskTypes.map(t => (
                                <Select.Item label={t.name} value={String(t.id)} key={t.id}/>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Приоритет</FormControl.Label>
                        <Select minWidth="340" placeholder="Выберите приоритет" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1}
                        onValueChange={itemValue => handlePriority(itemValue)}>
                            {priorities.map(t => (
                                <Select.Item label={t.name} value={String(t.id)} key={t.id}/>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Описание</FormControl.Label>
                        <TextArea h={20} placeholder="Введите описание" w="100%" minW="340" onChange={handleDescription}/>
                    </FormControl>
                    <Button ml="65" mt="2" w="340" colorScheme="indigo" onPress={saveTask}>
                        Сохранить
                    </Button>
                    </VStack>
                </Box>
                </Container>
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
            }
        </NativeBaseProvider>
        </>
    )
}