
import React from 'react';

const SubscribeFormView = ({ onSubmit, onChange, email }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <button type="submit">Suscribirse</button>
    </form>
  );
};

export default SubscribeFormView;
