import { getSession } from 'next-auth/client'
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import {
    Flex,
    Heading,
    Avatar,
    Text,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi"
import MyChart from '@/components/MyChart'

export default function Dashboard({ username }) {
    const [display, changeDisplay] = useState('hide')
    return (
        <Navbar>
            <Heading
                    fontWeight="normal"
                    mb={4}
                    letterSpacing="tight"
                >
                    Welcome back, <Flex display="inline-flex" fontWeight="bold">{username}</Flex>
                </Heading>
                <Text color="gray" fontSize="sm">My Balance</Text>
                <Text fontWeight="bold" fontSize="2xl">$5,750.20</Text>
                <MyChart />
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Transactions</Heading>
                        <Text fontSize="small" color="gray" ml={4}>Apr 2021</Text>
                    </Flex>
                    <IconButton icon={<FiCalendar />} />
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Name of transaction</Th>
                                    <Th>Category</Th>
                                    <Th isNumeric>Cashback</Th>
                                    <Th isNumeric>Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="amazon.jpeg" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">Amazon</Heading>
                                                <Text fontSize="sm" color="gray">Apr 24, 2021 at 1:40pm</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Electronic Devices</Td>
                                    <Td isNumeric>+$2</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$242</Text>.00</Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="starbucks.png" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">Starbucks</Heading>
                                                <Text fontSize="sm" color="gray">Apr 22, 2021 at 2:43pm</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Cafe and restaurant</Td>
                                    <Td isNumeric>+$23</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$32</Text>.00</Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="youtube.png" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">YouTube</Heading>
                                                <Text fontSize="sm" color="gray">Apr 13, 2021 at 11:23am</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Social Media</Td>
                                    <Td isNumeric>+$4</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$112</Text>.00</Td>
                                </Tr>
                                {display == 'show' &&
                                    <>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="amazon.jpeg" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">Amazon</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 12, 2021 at 9:40pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Electronic Devices</Td>
                                            <Td isNumeric>+$2</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$242</Text>.00</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="starbucks.png" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">Starbucks</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 10, 2021 at 2:10pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Cafe and restaurant</Td>
                                            <Td isNumeric>+$23</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$32</Text>.00</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="youtube.png" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">YouTube</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 7, 2021 at 9:03am</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Social Media</Td>
                                            <Td isNumeric>+$4</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$112</Text>.00</Td>
                                        </Tr>
                                    </>
                                }
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider />
                        <IconButton
                            icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => {
                                if (display == 'show') {
                                    changeDisplay('none')
                                } else {
                                    changeDisplay('show')
                                }
                            }}
                        />
                        <Divider />
                    </Flex>
                </Flex>
        </Navbar>
    )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('Index ' + session?.user.name)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return { 
    props: {
      username: session.user.name
    }
  }
}