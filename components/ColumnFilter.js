import React from 'react'
import { chakra, Heading, Input, HStack } from '@chakra-ui/react'

function ColumnFilter({ column }) {
    const { filterValue, setFilter } = column
    return (
        <HStack>
            <Heading fontSize="12px">Search: </Heading>
            <Input size="sm" width="30" value={filterValue || ''} onChange={(e) => setFilter(e.target.value || undefined)}/>
        </HStack>
    )
}

export default ColumnFilter
