import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("פתח/י את תיבת האימייל שלך להנחיות נוספות")
    } catch {
      setError("):לא הצלחנו לאפס את הסיסמא שלך")
    }

    setLoading(false)
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
                 style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="css-shadow">
        <Card.Body>
          <h2 className="text-center mb-4">איפוס סיסמא</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>אימייל</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button variant="danger" disabled={loading} className="w-100" type="submit">
              איפוס סיסמא
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">התחברות</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        אין לך חשבון? <Link to="/signup">הרשמה</Link>
      </div>
      </div>
      </Container>
    </>
  )
}