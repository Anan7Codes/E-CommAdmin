import React from 'react'
import Navbar from '@/components/Navbar'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import ProductCategories from '@/components/ProductCategories'
import UploadProduct from '@/components/UploadProduct'

function Products() {
    return (
        <Navbar>
            <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                    <Tab>Products List</Tab>
                    <Tab>Upload a Product</Tab>
                    <Tab>Product Categories</Tab>                    
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <UploadProduct/>
                    </TabPanel>
                    <TabPanel>
                        <ProductCategories/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Navbar>
    )
}

export default Products

