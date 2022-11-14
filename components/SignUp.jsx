import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const [regData, setRegData] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    setRegData(data);
  };

  useEffect(() => {
    if (rememberMe && regData) {
      const { email, password } = regData;
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[email]) {
        setUserExists(true);
      } else {
        setUserExists(false);
        users[email] = password;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('regData', JSON.stringify(regData));
        window.location = !isSubmitting && '/';
        reset(
          {
            email: '',
            password: '',
          },
          {
            keepErrors: false,
            keepDirty: false,
          }
        );
      }
      setRegData(null);
    }
  }, [regData]);

  useEffect(() => {
    reset(); // asynchronously
  }, [reset]);

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create an account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)} spacing={8}>
            <Stack spacing={8}>
              <FormControl position={'relative'} id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  onInput={() => setUserExists(false)}
                  {...register('email', {
                    pattern: {
                      value: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
                      message: 'Enter the valid email address!',
                    },
                    required: {
                      value: true,
                      message: 'Email is required!',
                    },
                  })}
                  type='email'
                />
                <Text position={'absolute'} color={'red.400'} role='alert'>
                  {userExists && 'User with this email already exists!'}
                  {errors.email?.message}
                </Text>
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password', {
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Must contain big letter and number.',
                    },
                    required: {
                      value: true,
                      message: 'Password is required!',
                    },
                  })}
                  type='password'
                />
                <Text position={'absolute'} color={'red.400'} role='alert'>
                  {errors.password?.message}
                </Text>
              </FormControl>
              <Stack pt={4} spacing={8}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Remember me
                  </Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
