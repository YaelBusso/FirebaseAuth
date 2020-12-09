import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("):הסיסמאות אינן תואמות")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("):לא הצלחנו לעדכן את הפרופיל שלך")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center"
                   style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="css-shadow">
        <Card.Body>
          <h2 className="css-text text-center mb-4">עדכון הפרופיל שלך</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>סיסמא</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="תשאיר ריק כדי להישאר עם הסיסמא הנוכחית"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>אימות סיסמא</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="תשאיר ריק כדי להישאר עם הסיסמא הנוכחית"
              />
            </Form.Group>
            <Button variant="danger" disabled={loading} className="w-100" type="submit">
              עדכון
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">ביטול</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
