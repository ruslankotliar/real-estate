import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
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
import UploadFile from './UploadFile';
import LoadingStatus from './LoadingStatus';

export default function SignUp() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    insert: 'top',
    container: 'top-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all' });

  const resetForm = () => {
    reset(
      {},
      {
        keepErrors: false,
        keepDirty: false,
      }
    );
  };

  const onUploadFile = async (file) => {
    if (!file) {
      return;
    }

    try {
      let formData = new FormData();
      formData.append('media', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const { fileURL, error } = await res.json();

      if (!res.ok) {
        setLoading(false);
        return;
      }
      return fileURL;
    } catch (e) {
      console.error(e);
    }
  };

  const signUpUser = async (regData) => {
    try {
      const { email, password, file } = regData;
      const fileURL = await onUploadFile(file[0]);
      const data = { email, password, fileURL };
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setLoading(false);
      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      } else {
        Store.addNotification({
          title: 'Registration complete!',
          message: `Welcome, ${regData.email}!`,
          type: 'success',
          ...notification,
        });
      }

      setTimeout(() => {
        if (rememberMe) {
          router.push('/');
        } else {
          router.push('/auth/sign-in');
        }
      }, 2500);

      resetForm();
    } catch (e) {
      if (e.message == '409') {
        Store.addNotification({
          title: `${regData.email} already exists.`,
          message: 'Choose another email address.',
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
      console.error(e);
    }
  };

  const onSubmit = (regData) => {
    setLoading(true);
    signUpUser(regData);
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
            <Heading fontSize={'4xl'}>Create an account</Heading>
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
                  <Text position={'absolute'} color={'red.300'} role='alert'>
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
                  <Text position={'absolute'} color={'red.300'} role='alert'>
                    {errors.password?.message}
                  </Text>
                </FormControl>
                <UploadFile errors={errors} register={register} />
                <Stack spacing={8}>
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
                    isLoading={loading}
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
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
