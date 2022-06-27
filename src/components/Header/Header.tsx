import React from 'react'
import { Box, Button, Center, Flex, Heading, useColorMode, Avatar, HStack, IconButton, useDisclosure, Menu, MenuButton, MenuItem, MenuDivider, MenuList, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CloseIcon, HamburgerIcon, QuestionOutlineIcon, SettingsIcon } from '@chakra-ui/icons';


function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box >
            <Flex
                h="16"
                py="4"
                px="6"
                justify="space-between"
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={'gray.200'}
            >
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <Center>
                    <Heading color={"gray.800"} size={["sm","md","xl"]}>Open Transport Radar</Heading>
                </Center>
                <Center display={{ base: 'none', md: 'flex' }}>
                    <Box mx={"2rem"}>
                        <NavLink to={"/"}>Link1</NavLink>
                    </Box>
                    <Box mx={"2rem"} mr={"4rem"}>
                        <NavLink to={"/feedback"}>Contact</NavLink>
                    </Box>
                    <Menu>
                        <MenuButton>
                            <Avatar />
                        </MenuButton>
                        <MenuList>

                            <MenuItem icon={<SettingsIcon/>}>Settings</MenuItem>
                            <MenuItem icon={<QuestionOutlineIcon/>}>Help</MenuItem>
                            <MenuItem>Contact</MenuItem>
                            <MenuDivider />
                            <MenuItem color="red">Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </Center>

            </Flex>  {isOpen ? (
                <Box
                    pb={4}
                    display={{ md: 'none' }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={'gray.200'}>
                    <Stack as="nav" spacing={4}>
                        <NavLink to={"/home"}>Settings</NavLink>
                        <NavLink to={"/home"}>Link2</NavLink>
                        <NavLink to={"/feedback"}>Contact</NavLink>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}


export default Header