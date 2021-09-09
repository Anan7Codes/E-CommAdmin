import React from 'react'
import {
    Flex,
    Heading,
    Text,
    Icon,
    IconButton,
} from '@chakra-ui/react'
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
} from "react-icons/fi"
import NextLink from 'next/link'
import { GoSignOut } from 'react-icons/go'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'

export default function Navbar(props) {
    const router = useRouter()
    return (
        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
        >
            {/* Column 1 */}
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                backgroundColor="#020202"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf="center"
                            letterSpacing="tight"
                        >
                            E-Comm.
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <NextLink href="/">
                                    <a>
                                        <Flex>
                                            <Icon as={FiHome} fontSize="xl" className={router.pathname === '/' ? "active-icon" : ""} />
                                            <Text className={router.pathname === '/' ? "active" : ""}>Dashboard</Text>
                                        </Flex>
                                    </a>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <NextLink href="orders">
                                    <a>
                                        <Flex>
                                            <Icon as={FiPieChart} fontSize="xl" className={router.pathname === '/orders' ? "active-icon" : ""}/>
                                            <Text className={router.pathname === '/orders' ? "active" : ""}>Orders</Text>
                                        </Flex>
                                    </a>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <NextLink href="users">
                                    <a>
                                        <Flex href="users">
                                            <Icon as={FiDollarSign} fontSize="xl" className={router.pathname === '/users' ? "active-icon" : ""}/>
                                            <Text className={router.pathname === '/users' ? "active" : ""}>Users</Text>
                                        </Flex>
                                    </a>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <NextLink href="products">
                                    <a>
                                        <Flex href="products">
                                            <Icon as={FiBox} fontSize="xl" className={router.pathname === '/products' ? "active-icon" : ""}/>
                                            <Text className={router.pathname === '/products' ? "active" : ""}>Products</Text>
                                        </Flex>
                                    </a>
                                </NextLink>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex flexDir="row" alignItems="center" mb={10} mt={5}>
                    <IconButton icon={<GoSignOut/>} aria-label="Sign Out" variant="outline" onClick={signOut}/>
                    <Text ml={3}>Sign Out</Text>
                </Flex>
            </Flex>

            {/* Column 2 */}
            <Flex
                w="100vw"
                p="3%"
                flexDir="column"
                overflow="auto"
                minH="100vh"
            >
                {props.children}
            </Flex>
        </Flex>
    )
}
