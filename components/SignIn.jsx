import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingStatus from './LoadingStatus';

export default function SignIn() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [notification, setNotification] = useState({
    insert: 'top',
    container: 'top-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });

  const resetForm = () => {
    reset(
      {},
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      setLoading(false);

      if (!res.ok) {
        throw new Error(res.status);
      } else {
        resetForm();
        Store.addNotification({
          title: 'Success!',
          message: `Welcome, ${data.email}!`,
          type: 'success',
          ...notification,
        });

        setTimeout(() => {
          router.push('/');
        }, 3500);
      }
    } catch (e) {
      console.log(e.message);

      if (e.message == '401') {
        console.log('fasdf');
        Store.addNotification({
          title: 'Invalid credentials!',
          message: `Try again, please.`,
          type: 'danger',
          ...notification,
        });
      } else {
        Store.addNotification({
          title: 'Something went wrong...',
          message: `Server error.`,
          type: 'danger',
          ...notification,
        });
      }
    }
  };

  useEffect(() => {
    reset(); // asynchronously
  }, [reset]);

  return (
    <>
      <ReactNotifications />
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in your account!</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)} spacing={8}>
              <Stack w={'20rem'} spacing={8}>
                <FormControl position={'relative'} id='email'>
                  <FormLabel>Email address</FormLabel>
                  <Input
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
                    {errors.email?.message}
                  </Text>
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
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
                      type={show ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        cursor={'pointer'}
                        h='1.75rem'
                        size='sm'
                        onClick={() => setShow(!show)}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text position={'absolute'} color={'red.400'} role='alert'>
                    {errors.password?.message}
                  </Text>
                </FormControl>
                <Stack pt={2} spacing={8}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    isLoading={loading}
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
      {loading && <LoadingStatus />}
    </>
  );
}
