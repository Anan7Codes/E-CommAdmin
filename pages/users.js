import { getSession } from 'next-auth/client'
import { useMemo } from 'react'
import Navbar from '@/components/Navbar'
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Button, Input, Select, HStack } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { COLUMNS } from '@/components/UsersColumn'


function Users({ data }) {
    if(!data.success) {
        return (
            <Navbar>
                No Data
            </Navbar>
        )
    }

    const columns = useMemo(() => COLUMNS, [])
    const tableData = useMemo(() => data.users, [])

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow 
    } = useTable({
        columns: columns,
        data: tableData,
    }, 
    useFilters,
    useSortBy,
    usePagination)

    const { pageIndex, pageSize } = state

    return (
        <Navbar>
            <Table {...getTableProps()}>
                <Thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                            <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                    <chakra.div mt="5">
                                        {column.canFilter ? column.render('Filter') : null}
                                    </chakra.div>
                                </Th>
                                ))}
                            </Tr>
                        ))
                    }
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return(
                                <Tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                        })
                                    }
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
            <HStack>
                <chakra.span>
                    Page {' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </chakra.span>
                <chakra.span>
                    | Go to page: {' '}
                    <Input type="number" size='sm' defaultValue={pageIndex + 1} onChange={e => { 
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} width="20" />
                </chakra.span>
                <Select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} width="40">
                    {
                        [4,5,6,10].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                            </option>
                        ))
                    } 
                </Select>
                
                <Button onClick={() => gotoPage(0)} mr={2} ml={2} disabled={!canPreviousPage}>{'<<'}</Button>
                <Button onClick={() => previousPage()} mr={2} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} mr={2} disabled={!canNextPage}>Next</Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
            </HStack>
        </Navbar>
    )
    
}

export default Users

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            cookie: context.req.headers.cookie,
        },
    })
    const data = await response.json()
    return { 
        props: {
            data: data
        }
    }
}
