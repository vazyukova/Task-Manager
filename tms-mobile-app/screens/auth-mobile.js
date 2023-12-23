import {NativeBaseProvider, Box, VStack, Center, Button, Link, Heading, HStack, FormControl, Input, Text, WarningOutlineIcon} from 'native-base'
import axios from 'axios';
import {useState} from 'react'

export default function Auth(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const API_URL = "http://localhost:5788/api/auth/";

    const login = (username, password) => {
        return axios
          .post(API_URL + "signin", {
            username,
            password,
          })
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
      };

    const loginUser = () => {
        login(username, password).then(
            () => {
                let user = JSON.parse(localStorage.getItem('user'));
                props.navigation.navigate('Profile')
              
            },
            (error) => {
              console.log(error)
            }
          );
        
    }

    const handleUsername = (event) =>
    {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
     return(
        <NativeBaseProvider >
        <Center h="100%" background="white">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Task Management System
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Логин</FormControl.Label>
            <Input onChange={handleUsername}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Пароль</FormControl.Label>
            <Input type="password" onChange={handlePassword}/>
            
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={loginUser}>
            Войти
          </Button>
        </VStack>
      </Box>
    </Center>
        </NativeBaseProvider>
    )
}