import styled from '@emotion/styled'
import {TablePagination} from "@mui/material";

export default class StyledPagination {
  static Pagination = styled(TablePagination)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '100%',
    '& .MuiToolbar-gutters': {
      padding: '0 16px',
      '& .MuiTablePagination-spacer': {
        display: 'none'
      }
    },
    '& .MuiTablePagination-displayedRows': {
      marginRight: '30px'
    }
  })
}
