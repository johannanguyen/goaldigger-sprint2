import React from 'react'
import Button from '@material-ui/core/Button';

export function CategoryButton(props) {
    return (
        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={WorkPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          {props.category}
        </Button>
    )
}