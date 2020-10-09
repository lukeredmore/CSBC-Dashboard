import React from 'react'

import './SendNotificationCard.scss'
import { Card, CardHeader, CardBody, Form, FormInput, FormSelect, Button } from 'shards-react'
import { useState } from 'react'
import { sendAuthenticatedPostRequest } from '../../firebase'
import constants from '../../client-side-private-files.json'

export default () => {
  const [notificationObject, setNotificationObject] = useState({ schoolInt: 4, message: '', title: '' })

  const handleChange = ({ target: { name, value } }) => setNotificationObject({ ...notificationObject, [name]: value })

  return (
    <div className='send-notification-card'>
      <Card className='mt-4'>
        <CardHeader className='border-bottom'>
          <h5>Send A Notification</h5>
        </CardHeader>
        <CardBody>
          Use this form to send a push notification to all app users, or a specific subset. Please keep your message around no more than 50
          words.
          <Form
            onSubmit={async e => {
              e.preventDefault()
              console.log(notificationObject)
              if (
                !window.confirm(
                  'Are you sure you want to send this notification to these users?\n\nTitle: ' +
                    notificationObject.title +
                    '\nText: ' +
                    notificationObject.message
                )
              )
                return

              const { status } = await sendAuthenticatedPostRequest(
                constants.FIREBASE_SEND_MESSAGE_FROM_ADMIN_FUNCTION_URL,
                notificationObject
              )
              if (status === 200) {
                window.alert('The notification was sent successfully. Check your phone!')
                setNotificationObject({ schoolInt: 4, message: "", title: "" })
              } else window.alert('An error occured and the notification was not sent.')
            }}>
            <div className='label-row'>Notification Title</div>
            <FormInput autoComplete='off' onChange={handleChange} value={notificationObject.title} name='title' />
            <div className='label-row'>
              Notification Text
              <i className='fa fa-asterisk xs' />
            </div>
            <FormInput autoComplete='off' required onChange={handleChange} value={notificationObject.message} name='message' />
            <div className='label-row'>
              Send To
              <i className='fa fa-asterisk xs' />
            </div>
            <FormSelect required onChange={handleChange} value={notificationObject.schoolInt} name='schoolInt'>
              <option value={4}>All Users</option>
              <option value={0}>Seton Catholic Central</option>
              <option value={1}>St. John's School</option>
              <option value={2}>All Saints School</option>
              <option value={3}>St. James School</option>
            </FormSelect>
            <Button>
              Send Notification <i className='material-icons'>send</i>{' '}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
