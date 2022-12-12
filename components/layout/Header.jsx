import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { route, query } = router;
  const [regData, setRegData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const logOut = async () => {
    await signOut();
    setModalIsOpen(false);
    router.push('/');
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setRegData(session);
    }
    console.log(session);
  }, [session]);

  const switchMode = (
    <Button
      display={{ base: 'none', md: 'inline-flex' }}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );

  const avatar = (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}
    >
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'sm'} src={session?.user.fileURL || null} />
          </MenuButton>
          <MenuList>
            <MenuItem>My profile</MenuItem>
            <MenuDivider />
            <Button
              ml={3}
              onClick={() => setModalIsOpen(true)}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Log out
            </Button>
          </MenuList>
        </Menu>
      </Box>
      {switchMode}
    </Stack>
  );

  const registration = (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}
    >
      <Button
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        href='/auth/sign-in'
      >
        Sign In
      </Button>
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'pink.400'}
        _hover={{
          bg: 'pink.300',
        }}
      >
        <Link
          padding={'100%'}
          _hover={{
            textDecoration: 'none',
          }}
          href='/auth/sign-up'
        >
          Sign Up
        </Link>
      </Button>
      {switchMode}
    </Stack>
  );

  const modal = (
    <AlertDialog isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Confirmation</AlertDialogHeader>
          <ModalCloseButton />
          <AlertDialogBody>Sure want to log out?</AlertDialogBody>
          <AlertDialogFooter>
            <Button mr={3} onClick={() => setModalIsOpen(false)}>
              No
            </Button>
            <Button onClick={logOut} colorScheme='red'>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 14 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link
            fontWeight={'bold'}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            href='/'
            _hover={{
              textDecoration: 'none',
            }}
          >
            DubaiRealtor
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav router={router} route={route} query={query} />
          </Flex>
        </Flex>
        {regData ? avatar : registration}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav router={router} route={route} query={query} />
      </Collapse>
      {modal}
    </Box>
  );
}

const DesktopNav = ({ query, router }) => {
  const path = router.pathname;
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const setPurpose = (purpose) => {
    query['purpose'] = purpose;
    router.push({ pathname: path, query: query });
  };

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Button
                variant={'link'}
                p={'0'}
                onClick={() => setPurpose(navItem.purpose)}
                fontSize={'sm'}
                fontWeight={'500'}
                color={linkColor}
                textDecoration={navItem.purpose == query.purpose && 'underline'}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Button>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ query, router }) => {
  const path = router.pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const setPurpose = function (purpose) {
    query['purpose'] = purpose;
    router.push({ pathname: path, query: query });
  };
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          setPurpose={setPurpose}
          query={query}
          key={navItem.label}
          {...navItem}
        />
      ))}
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Stack>
  );
};

const MobileNavItem = ({ query, label, purpose, setPurpose }) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Button}
        variant={'link'}
        onClick={() => setPurpose(purpose)}
        textDecoration={query.purpose === purpose && 'underline'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Buy',
    purpose: 'for-sale',
  },
  {
    label: 'Rent',
    purpose: 'for-rent',
  },
];

export default Header;
