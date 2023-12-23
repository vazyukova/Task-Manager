import {useState} from 'react'
import {StyleSheet} from 'react-native'
import {NativeBaseProvider, Box, Button, Modal, Container, Heading, Text, Link, FormControl,Input, HStack, Icon, Pressable, Center} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import axios from 'axios'

export default function Profile(props) {
    const [showModal, setShowModal] = useState(false);
    let user = JSON.parse(localStorage.getItem('user'));
    const [password, setPassword] = useState("");
    const [doublePassword, setDoublePassword] = useState("");
    const [message, setMessage] = useState("");
    const API_URL = "http://localhost:5788/api/users/";

    const logout = () =>{
        localStorage.clear();
        props.navigation.navigate('Auth');
    }

    const changePassword = () =>{
        if (password !== doublePassword){
            setMessage("Пароли не совпадают")
        }
        else {
            axios.post(API_URL + "changePassword/" + user.id, {password: password})
                .then(response => {
                    setShowModal(false)
                })
        }

    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleDoublePassword = (event) =>{
        setDoublePassword(event.target.value);
    }


    return (
        <>
        <NativeBaseProvider>
            <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
                <Container minHeight="640" width="100%">
                    <HStack pt="3" pl="6" pb="3" mb="3" width="414" borderBottomColor="blueGray.100" borderBottomWidth="1" >
                        <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" />
                        <Heading>Профиль</Heading>
                    </HStack>
                    <Box alignItems="center">
                        <Box minW="380" ml="6" rounded="lg" overflow="hidden" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                            }} _web={{
                            shadow: 2,
                            borderWidth: 0
                            }} _light={{
                            backgroundColor: "blueGray.50"
                            }}>
                            <Container mt="6" ml="6">
                                <Heading>{user.displayName} </Heading>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Логин: </Text> {user.username}
                                </Text>
                                <Text mt="3" fontWeight="medium">
                                    <Text bold>Почта: </Text> {user.email}
                                </Text>
                            </Container>
                            <Box mt="3" mb="3">
                                    <Link pl="6" color="blue.500" onPress={() => setShowModal(true)}>Изменить пароль</Link>
                            </Box>
                            <Box alignItems="center" mt="3" mb="6">
                                    <Button size="sm" onPress={logout}>Выйти</Button>
                            </Box>
                        </Box>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Измените пароль</Modal.Header>
                                <Modal.Body>
                                    <FormControl>
                                        <FormControl.Label>Введите пароль</FormControl.Label>
                                        <Input type="password" onChange={handlePassword}/>
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>Подтвердите пароль</FormControl.Label>
                                        <Input type="password" onChange={handleDoublePassword}/>
                                    </FormControl>
                                    <Text color="red.500">{message}</Text>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setShowModal(false);
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button onPress={() => {
                                        changePassword()
                                        }}>
                                            Save
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </Box>
                </Container>
                    <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity="0.5" py="2" flex={1} onPress={() => props.navigation.navigate('Projects')}>
                        <Center>
                        <Icon mb="1" as={<MaterialIcons name="work-outline" />} color="white" size="sm" />
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
                    <Pressable cursor="pointer" opacity="1" py="2" flex={1} >
                        <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name="account"/>} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Профиль
                        </Text>
                        </Center>
                    </Pressable>
                    </HStack>
                </Box>
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