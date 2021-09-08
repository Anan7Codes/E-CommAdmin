import ColumnFilter from '@/components/ColumnFilter'
import { Button, Text } from '@chakra-ui/react'
import verifyUser from '@/util/verifyUser'
import suspendUser from '@/util/suspendUser'
import unsuspendUser from '@/util/unsuspendUser'

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: '_id',
        Filter: ColumnFilter
    },
    {
        Header: 'Email',
        accessor: 'email',
        Filter: ColumnFilter
    },
    {
        Header: 'Verified',
        accessor: 'verified',
        disableFilters: true,
        Cell: ({ cell }) => (
            cell.row.values.verified ? 
            <Text>Verified</Text> : 
            <Button onClick={() => verifyUser(cell.row.values._id)} size="sm">
                Verify
            </Button>
            
        )
    },
    {
        Header: 'Suspended',
        accessor: 'suspended',
        disableFilters: true,
        Cell: ({ cell }) => (
            cell.row.values.suspended ? 
            <Button color="green" variant="outline" onClick={() => unsuspendUser(cell.row.values._id)} size="sm">
                Unsuspend
            </Button> : 
            <Button color="red.400" variant="outline" onClick={() => suspendUser(cell.row.values._id)} size="sm">
                Suspend
            </Button>
        )
    }
]
