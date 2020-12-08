import React from 'react'
import Button from '@material-ui/core/Button';

export function CategoryButton(props) {
  const { selected } = props;

  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
                    // onClick={WorkPage}
      style={{
        backgroundColor: selected ? '81c0cd' : '0e99b6',
        minHeight: '53px',
        minWidth: '170px',
        border: '1px solid white',
      }}
      {...props}
    >
      {props.category}
    </Button>
  )
}