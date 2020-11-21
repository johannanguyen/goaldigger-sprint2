import React from 'react'
import Button from '@material-ui/core/Button';

export function SelectedButton(props) {
    return (
        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={WorkPage}
          style={{
            backgroundColor: '81c0cd', minHeight: '53px', minWidth: '170px', border: '1px solid white',
          }}
        >
          {props.category}
        </Button>
    )
}