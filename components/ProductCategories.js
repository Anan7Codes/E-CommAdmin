import React, { useState } from 'react'
import { Flex, Spacer, useToast, Box, Input, InputGroup, InputLeftAddon, Heading, Button } from '@chakra-ui/react'
import CategoryTable from '@/components/CategoryTable'

function ProductCategories() {
    const [ category, setCategory ] = useState('')
    const toast = useToast()

    const addCategory = async () => {
        console.log(category)
        const req = await fetch("/api/productCategory", {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const res = await req.json()

        if(!res.success) return toast({
            title: 'Product Category',
            description: res.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        })

        toast({
            title: 'Product Category',
            description: res.message,
            status: 'success',
            duration: 5000,
            isClosable: true
        })
    }

    return (
        <Flex direction={['column', 'column', 'row']}>
            <Box>
                <CategoryTable/>
            </Box>
            <Spacer/>
            <Flex direction="column" mt={10}>
                <Heading size="lg">Add a Category</Heading>
                <InputGroup mt={5}>
                    <InputLeftAddon children="Name" />
                    <Input placeholder="Expresso" value={category} onChange={e => setCategory(e.target.value)}/>
                </InputGroup>
                <Button size="sm" colorScheme="teal" variant="outline" mt={5} onClick={addCategory}>
                    Click to Add
                </Button>
            </Flex>
        </Flex>
    )
}

export default ProductCategories
