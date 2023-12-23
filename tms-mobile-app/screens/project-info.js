import {useState, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {NativeBaseProvider, Box, Button, Modal, Container, Heading, Text, FormControl,Input, HStack, Icon, Pressable, Center, Select, Link, CheckIcon, Spacer, PresenceTransition, TextArea} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import axios from 'axios'
import ModalSelector from 'react-native-modal-selector-searchable'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

export default function ProjectInfo(props) {
    const BASE_API_URL = "http://localhost:5788/api/projects/";
    const [showModal, setShowModal] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const project = JSON.parse(localStorage.getItem("project"));
    const [projectDetails, setProjectDetails] = useState({});
    const [users, setUsers] = useState([])
    const [flag, setFlag] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState("");

    const [supportTask, setSupportTask] = useState({});

    useEffect(() => {
        axios.get(BASE_API_URL + `projectDetails/` + project.id)
            .then(response => {
                setProjectDetails(response.data);
                localStorage.setItem("projectDetails", JSON.stringify(response.data))
                console.log(projectDetails)
                setLoaded(true)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const showUserPicker = () => {
        axios.get(BASE_API_URL + `getUsersNotInProject/` + project.id)
            .then(response => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        setShowModalUser(true);
    }

    const saveParticipant = () => {
        setShowModalUser(false);
        let participant = {
            user: user,
            project: project}
        console.log(participant)
        axios.post(BASE_API_URL + `participants/add`, participant)
            .then(respose => {
                setFlag(!flag);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSupportName = (event) =>{
        supportTask.name = event.target.value;
    }

    const handleSupportDescription = (event) =>{
        supportTask.description = event.target.value;
    }

    const saveSupportTask = () => {
        axios.post(BASE_API_URL + "saveSupportTask", supportTask)
            .then(response => {
                setShowModal(false);
            })
    }

    return (
        <>
        <NativeBaseProvider>
            {loaded &&
            <Box flex={1} bg="white" safeAreaTop width="414" alignSelf="center">
                <Container minHeight="840" width="414">
                    <HStack pt="3" pl="6" pb="3" mb="3" borderBottomColor="blueGray.100" borderBottomWidth="1" w="414">
                        <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" />
                        <Heading>{projectDetails.name}</Heading>
                    </HStack>
                    <Box alignItems="center">
                        <Box>
                            <Container ml="6">
                                <Text mt="3">
                                    <Text bold pb="1" >Менеджер: </Text> 
                                    {projectDetails.lead.displayName}
                                </Text>
                                    <Box>
                                        <Text mt="3">
                                            <Text bold>Участники: </Text>
                                            <Link onPress={showUserPicker}>Добавить</Link>
                                        </Text>
                                    </Box>
                                    {projectDetails.participants.map(part =>(
                                        <HStack shadow="2" bg="blueGray.50"p="2" w="345" mt="2">
                                            <Box w="120">{part.displayName}</Box>
                                            <Icon as={<MaterialIcons name="close" />} color="blue.500" ml="190" size="sm" />
                                        </HStack>
                                    ))}
                                    <Box fontWeight="medium" mt="3" pb="1" borderBottomColor="gray.300" borderBottomWidth="1" w="345">
                                        <Text bold>Схема типов: </Text>
                                        <Text fontWeight="medium">{projectDetails.taskTypeSchema.name}</Text>
                                    </Box>
                                    {projectDetails.taskTypeSchema.taskTypes.map(type => (
                                        <Box>{type.name}</Box>
                                    ))}
                                    
                                    <Box mt="3" fontWeight="medium" pb="1" borderBottomColor="gray.300" borderBottomWidth="1" w="345">
                                        <Text bold>Схема рабочего процесса: </Text>
                                        <Text fontWeight="medium">{projectDetails.workflowSchema.name}</Text> 
                                    </Box>
                                    {projectDetails.workflowSchema.statusBeans.map(s => (
                                        <Box><Text>{s.ordering}. {s.status.name}</Text></Box>
                                    ))}
                            </Container>
                            <Box alignItems="center" mt="6" mb="6">
                                    <Button size="sm" bg="blue.500" onPress={() => setShowModal(true)}>Обратиться в тех.поддержку</Button>
                            </Box>
                        </Box>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Обращение</Modal.Header>
                                <Modal.Body>
                                <FormControl>
                                        <FormControl.Label>Тема</FormControl.Label>
                                        <Input onChange={handleSupportName}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormControl.Label>Опишите предложение</FormControl.Label>
                                        <TextArea onChange={handleSupportDescription}/>
                                    </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setShowModal(false);
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button onPress={saveSupportTask}>
                                            Save
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                        <Modal isOpen={showModalUser} onClose={() => setShowModalUser(false)}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Добавить пользователя</Modal.Header>
                                <Modal.Body>
                                    <FormControl>
                                        <FormControl.Label>Выберите пользователя</FormControl.Label>
                                        <Select selectedValue={user} minWidth="200" placeholder="Выберите пользователя" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setUser(users.find(e => e.id == itemValue))}>
                                            {users.map(u => (
                                                <Select.Item label={u.displayName} value={String(u.id)} />
                                            ))}
                                            </Select>
                                    </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setShowModalUser(false);
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button onPress={saveParticipant}>
                                            Save
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
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
                    <Pressable cursor="pointer" opacity="0.6" py="2" flex={1} >
                        <Center>
                        <Icon mb="1" as={<MaterialIcons name={"receipt"} />} color="white" size="sm" onPress={() => props.navigation.navigate('Tasks')}/>
                        <Text color="white" fontSize="12">
                            Новые задачи
                        </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} >
                        <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name="account-outline"/>} color="white" size="sm" />
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });