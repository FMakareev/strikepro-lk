import React, { Component } from 'react'
import {
  Alert,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Row,
  CardBody
} from 'reactstrap'
import { Link } from 'react-router-dom'

export class RegistrationSuccess extends Component {
  render () {
    return (
      <div
        style={{
          maxWidth: '420px',
          margin: '0 auto',
          color: '#666',
          textAlign: 'center'
        }}
      >
        <Card
          style={{
            padding: '16px'
          }}
        >
          <CardBody>
            <h1
              style={{
                margin: '16px 0'
              }}
            >
              Спасибо за предварительную регистрацию.
            </h1>
            <p>
              Ожидайте подтверждение регистрации по электронной почте.
            </p>

            <Link to={'/login'}>
              <Button color='success'>
                Завершить
              </Button>
            </Link>
            
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default RegistrationSuccess
