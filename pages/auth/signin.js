import React, { useState } from 'react';
import { signIn } from 'next-auth/client'
import { Flex, Heading, Input, Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function SignIn() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const toast = useToast()
    const router = useRouter()
    const onSignIn = async () => {
        const res = await signIn('credentials', { username: username, password: password, redirect: false })
        if(res.error) return toast({
            title: 'Log In',
            description: res.error,
            status: 'error',
            duration: 5000,
            isClosable: true
        })

        toast({
            title: 'Log In',
            description: 'Successfully logged in',
            status: 'success',
            duration: 5000,
            isClosable: true
        })

        router.push(res.url)
        
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Heading mb={6}>Log In</Heading>
                    {/* <Input name="csrfToken" type="hidden" defaultValue={csrfToken}/> */}
                    <Input placeholder="admin" variant="filled" name="username" mb={3} type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <Input placeholder="********" variant="filled" name="password" mb={6} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button colorScheme="teal" onClick={onSignIn}>Log In</Button>
            </Flex>
        </Flex>
    )
}
