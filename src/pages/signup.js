import { useState } from 'react';
import { Form, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setMessage(jsonResponse.message);
        setError(null);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const jsonResponse = await response.json();
        setError(jsonResponse.message);
        setMessage(null);
      }
    } catch (error) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
      setMessage(null);
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  {message && <Alert color="success">{message}</Alert>}
                  {error && <Alert color="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input type="text" name="nome" id="nome" className="form-control form-control-lg" value={formData.nome} onChange={handleChange} required />
                      <label className="form-label" htmlFor="nome">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email" id="email" className="form-control form-control-lg" value={formData.email} onChange={handleChange} required />
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="senha" id="senha" className="form-control form-control-lg" value={formData.senha} onChange={handleChange} required />
                      <label className="form-label" htmlFor="senha">Password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link className="fw-bold text-body" to="/login"><u>Login here</u></Link></p>

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Cadastro;
