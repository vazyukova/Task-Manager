import {useState, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {NativeBaseProvider, Box, Pressable, Modal, Container, Heading, Text, Center, HStack, VStack, Icon} from 'native-base'
import {MaterialCommunityIcons, MaterialIcons} from 'react-native-vector-icons'
import axios from 'axios'

export default function Projects(props){
    const BASE_API_URL = "http://localhost:5788/api/projects/";
    const [projects, setProjects] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        axios.get(BASE_API_URL + `getByUser/` + JSON.parse(localStorage.getItem('user')).id)
            .then(response => {
                setProjects(response.data);
                //setFlag(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [flag])

    const navigateToProject = (projectItem) =>{
        localStorage.setItem("project", JSON.stringify(projectItem))
        props.navigation.navigate('Project')
    }
    return(
        <NativeBaseProvider>
            <Box flex={1} bg="white" safeAreaTop width="100%" maxHeight="895" alignSelf="center">
                <Container height="640" bg="white" maxWidth="100%">
                    <HStack mt="6" ml="6" mb="3">
                        <Icon as={<MaterialIcons name="grading" />} color="blue.500" size="xl" />
                        <Heading>Мои проекты</Heading>
                    </HStack>
                    <VStack alignItems="center">
                        {projects.map(project => (
                            <Pressable key={project.id} onPress = {() => navigateToProject(project)}>                
                                <Box minW="350" ml="6" mt="3" shadow="3" bg="blueGray.100" p="5" rounded="8">
                                    <HStack>
                                        <Text>{project.name}</Text>
                                        <Icon as={<MaterialIcons name={project.lead.id === JSON.parse(localStorage.getItem('user')).id ? "star" : ""} />} color="blue.500" size="xl" />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
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
        </NativeBaseProvider>
    )
}