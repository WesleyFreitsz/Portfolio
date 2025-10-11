import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 text-center text-muted-foreground">
      <p>&copy; {currentYear} Wesley Junior. Todos os direitos reservados.</p>
    </footer>
  );
};
