import React, { useState } from 'react';
import { init, send } from '@emailjs/browser';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Inicializa EmailJS con tu User ID
    init('RGFiuzFrdS67FJYzP'); // Reemplaza con tu User ID de EmailJS

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validación de campos
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        // Enviar el formulario con EmailJS
        send('service_ojokgyk', 'template_ot3ukce', formData)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSuccessMessage('¡Mensaje enviado con éxito!');
                setFormData({ name: '', email: '', phone: '', message: '' }); // Limpiar el formulario
            }, (err) => {
                console.log('FAILED...', err);
                setErrorMessage('Error al enviar el mensaje.');
            });
    };

    return (
        <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Contact Us</h2>
                    <h3 className="section-subheading text-muted">¡Pregunta por nuestros panes frescos!</h3>
                </div>
                <form id="contactForm" onSubmit={handleSubmit} data-sb-form-api-token="API_TOKEN">
                    <div className="row align-items-stretch mb-5">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    placeholder="Your Email *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <div className="form-group mb-md-0">
                                <input
                                    className="form-control"
                                    id="phone"
                                    type="tel"
                                    placeholder="Your Phone *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group form-group-textarea mb-md-0">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Your Message *"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="text-center text-white mb-3" id="submitSuccessMessage">
                            <div className="fw-bolder">{successMessage}</div>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="text-center text-danger mb-3" id="submitErrorMessage">
                            {errorMessage}
                        </div>
                    )}

                    <div className="text-center">
                        <button className="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
