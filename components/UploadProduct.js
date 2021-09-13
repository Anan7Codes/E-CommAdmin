import React, {useState} from 'react';
import { Flex, Input, Button, chakra, Text, Spacer, Textarea, Select, Image, useToast } from '@chakra-ui/react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function UploadProduct() {
    const toast = useToast()
    const { data, error } = useSWR('/api/productCategory', fetcher)
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [previewSource, setPreviewSource] = useState('');
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        previewFile(event.target.files[0])
	};

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    }

    const handleSubmission = async () => {
        setLoading(true)
        if(!name || !price || !description || !selectedFile || !category) {
            toast({
                title: 'Product Upload',
                description: 'Fill in all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            })

            return setLoading(false)
        }
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('upload_preset', 'rkufojb5')

        const resImage = await fetch('https://api.cloudinary.com/v1_1/anandhukraju-vercel-app/image/upload', {
            method: 'POST',
            body: formData
        })
        const imageRes = await resImage.json()
        
        const productUpload = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                description,
                imageUrl: imageRes.url,
                category
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const res = await productUpload.json()
        setLoading(false)

        if(!res.success) return toast({
            title: 'Product Upload',
            description: res.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        })

        toast({
            title: 'Product Upload',
            description: res.message,
            status: 'success',
            duration: 5000,
            isClosable: true
        })

        setName('')
        setPrice(null)
        setDescription('')
        setCategory('')
        setPreviewSource('')
        setIsFilePicked(false)
        setSelectedFile(null)
    };

    return (
        <Flex w={['100%', '100%', '100%', '100%']} direction={['column', 'column', 'row']}>
            <Flex w="100%" direction="column" p={3}>
                <Input type="file" name="file" onChange={changeHandler}/>
                { isFilePicked ? <chakra.div mt={3}>
                    <Text>Name: {selectedFile.name}</Text>
                    <Text>Filetype: {selectedFile.type}</Text>
                </chakra.div> : null}
                {previewSource && (
                    <Image
                        src={previewSource}
                        alt="product-image"
                        objectFit="cover"
                        boxSize="150px"
                        mt={5}
                    />
                )}
            </Flex>

            <Spacer/>

            <Flex w="100%" direction="column" p={3}>
                <Input variant="filled" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                <Textarea
                    // value={value}
                    // onChange={handleInputChange}
                    mt={3}
                    placeholder="Description"
                    size="sm"
                    value={description} onChange={e => setDescription(e.target.value)}
                />
                <Input variant="filled" type="number" placeholder="Price" mt={3} value={price} onChange={e => setPrice(e.target.value)}/>
                <Select variant="filled" placeholder="Choose a Category" mt={3} value={category} onChange={e => setCategory(e.target.value)}>
                    {error ? <option></option> : null}
                    {data ? data.categories.map(category => <option key={category._id}>
                        {category.name}
                    </option>) : null}
                </Select>
                <Button isLoading={loading} colorScheme="teal" onClick={handleSubmission} w={['100%', '100%', '100%', '50%']} mt={5}>Submit</Button>
            </Flex>
        </Flex>
    )
}

export default UploadProduct
