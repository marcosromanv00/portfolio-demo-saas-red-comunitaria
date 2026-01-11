import Navigation from "../navigation/Navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Community Hub</h1>

        <Navigation />

        <ThemeToggle />
      </div>
    </header>
  );
}
