import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Heading, Stack, Skeleton, Text, Button } from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import useSWR from 'swr'
import deleteCategory from '@/util/deleteCategory'

function CategoryTable() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/productCategory', fetcher)

    if (error) return <Heading size="xl">failed to load</Heading>
    if (!data) return <Stack>
        <Text>Loading...</Text>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
    </Stack>


    // render data
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Category Name</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.categories.map(category => {
                    return (
                        <Tr>
                            <Td>{category.name}</Td>
                            <Td>
                                <Button onClick={() => deleteCategory(category._id)} variant="outline" colorScheme="red">
                                    <DeleteIcon />
                                </Button>    
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}

export default CategoryTable
