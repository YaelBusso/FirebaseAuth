import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../../css/style.css";
import "../../css/main-color.css";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("):לא הצלחנו להתחבר לחשבון")
    }

    setLoading(false)
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center"
               style={{ minHeight: "100vh" }}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="css-shadow" >
        <Card.Body>
          <h2 className="css-text text-center mb-4">התחברות</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>שם משתמש:</Form.Label>
               <Form.Control  type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>סיסמא:</Form.Label>
              <Form.Control class="input-text" type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
                    variant="danger" disabled={loading} className="w-100" type="submit">
              התחברות
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">?שכחת סיסמא</Link>
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