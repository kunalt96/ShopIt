import React from 'react'
import { Alert } from 'reactstrap'

function Message({ variant, children }) {
  return <Alert color={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
