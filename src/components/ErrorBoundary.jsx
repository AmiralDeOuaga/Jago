import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "#0A2463", color: "#fff", padding: 32, textAlign: "center",
          fontFamily: "'Montserrat', sans-serif",
        }}>
          <div style={{ fontSize: 56, marginBottom: 20, fontWeight: 900 }}>!</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Une erreur est survenue</h2>
          <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 28, maxWidth: 400 }}>
            L'application a rencontré un problème inattendu. Recharge la page pour continuer.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#FFD93D", color: "#0A2463", border: "none",
              borderRadius: 12, padding: "14px 28px", fontSize: 15,
              fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Recharger l'application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
